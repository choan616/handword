# 문화포털 수어 API 전체를 받아 Supabase signs 테이블에 다시 적재하는 월 1회 동기화 스크립트
import json
import os
import sys
import xml.etree.ElementTree as ET
from urllib.parse import urlencode
from urllib.request import Request, urlopen

API_URL = 'https://api.kcisa.kr/API_CNV_054/request'
ROWS = 100  # API가 한 번에 100건까지만 돌려줘서, 더 크게 요청하면 페이지 간격이 어긋난다
BATCH = 500


def load_env(path='.env'):
    if not os.path.exists(path):
        return
    with open(path, encoding='utf-8') as env_file:
        for line in env_file:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                name, value = line.split('=', 1)
                os.environ.setdefault(name.strip(), value.strip().strip('"').strip("'"))


def parse_page(body):
    """API 응답 XML에서 (전체 건수, 레코드 목록)을 꺼낸다. 값이 빈 필드는 버린다."""
    root = ET.fromstring(body)
    total = int(root.findtext('.//totalCount') or 0)
    records = []
    for item in root.findall('.//item'):
        record = {child.tag.split('}')[-1]: (child.text or '').strip() for child in item}
        records.append({name: value for name, value in record.items() if value})
    return total, records


def fetch_page(api_key, page):
    params = {'serviceKey': api_key, 'numOfRows': ROWS, 'pageNo': page, 'keyword': '', 'collectionDb': ''}
    with urlopen(Request(f'{API_URL}?{urlencode(params)}'), timeout=60) as response:
        return parse_page(response.read().decode('utf-8'))


def supabase(method, path, base_url, key, body=None, extra=None):
    headers = {'apikey': key, 'Content-Type': 'application/json', **(extra or {})}
    if key.startswith('eyJ'):  # 예전 형식(JWT) service_role 키는 Authorization 헤더도 필요하다
        headers['Authorization'] = f'Bearer {key}'
    data = json.dumps(body, ensure_ascii=False).encode('utf-8') if body is not None else None
    with urlopen(Request(f'{base_url}/rest/v1/{path}', data=data, method=method, headers=headers), timeout=120) as response:
        return response.headers.get('Content-Range', '')


def main():
    load_env()
    needed = ['SIGN_LANGUAGE_API_KEY', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY']
    missing = [name for name in needed if not os.environ.get(name, '').strip()]
    if missing:
        sys.exit(f'.env에 다음 값이 필요합니다: {", ".join(missing)}')
    api_key, base_url, service_key = (os.environ[name].strip() for name in needed)
    base_url = base_url.rstrip('/')

    total, records = fetch_page(api_key, 1)
    for page in range(2, -(-total // ROWS) + 1):
        records += fetch_page(api_key, page)[1]
    assert len(records) == total, f'받은 건수 {len(records)}건이 전체 {total}건과 다릅니다.'

    rows = [{'collection': r.get('collectionDb', ''), 'local_id': r.get('localId', ''), 'title': r.get('title', ''), 'record': r} for r in records]
    # shortcut: 삭제와 적재 사이 몇 초간 조회가 비어 보일 수 있다. 월 1회 새벽 실행이면 충분하고, 문제가 되면 스테이징 테이블로 교체한다
    supabase('DELETE', 'signs?id=gte.0', base_url, service_key, extra={'Prefer': 'return=minimal'})
    for start in range(0, len(rows), BATCH):
        supabase('POST', 'signs', base_url, service_key, rows[start:start + BATCH], {'Prefer': 'return=minimal'})

    content_range = supabase('HEAD', 'signs?select=id', base_url, service_key, extra={'Prefer': 'count=exact', 'Range': '0-0'})
    saved = int(content_range.rsplit('/', 1)[-1])
    assert saved == total, f'저장된 {saved}건이 전체 {total}건과 다릅니다.'
    print(f'전체 {total}건을 Supabase signs 테이블에 저장했습니다.')


if __name__ == '__main__':
    main()

# 손말하루

수어 입문 성인을 위한 일상 한국어 수어 학습 웹앱입니다. 표현·낱말·손가락글자를 하나의 목록에서 고르면 수어 영상과 설명으로 이어집니다.

- 화면: React + Vite, GitHub Pages로 배포
- 자료: Supabase Postgres. 화면은 `lookup_signs` 함수로 낱말별 결과만 조회하며, 테이블을 직접 읽지 못합니다.
- 학습 기록은 이 브라우저의 `localStorage`에만 저장합니다.

## 수어 자료 출처

본 저작물은 '국립국어원'에서 작성하여 [공공누리 제4유형](https://www.kogl.or.kr)으로 개방한 '통합 수어정보'를 이용하였으며, 해당 저작물은 '국립국어원, 문화포털([www.culture.go.kr](https://www.culture.go.kr))'에서 무료로 다운받으실 수 있습니다.

공공누리 제4유형은 출처표시, 비영리 목적 이용, 변경금지 조건입니다. 수어 영상·설명은 원문 그대로 표시하며, 영상은 복제하지 않고 한국수어사전 원본 주소로 재생합니다. **이 저장소에는 수어 자료가 들어 있지 않습니다.**

## 개발

```bash
npm install
cp .env.example .env   # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY 입력
npm run dev
```

| 명령 | 설명 |
|---|---|
| `npm run typecheck` | 타입 검사 |
| `npm run check` | 자료 변환 로직 검증 |
| `npm run build` | 정적 빌드(`dist/`) |

## 자료 준비 (처음 한 번, 이후 월 1회)

1. Supabase 프로젝트를 만들고 SQL Editor에서 `supabase/schema.sql`을 실행합니다.
2. `.env`에 `SIGN_LANGUAGE_API_KEY`(문화포털 인증키), `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`를 넣습니다. service_role 키는 비밀이며 화면이나 저장소에 넣지 않습니다.
3. `python tools/sync_signs.py`로 전체 자료(약 15,100건)를 받아 Supabase에 적재합니다.

## 배포

`main`에 푸시하면 GitHub Actions가 빌드해 Pages에 배포합니다. 저장소 Settings에서 Pages Source를 "GitHub Actions"로 두고, Actions 변수 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`를 등록하세요. anon 키는 공개값이며 보안은 Supabase의 RLS와 `lookup_signs` 함수가 맡습니다.

## 라이선스

코드의 라이선스는 아직 정하지 않았습니다. 정해지면 `LICENSE` 파일로 추가합니다.

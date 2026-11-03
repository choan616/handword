// Supabase의 lookup_signs 함수를 호출해 낱말별 수어 자료를 가져오고 화면용 형태로 바꾼다
export type Resource = { word: string; title: string; description: string; image_url: string; video_url: string; source_url: string; source_name: string }
export type Result = { status: 'ready' | 'empty' | 'error'; message: string; resources: Resource[] }
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
const SOURCE_NAME = '국립국어원 한국수어사전 원문'
const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const first = (record: Record<string, unknown>, names: string[]) => names.map((name) => text(record[name])).find(Boolean) ?? ''
// 사전 서버는 https만 열려 있어 http 주소를 https로 올린다
function absolute(value: string) {
  if (value.startsWith('http://')) return `https://${value.slice(7)}`
  if (value.startsWith('//')) return `https:${value}`
  if (value.startsWith('/')) return `https://sldict.korean.go.kr${value}`
  return value
}
function toResource(word: string, record: Record<string, unknown>): Resource {
  const signImage = text(record.signImages).split(',')[0]
  return {
    word,
    title: first(record, ['title', 'alternativeTitle']) || word,
    description: first(record, ['description', 'signDescription']),
    image_url: absolute(signImage || text(record.imageObject)),
    video_url: absolute(text(record.subDescription)),
    source_url: absolute(text(record.url)),
    source_name: SOURCE_NAME,
  }
}
export async function lookupSigns(words: string[]): Promise<Result> {
  if (!url || !key) return { status: 'error', message: '수어 자료 서버 설정이 없어요.', resources: [] }
  try {
    const response = await fetch(`${url}/rest/v1/rpc/lookup_signs`, {
      method: 'POST',
      headers: { apikey: key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ words: words.slice(0, 6) }),
    })
    if (!response.ok) throw new Error(String(response.status))
    const rows = await response.json() as { word: string; record: Record<string, unknown> }[]
    const resources = rows.map((row) => toResource(row.word, row.record))
    if (!resources.length) return { status: 'empty', message: '검색 결과가 없어요. 다른 낱말로 검색해보세요.', resources }
    return { status: 'ready', message: '', resources }
  } catch {
    return { status: 'error', message: '수어 자료를 불러오지 못했어요. 잠시 후 다시 시도해주세요.', resources: [] }
  }
}

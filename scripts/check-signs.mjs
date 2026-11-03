// lookupSigns의 주소 보정·필드 선택·오류 처리를 가짜 fetch로 검증하는 스크립트 (npm run check)
import { build } from 'esbuild'
import assert from 'node:assert/strict'

const bundle = await build({
  entryPoints: ['src/lib/signs.ts'],
  bundle: true,
  format: 'esm',
  write: false,
  define: { 'import.meta.env.VITE_SUPABASE_URL': '"https://x.supabase.co"', 'import.meta.env.VITE_SUPABASE_ANON_KEY': '"anon"' },
})
const { lookupSigns } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`)

let call
const reply = (ok, rows) => { globalThis.fetch = async (url, init) => { call = { url, init }; return { ok, status: ok ? 200 : 500, json: async () => rows } } }

reply(true, [
  { word: '안녕', record: { title: '안녕,안녕하세요', description: '설명', subDescription: 'http://sldict.korean.go.kr/v.mp4', imageObject: '//sldict.korean.go.kr/i.jpg', signImages: 'http://a/1.jpg,http://a/2.jpg', url: '/front/sign/x.do' } },
  { word: '밥', record: { title: '', signDescription: '손동작', imageObject: 'https://b/i.jpg' } },
])
const result = await lookupSigns(['안녕', '밥', 'c', 'd', 'e', 'f', 'g'])
assert.equal(result.status, 'ready')
assert.equal(call.url, 'https://x.supabase.co/rest/v1/rpc/lookup_signs')
assert.equal(call.init.headers.apikey, 'anon')
assert.deepEqual(JSON.parse(call.init.body).words.length, 6, '낱말은 6개까지만 보낸다')
const [first, second] = result.resources
assert.equal(first.video_url, 'https://sldict.korean.go.kr/v.mp4', 'http는 https로 올린다')
assert.equal(first.image_url, 'https://a/1.jpg', 'signImages의 첫 항목을 쓴다')
assert.equal(first.source_url, 'https://sldict.korean.go.kr/front/sign/x.do', '상대 경로는 사전 주소를 붙인다')
assert.equal(second.title, '밥', '제목이 비면 낱말을 쓴다')
assert.equal(second.description, '손동작', 'description이 비면 signDescription을 쓴다')
assert.equal(second.image_url, 'https://b/i.jpg', 'signImages가 없으면 imageObject를 쓴다')

reply(true, [])
assert.equal((await lookupSigns(['없는말'])).status, 'empty', '결과가 없으면 empty(다시 불러오기를 보이지 않는다)')
reply(false, null)
assert.equal((await lookupSigns(['x'])).status, 'error', '서버 오류는 error(다시 불러오기를 보인다)')
console.log('check-signs OK')

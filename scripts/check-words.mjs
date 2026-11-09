// 노선에 쓰인 모든 낱말이 실제 수어 자료 DB(lookup_signs)에 영상과 함께 있는지 조회하는 스크립트 (npm run check:words, .env.local 필요)
import { build } from 'esbuild'
import { readFileSync } from 'node:fs'

const env = Object.fromEntries(readFileSync('.env.local', 'utf8').trim().split(/\r?\n/).map((line) => line.split('=')))
const bundle = await build({ entryPoints: ['scripts/route-entry.ts'], bundle: true, format: 'esm', write: false })
const { lines } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`)
const words = [...new Set(lines.flatMap((line) => line.stations.flatMap((station) => station.words)))]
const found = new Map()
for (let i = 0; i < words.length; i += 6) {
  const response = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/rpc/lookup_signs`, {
    method: 'POST', headers: { apikey: env.VITE_SUPABASE_ANON_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ words: words.slice(i, i + 6) }),
  })
  if (!response.ok) throw new Error(`lookup_signs ${response.status}`)
  for (const row of await response.json()) found.set(row.word, Boolean(row.record.subDescription))
}
const missing = words.filter((word) => !found.has(word))
const noVideo = words.filter((word) => found.get(word) === false)
console.log(`낱말 ${words.length}개 중 자료 없음 ${missing.length}개, 영상 없음 ${noVideo.length}개`)
if (missing.length) console.log('자료 없음:', missing.join(', '))
if (noVideo.length) console.log('영상 없음(사진만):', noVideo.join(', '))
process.exit(missing.length ? 1 : 0)

// 노선 진행 규칙(이어서 배울 역, 다음 역, 고르기 보기, 스텝 순서)을 assert로 검증하는 스크립트 (npm run check)
import { build } from 'esbuild'
import assert from 'node:assert/strict'

const bundle = await build({ entryPoints: ['scripts/route-entry.ts'], bundle: true, format: 'esm', write: false })
const { lines, resumeStation, nextStation, quizOptions, quizPool, nextStep, findStation, doneCount } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`)

const ids = lines.flatMap((line) => line.stations.map((station) => station.id))
assert.equal(new Set(ids).size, ids.length, '역 id는 모든 노선에서 겹치지 않는다')
for (const line of lines) for (const station of line.stations) assert.ok(station.words.length >= 1 && station.words.length <= 6, `${station.id}: 낱말은 1~6개(lookup_signs 한도)`)

assert.equal(resumeStation(lines, new Set()).id, lines[0].stations[0].id, '처음에는 첫 역')
assert.equal(resumeStation(lines, new Set([lines[0].stations[0].id])).id, lines[0].stations[1].id, '익힌 역은 건너뛴다')
assert.equal(resumeStation(lines, new Set(ids)).id, lines[0].stations[0].id, '모두 익히면 첫 역으로 돌아간다')

const lastOfFirst = lines[0].stations.at(-1)
assert.equal(nextStation(lines, lastOfFirst.id).id, lines[1].stations[0].id, '노선 끝에서는 다음 노선으로 환승')
assert.equal(nextStation(lines, lines.at(-1).stations.at(-1).id), null, '마지막 역 다음은 없다')
assert.equal(findStation(lines, 'nope'), null)
assert.equal(doneCount(lines[0], new Set([lines[0].stations[0].id, 'other'])), 1)

const pool = ['가', '나', '다', '라']
for (let seed = 0; seed < 8; seed++) {
  const options = quizOptions('나', pool, seed)
  assert.equal(options.length, 3, '보기는 3개')
  assert.equal(new Set(options).size, 3, '보기는 겹치지 않는다')
  assert.ok(options.includes('나'), '정답이 들어 있다')
  assert.deepEqual(quizOptions('나', pool, seed), options, '같은 seed는 같은 보기')
}
assert.deepEqual(quizOptions('가', ['가', '나'], 0).sort(), ['가', '나'], '후보가 모자라면 있는 만큼만')
for (const line of lines) for (const [i, station] of line.stations.entries()) {
  const options = quizOptions(station.answer, quizPool(lines, line), i)
  assert.ok(options.includes(station.answer) && options.length >= 2, `${station.id}: 고르기 보기가 만들어진다`)
}
assert.ok(quizPool(lines, lines.find((line) => line.id === 'vowel')).every((answer) => /[ㅏ-ㅣ]/.test(answer)), '모음 보기에는 모음만')

assert.equal(nextStep('watch'), 'follow')
assert.equal(nextStep('choose'), 'done')
assert.equal(nextStep('done'), 'done', '완료 다음은 완료')
console.log('check-route: ok')

// 현재 data.ts의 낱말 구성에서 감수 요청 표(docs/review-request.md)와 구글 폼 생성 스크립트(docs/review-form.gs)를 만드는 스크립트 (node scripts/make-review.mjs, .env.local 필요)
import { build } from 'esbuild'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const env = Object.fromEntries(readFileSync('.env.local', 'utf8').trim().split(/\r?\n/).map((line) => line.split('=')))
const bundle = await build({ entryPoints: ['scripts/route-entry.ts'], bundle: true, format: 'esm', write: false })
const { lines } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`)
const stations = lines.filter((line) => line.kind === 'expression').flatMap((line) => line.stations)
const words = [...new Set(stations.flatMap((station) => station.words))]
const entry = new Map()
for (let i = 0; i < words.length; i += 6) {
  const response = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/rpc/lookup_signs`, {
    method: 'POST', headers: { apikey: env.VITE_SUPABASE_ANON_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ words: words.slice(i, i + 6) }),
  })
  if (!response.ok) throw new Error(`lookup_signs ${response.status}`)
  for (const row of await response.json()) entry.set(row.word, (String(row.record.url).match(/origin_no=(\d+)/) ?? [])[1])
}
const missing = words.filter((word) => !entry.get(word))
if (missing.length) throw new Error(`사전 번호를 못 찾은 낱말: ${missing.join(', ')}`)
const url = (word) => `https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=${entry.get(word)}`
const example = (station) => station.meaning.match(/"([^"]+)"/)?.[1] ?? ''
const today = new Date().toISOString().slice(0, 10)

const rows = stations.map((station, i) => `| ${i + 1} | ${station.title} | ${example(station)} | ${station.words.map((word) => `[${word}](${url(word)})`).join(' → ')} | |`)
const table = `# 손말하루 낱말 구성 감수 요청

${today} 기준입니다.

## 소개

손말하루(https://choan616.github.io/handword/)는 수어를 처음 배우는 성인을 위한 비영리 학습 웹앱입니다. 국립국어원 한국수어사전의 낱말 영상을 상황별로 묶어 차례로 보여 줍니다.

- 화면에 나오는 것은 **낱말 영상**이고, 문장 영상이 아닙니다.
- 낱말을 이어 붙인 순서가 실제 수어 문장이라고 안내하지 않습니다. 앱은 "관련 낱말을 차례로 익혀요"라고만 말합니다.
- 다만 낱말 묶음이 그 상황에 알맞은지는 수어 사용자의 확인이 필요해 감수를 부탁드립니다.

## 부탁드리는 것

표의 각 행에 대해 마지막 칸에 의견을 적어 주세요.

1. 이 상황에 이 낱말들이 알맞은가요?
2. 빠졌거나 바꿔야 할 낱말이 있나요?
3. 초보자에게 함께 알려야 할 표정, 시선, 방향이 있나요?
4. 입문자가 먼저 익힐 만한 상황인가요?

낱말을 누르면 국립국어원 한국수어사전의 상세 페이지(수형 설명, 영상)가 열립니다. 표의 순서가 앱이 보여 주는 낱말 순서입니다.

## 표

| 번호 | 상황 | 한국어 예 | 낱말(앱이 보여 주는 순서) | 감수 의견 |
|---|---|---|---|---|
${rows.join('\n')}

## 자료 출처

본 앱은 국립국어원 한국수어사전의 낱말과 영상을 원문 그대로 이용합니다. 한국수어사전은 저작자표시-비영리-변경금지 조건으로 제공됩니다.
`

const items = stations.map((station, i) => ({
  n: i + 1,
  title: station.title,
  help: `한국어 예: ${example(station)}\n낱말 순서: ${station.words.join(' → ')}\n사전 영상 보기\n${station.words.map((word) => `${word} ${url(word)}`).join('\n')}`,
}))
const script = `// 손말하루 낱말 구성 감수 폼을 만드는 구글 앱스 스크립트: script.google.com의 새 프로젝트에 붙여 넣고 createReviewForm을 한 번 실행한다 (${today} 기준, scripts/make-review.mjs가 만든 파일)
const ITEMS = ${JSON.stringify(items, null, 2)}
const INTRO = ${JSON.stringify('손말하루(https://choan616.github.io/handword/)는 수어를 처음 배우는 성인을 위한 비영리 학습 웹앱입니다. 국립국어원 한국수어사전의 낱말 영상을 상황별로 묶어 차례로 보여 줍니다.\n\n화면에 나오는 것은 낱말 영상이며 문장 영상이 아닙니다. 낱말을 이어 붙인 순서가 실제 수어 문장이라고 안내하지 않습니다. 다만 낱말 묶음이 그 상황에 알맞은지는 수어 사용자의 확인이 필요해 감수를 부탁드립니다.\n\n각 쪽에서 상황 하나씩 보여 드립니다. 일부 쪽만 답해 주셔도 큰 도움이 됩니다. 이름과 소속은 선택이며, 의견은 앱의 낱말 구성과 안내 문구를 고치는 데에만 사용합니다.')}
function createReviewForm() {
  const form = FormApp.create('손말하루 낱말 구성 감수')
  form.setDescription(INTRO)
  form.setCollectEmail(false)
  form.setProgressBar(true)
  form.setAllowResponseEdits(true)
  form.setShowLinkToRespondAgain(false)
  form.setConfirmationMessage('감수에 참여해 주셔서 감사합니다.')
  form.addTextItem().setTitle('이름 (선택)')
  form.addTextItem().setTitle('소속 또는 수어와의 관계 (선택)').setHelpText('예: 농인, 수어통역사, 수어 강사, 수어를 배우는 사람')
  ITEMS.forEach((item) => {
    form.addPageBreakItem().setTitle(item.n + '. ' + item.title).setHelpText(item.help)
    form.addMultipleChoiceItem().setTitle(item.n + '. 이 낱말 묶음이 이 상황에 알맞은가요?').setChoiceValues(['알맞음', '일부 수정이 필요함', '알맞지 않음', '판단하기 어려움'])
    form.addParagraphTextItem().setTitle(item.n + '. 의견').setHelpText('빠졌거나 바꿔야 할 낱말, 함께 알려야 할 표정·시선·방향을 자유롭게 적어 주세요.')
  })
  form.addPageBreakItem().setTitle('전체 의견')
  form.addParagraphTextItem().setTitle('입문자가 먼저 익힐 상황의 순서, 빠진 상황, 그 밖의 의견').setHelpText('선택 사항입니다.')
  Logger.log('편집 주소: ' + form.getEditUrl())
  Logger.log('응답 주소: ' + form.getPublishedUrl())
}
`
mkdirSync('docs', { recursive: true })
writeFileSync('docs/review-request.md', table, 'utf8')
writeFileSync('docs/review-form.gs', script, 'utf8')
console.log(`표 ${rows.length}행, 폼 쪽 ${items.length}개, 낱말 ${words.length}개`)

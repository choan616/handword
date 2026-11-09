// 학습 방법, 유의사항, 자료 출처 전문, 아이콘 라이선스를 안내하는 화면
import Icon from './Icon'
import { AttributionFull } from './Attribution'
type Props = { onStart: () => void }
const noticesUrl = 'https://github.com/choan616/handword/blob/main/THIRD_PARTY_NOTICES.md'
const steps = [
  { title: '노선에서 이번 역을 골라요', text: '단원은 노선, 표현은 역이에요. 이어서 배울 역은 노선 위에 "이번 역"으로 표시돼요.' },
  { title: '보기: 낱말 영상을 차례로 봐요', text: '표현을 이루는 낱말 영상이 순서대로 재생돼요. 이번 역과 다음 역 낱말을 띠에서 확인해요.' },
  { title: '따라 하기와 고르기', text: '느린 속도로 따라 해 본 뒤, 영상을 보고 알맞은 뜻을 골라요.' },
  { title: '완료하면 다음 역으로', text: '완료한 역은 이 브라우저에 익힘으로 남고, 다음에는 다음 역부터 이어서 배워요.' },
]
export default function Guide({ onStart }: Props) {
  return <section className="page" aria-labelledby="guide-title">
    <h1 id="guide-title" className="page-title">안내</h1>
    <section className="guide-block" aria-labelledby="guide-steps">
      <h2 id="guide-steps">이렇게 배워요</h2>
      <ol className="guide-steps">{steps.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.text}</span></li>)}</ol>
    </section>
    <section className="guide-block" aria-labelledby="guide-note">
      <h2 id="guide-note">알아두세요</h2>
      <p>수어는 지역·세대·개인에 따라 표현이 조금씩 다를 수 있어요. 이 서비스는 일상 대화 학습을 돕는 기초 안내이며, 실제 수어 사용자와의 소통과 전문 수업을 함께 권해요.</p>
      <p>수어 영상과 설명은 원문 그대로 표시해요. 여러 낱말은 영상을 합치지 않고 원본을 차례로 재생해요.</p>
    </section>
    <section className="guide-block" id="source" aria-labelledby="guide-source" tabIndex={-1}>
      <h2 id="guide-source">자료 출처</h2>
      <AttributionFull />
    </section>
    <section className="guide-block" aria-labelledby="guide-icons">
      <h2 id="guide-icons">아이콘 라이선스</h2>
      <p>아이콘은 Lucide·Feather의 오픈소스 아이콘(ISC·MIT 라이선스)을 사용해요.</p>
      <a className="link" href={noticesUrl} target="_blank" rel="noreferrer">라이선스 고지 보기 <Icon name="external" size={16} /></a>
    </section>
    <button type="button" className="btn btn-primary btn-block" onClick={onStart}>배우러 가기</button>
  </section>
}

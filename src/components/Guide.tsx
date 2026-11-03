// 학습 방법과 유의사항을 안내하는 화면
type Props = { onStart: () => void }
const steps = [
  { title: '표현을 골라요', text: '목록에서 필요한 표현을 고르거나 \'이어서 배우기\'를 눌러요.' },
  { title: '영상을 보고 따라 해요', text: '핵심 낱말을 하나씩 눌러 손의 움직임과 표정을 함께 따라 해요.' },
  { title: '익힌 표현으로 표시해요', text: '따라 해 본 표현은 표시해 두면 다음에 이어서 배울 수 있어요.' },
]
export default function Guide({ onStart }: Props) {
  return <section className="page" aria-labelledby="guide-title">
    <h1 id="guide-title">이용 안내</h1>
    <ol className="steps">{steps.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.text}</span></li>)}</ol>
    <div className="note">
      <strong>알아두세요</strong>
      <p>수어는 지역·세대·개인에 따라 표현이 조금씩 다를 수 있어요. 이 서비스는 일상 대화 학습을 돕는 기초 안내이며, 실제 수어 사용자와의 소통과 전문 수업을 함께 권해요.</p>
      <p>수어 영상과 설명은 원문 그대로 표시해요. 자료 출처는 모든 화면 아래쪽에 적혀 있어요.</p>
    </div>
    <button type="button" className="btn btn-primary" onClick={onStart}>배우러 가기</button>
  </section>
}

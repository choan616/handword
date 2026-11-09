// 처음 방문한 사람에게 한 번 보여 주는 시작 화면: 앱 소개와 학습 방식, 출처 표기
import Attribution from './Attribution'
import logo from '../assets/logo.svg'
type Props = { lineCount: number; stationCount: number; onStart: () => void; onSource: () => void }
export default function Intro({ lineCount, stationCount, onStart, onSource }: Props) {
  return <main className="intro">
    <img src={logo} alt="" width="68" height="50" />
    <h1>손말하루</h1>
    <p className="intro-lead">일상 한국어 수어 표현을 짧게, 차례로 익혀요.<br />지금 {lineCount}개 단원, {stationCount}개 표현이 있어요.</p>
    <ol className="guide-steps">
      <li><strong>단원은 노선, 표현은 역이에요</strong><span>이어서 배울 역이 "이번 역"으로 표시돼요.</span></li>
      <li><strong>영상을 보고 따라 해요</strong><span>낱말 영상을 차례로 보고, 뜻을 골라 확인해요.</span></li>
      <li><strong>익힌 역은 이 브라우저에 남아요</strong><span>로그인 없이 쓰고, 다음에는 다음 역부터 이어가요.</span></li>
    </ol>
    <p className="hint">수어는 지역·세대·개인에 따라 표현이 조금씩 달라요. 실제 수어 사용자와의 소통도 함께 권해요.</p>
    <button type="button" className="btn btn-primary btn-block" onClick={onStart}>시작하기</button>
    <Attribution onFull={onSource} />
  </main>
}

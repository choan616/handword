// 앱을 열 때마다 잠깐 덮는 스플래시: 가운데 로고, 아래 글자 로고. 시간이 지나면 스스로 사라진다
import { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
const SHOW_MS = 1100 // 로고를 보여 주는 시간
const FADE_MS = 300 // 사라지는 시간(index.css .splash의 transition과 같아야 한다)
export default function Splash() {
  const [phase, setPhase] = useState<'show' | 'leave' | 'done'>('show')
  // 타이머로 끝내 prefers-reduced-motion(전환 없음)에서도 반드시 사라진다
  useEffect(() => {
    const leave = setTimeout(() => setPhase('leave'), SHOW_MS)
    const done = setTimeout(() => setPhase('done'), SHOW_MS + FADE_MS)
    return () => { clearTimeout(leave); clearTimeout(done) }
  }, [])
  if (phase === 'done') return null
  return <div className={phase === 'leave' ? 'splash is-leaving' : 'splash'} aria-hidden="true">
    <img src={logo} alt="" width="104" height="77" />
    <span className="splash-name">손말하루</span>
  </div>
}

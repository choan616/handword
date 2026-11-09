// 손말하루 앱 셸: 내비게이션, 학습 진도 저장, 노선도·레슨·검색·안내 화면 전환
import { useEffect, useState } from 'react'
import { lines } from './data'
import { findStation, resumeStation } from './lib/route'
import Icon from './components/Icon'
import RouteMap from './components/RouteMap'
import Lesson from './components/Lesson'
import ExpressionSearch from './components/ExpressionSearch'
import Guide from './components/Guide'
import Attribution from './components/Attribution'
import logo from './assets/logo.svg'
type View = 'learn' | 'search' | 'guide'
const tabs: { id: View; label: string; icon: string }[] = [
  { id: 'learn', label: '배우기', icon: 'library' },
  { id: 'search', label: '검색', icon: 'search' },
  { id: 'guide', label: '안내', icon: 'info' },
]
const storeKey = 'handword-completed'
// 진도는 이 브라우저에만 저장한다(서버 없음). 저장소를 못 쓰는 환경이면 이번 방문 동안만 유지된다
function loadCompleted(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(storeKey) ?? '[]')) } catch { return new Set() }
}
export default function App() {
  const [view, setView] = useState<View>('learn')
  const [completed, setCompleted] = useState<Set<string>>(loadCompleted)
  const resumeId = resumeStation(lines, completed).id
  const [stationId, setStationId] = useState(resumeId)
  const [lessonOpen, setLessonOpen] = useState(false) // 좁은 화면에서 레슨이 노선도를 덮는지
  const [message, setMessage] = useState('')
  const [toSource, setToSource] = useState(false)
  const openStation = (id: string) => {
    if (!findStation(lines, id)) return
    setView('learn'); setStationId(id); setLessonOpen(true); window.scrollTo({ top: 0 })
  }
  const complete = (id: string) => {
    const next = new Set(completed).add(id)
    setCompleted(next)
    try { localStorage.setItem(storeKey, JSON.stringify([...next])) } catch { setMessage('이 브라우저에서는 학습 기록을 저장하지 못해요. 이번 방문 동안만 유지돼요.') }
  }
  const showSource = () => { setView('guide'); setToSource(true) }
  useEffect(() => {
    if (!toSource || view !== 'guide') return
    const target = document.getElementById('source')
    target?.scrollIntoView({ block: 'start' }); target?.focus({ preventScroll: true }); setToSource(false)
  }, [toSource, view])
  const go = (next: View) => { setView(next); setLessonOpen(false); window.scrollTo({ top: 0 }) }
  return <div className={`app view-${view}${lessonOpen ? ' lesson-open' : ''}`}>
    <header className="site-header">
      <button type="button" className="brand" onClick={() => go('learn')}><img src={logo} alt="" width="34" height="25" />손말하루</button>
      <nav className="nav" aria-label="주요 메뉴">
        {tabs.map((tab) => <button key={tab.id} type="button" className={view === tab.id ? 'nav-item is-active' : 'nav-item'} aria-current={view === tab.id ? 'page' : undefined} onClick={() => go(tab.id)}><Icon name={tab.icon} size={22} />{tab.label}</button>)}
      </nav>
      <span className="done-count">익힌 역 <strong>{completed.size}</strong></span>
    </header>
    <main>
      {view === 'learn' && <div className="learn">
        <div className="learn-map">
          <RouteMap completed={completed} resumeId={resumeId} currentId={stationId} onOpen={openStation} />
          <Attribution onFull={showSource} />
        </div>
        <div className="learn-lesson">
          <Lesson stationId={stationId} completed={completed} onComplete={complete} onOpen={openStation} onClose={() => setLessonOpen(false)} onSource={showSource} />
        </div>
      </div>}
      {view === 'search' && <><ExpressionSearch onOpen={openStation} /><Attribution onFull={showSource} /></>}
      {view === 'guide' && <Guide onStart={() => go('learn')} />}
    </main>
    {message && <div className="toast" role="status">{message}<button type="button" onClick={() => setMessage('')} aria-label="알림 닫기"><Icon name="close" size={18} /></button></div>}
  </div>
}

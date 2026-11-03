// 손말하루 앱 셸: 내비게이션, 학습 진도 저장, 화면 전환
import { useState } from 'react'
import Icon from './components/Icon'
import Library from './components/Library'
import ExpressionSearch from './components/ExpressionSearch'
import Guide from './components/Guide'
import Attribution from './components/Attribution'
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
  const [message, setMessage] = useState('')
  const toggleComplete = (lessonId: string) => {
    const next = new Set(completed)
    if (next.has(lessonId)) next.delete(lessonId); else next.add(lessonId)
    setCompleted(next)
    try {
      localStorage.setItem(storeKey, JSON.stringify([...next]))
      setMessage(next.has(lessonId) ? '익힌 표현으로 표시했어요.' : '익힘 표시를 취소했어요.')
    } catch {
      setMessage('이 브라우저에서는 학습 기록을 저장하지 못해요. 이번 방문 동안만 유지돼요.')
    }
  }
  return <div className="app">
    <header className="site-header">
      <button type="button" className="brand" onClick={() => setView('learn')}><span className="brand-mark" aria-hidden="true">ㅅ</span><span className="brand-text"><strong>손말하루</strong><small>일상 한국어 수어 학습</small></span></button>
      <nav className="nav" aria-label="주요 메뉴">
        {tabs.map((tab) => <button key={tab.id} type="button" className={view === tab.id ? 'nav-item is-active' : 'nav-item'} aria-current={view === tab.id ? 'page' : undefined} onClick={() => setView(tab.id)}><Icon name={tab.icon} size={22} />{tab.label}</button>)}
      </nav>
    </header>
    <main>
      {view === 'learn' && <Library completed={completed} onToggleComplete={toggleComplete} />}
      {view === 'search' && <ExpressionSearch />}
      {view === 'guide' && <Guide onStart={() => setView('learn')} />}
    </main>
    <footer className="site-footer"><Attribution /></footer>
    {message && <div className="toast" role="status">{message}<button type="button" onClick={() => setMessage('')} aria-label="알림 닫기">×</button></div>}
  </div>
}

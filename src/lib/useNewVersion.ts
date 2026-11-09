// 배포된 version.json을 주기적으로 확인해 지금 열린 앱보다 새 버전이 올라왔는지 알려 주는 훅
import { useEffect, useState } from 'react'

const CHECK_EVERY = 10 * 60 * 1000 // 10분

export function useNewVersion() {
  const [available, setAvailable] = useState(false)
  useEffect(() => {
    if (import.meta.env.DEV) return // 개발 서버에는 version.json이 없다
    let stopped = false
    const check = async () => {
      if (stopped || document.visibilityState !== 'visible') return
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}version.json`, { cache: 'no-store' })
        if (!response.ok) return
        const { id } = await response.json() as { id?: string }
        if (id && id !== __BUILD_ID__) { setAvailable(true); stopped = true }
      } catch { /* 오프라인 등은 다음 확인 때 다시 본다 */ }
    }
    check() // 브라우저가 옛 index.html을 캐시해 열었을 때도 바로 알아챈다
    const timer = window.setInterval(check, CHECK_EVERY)
    document.addEventListener('visibilitychange', check)
    window.addEventListener('focus', check)
    return () => { stopped = true; window.clearInterval(timer); document.removeEventListener('visibilitychange', check); window.removeEventListener('focus', check) }
  }, [])
  return available
}

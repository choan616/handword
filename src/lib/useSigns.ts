// 낱말 목록의 수어 자료를 불러오고 다시 불러오기를 제공하는 훅
import { useEffect, useState } from 'react'
import { lookupSigns, type Result } from './signs'

export function useSigns(words: string[]) {
  const key = words.join(',')
  const [data, setData] = useState<Result | null>(null)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let active = true
    setData(null)
    if (words.length) lookupSigns(words).then((result) => { if (active) setData(result) })
    return () => { active = false }
  }, [key, attempt])
  return { data, retry: () => setAttempt((count) => count + 1) }
}

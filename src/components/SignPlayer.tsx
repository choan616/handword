// 낱말 하나 이상의 수어 영상·설명을 불러와 낱말 탭과 함께 보여주는 재생 영역
import { useEffect, useState } from 'react'
import { lookupSigns, type Result } from '../lib/signs'
import Icon from './Icon'
type Props = { words: string[] }
export default function SignPlayer({ words }: Props) {
  const key = words.join(',')
  const [data, setData] = useState<Result | null>(null)
  const [word, setWord] = useState(words[0] ?? '')
  const [mediaError, setMediaError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let active = true
    setData(null)
    setWord(words[0] ?? '')
    setMediaError(false)
    lookupSigns(words).then((result) => { if (active) setData(result) })
    return () => { active = false }
  }, [key, attempt])
  const resource = data?.resources.find((item) => item.word === word)
  const loaded = data !== null
  const missing = (item: string) => loaded && !data.resources.some((entry) => entry.word === item)
  let media
  if (!loaded) media = <div className="player-state" role="status">영상을 불러오는 중이에요…</div>
  else if (resource?.video_url && !mediaError) media = <video key={resource.video_url} src={resource.video_url} controls autoPlay muted loop playsInline preload="auto" onError={() => setMediaError(true)}>이 브라우저에서는 영상을 재생할 수 없어요.</video>
  else if (resource?.image_url) media = <img src={resource.image_url} alt={`${word} 수어 동작 사진`} />
  else media = <div className="player-state">
    <p>{resource ? '이 낱말의 영상을 재생하지 못했어요.' : data.message || `'${word}'의 수어 자료가 없어요.`}</p>
    {(resource || data.status === 'error') && <button type="button" className="btn-text" onClick={() => setAttempt((count) => count + 1)}>다시 불러오기</button>}
  </div>
  return <div className="player">
    <div className="player-media">{media}</div>
    {words.length > 1 && <div className="chips" role="tablist" aria-label="낱말 선택">
      {words.map((item) => <button key={item} type="button" role="tab" aria-selected={item === word} className={item === word ? 'chip is-active' : 'chip'} onClick={() => { setWord(item); setMediaError(false) }}>{item}{missing(item) && <span className="chip-note"> · 자료 없음</span>}</button>)}
    </div>}
    {resource && <div className="player-text">
      {resource.title && resource.title !== word && <p className="player-term">표제어 · {resource.title}</p>}
      {resource.description && <p>{resource.description}</p>}
      {resource.source_url && <a className="link" href={resource.source_url} target="_blank" rel="noreferrer">{resource.source_name} <Icon name="external" size={14} /></a>}
    </div>}
  </div>
}

// 낱말 하나의 수어 영상(없으면 사진, 그것도 없으면 상태 문구)을 원본 그대로 보여 주는 재생 영역
import { useEffect, useRef, useState } from 'react'
import type { Result } from '../lib/signs'
import Icon from './Icon'
// onEnded가 true를 돌려주면 부모가 다음 낱말로 넘어간 것이라 재생 버튼을 띄우지 않는다
type Props = { data: Result | null; word: string; rate?: number; loop?: boolean; onEnded?: () => boolean | void; onRetry: () => void }
export default function SignMedia({ data, word, rate = 1, loop = false, onEnded, onRetry }: Props) {
  const video = useRef<HTMLVideoElement>(null)
  const [mediaError, setMediaError] = useState(false)
  const [stopped, setStopped] = useState(false) // 멈춤·끝남·자동 재생 막힘
  const resource = data?.resources.find((item) => item.word === word)
  useEffect(() => { setMediaError(false); setStopped(false) }, [word, data])
  // src가 바뀌면 재생 속도가 초기화되므로 기본 속도까지 함께 맞춘다
  const applyRate = () => { if (video.current) { video.current.defaultPlaybackRate = rate; video.current.playbackRate = rate } }
  useEffect(applyRate, [rate])
  // 자동 재생이 막힌 기기에서는 재생 버튼을 띄워 직접 시작하게 한다
  const start = () => { video.current?.play().then(() => setStopped(false), () => setStopped(true)) }
  useEffect(() => { if (video.current) start() }, [resource?.video_url, mediaError])
  const toggle = () => { if (video.current?.paused) start(); else video.current?.pause() }
  let media
  if (!data) media = <div className="media-state" role="status">영상을 불러오는 중이에요…</div>
  // 기본 컨트롤은 쓰지 않는다: 모바일에서 영상이 바뀔 때마다 컨트롤이 짧은 영상을 덮는다
  else if (resource?.video_url && !mediaError) media = <>
    <video ref={video} key={resource.video_url} src={resource.video_url} autoPlay muted playsInline loop={loop} preload="auto"
      onLoadedMetadata={applyRate} onPlay={() => setStopped(false)} onPause={(event) => { if (!event.currentTarget.ended) setStopped(true) }}
      onEnded={() => { if (!onEnded?.()) setStopped(true) }} onError={() => setMediaError(true)}>이 브라우저에서는 영상을 재생할 수 없어요.</video>
    <button type="button" className={stopped ? 'media-toggle is-stopped' : 'media-toggle'} onClick={toggle} aria-label={stopped ? `${word} 영상 재생` : `${word} 영상 멈춤`}>
      {stopped && <span className="media-play" aria-hidden="true"><Icon name="play" size={26} /></span>}
    </button>
  </>
  else if (resource?.image_url) media = <img src={resource.image_url} alt={`${word} 수어 동작 사진`} />
  else media = <div className="media-state">
    <p>{resource ? '이 낱말의 영상을 재생하지 못했어요.' : data.status === 'error' ? data.message : `'${word}'의 수어 자료가 없어요.`}</p>
    {(resource || data.status === 'error') && <button type="button" className="btn btn-small btn-on-dark" onClick={onRetry}>다시 불러오기</button>}
  </div>
  return <div className="media">{media}</div>
}

// 단원을 세로 노선으로 보여 주는 배우기 홈. 열린 노선 하나만 역을 펼치고 나머지는 환승 행으로 접는다
import { useState, type CSSProperties } from 'react'
import { lines } from '../data'
import { doneCount, findStation } from '../lib/route'
import Icon from './Icon'
type Props = { completed: Set<string>; resumeId: string; currentId: string | null; onOpen: (stationId: string) => void }
export default function RouteMap({ completed, resumeId, currentId, onOpen }: Props) {
  const [openLine, setOpenLine] = useState(findStation(lines, currentId ?? resumeId)?.line.id ?? lines[0].id)
  const resume = findStation(lines, resumeId)!
  return <section className="map" aria-label="학습 노선도">
    {lines.map((line) => {
      const done = doneCount(line, completed)
      const style = { '--route': line.color } as CSSProperties
      if (line.id !== openLine) return <button key={line.id} type="button" className="transfer" style={style} onClick={() => setOpenLine(line.id)} aria-expanded="false">
        <span className="line-no" aria-hidden="true">{line.label}</span>
        <span className="transfer-text">환승 · {line.title}</span>
        <span className="count">{done}/{line.stations.length}</span>
        <Icon name="next" size={18} />
      </button>
      // 지나온 구간: 익힌 역까지는 굵은 노선색, 이후는 가는 회색 선
      return <div key={line.id} className="line" style={style}>
        <h2 className="line-head"><span className="line-no" aria-hidden="true">{line.label}</span>{line.title}<span className="count">{done}/{line.stations.length}</span></h2>
        <ol className="stations">
          {line.stations.map((station, i) => {
            const state = completed.has(station.id) ? 'done' : station.id === resumeId ? 'now' : 'todo'
            const prevDone = i > 0 && completed.has(line.stations[i - 1].id)
            return <li key={station.id} className={`station is-${state}${prevDone ? ' from-done' : ''}${i === 0 ? ' is-first' : ''}${i === line.stations.length - 1 ? ' is-last' : ''}`}>
              <button type="button" className={station.id === currentId ? 'station-btn is-current' : 'station-btn'} aria-current={station.id === currentId ? 'step' : undefined} onClick={() => onOpen(station.id)}>
                <span className="marker" aria-hidden="true" />
                <span className="station-text"><strong>{station.title}</strong><small>{station.sub}</small></span>
                {state === 'done' && <span className="state-done">익힘</span>}
                {state === 'now' && <span className="state-now">이번 역</span>}
                <Icon name="next" size={18} />
              </button>
            </li>
          })}
        </ol>
      </div>
    })}
    <button type="button" className="btn btn-primary btn-block" onClick={() => onOpen(resume.station.id)}>이어서 배우기 · {resume.station.title}</button>
  </section>
}

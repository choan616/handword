// 노선·역·스텝 진행 규칙을 화면과 떼어 둔 순수 함수 모음 (scripts/check-route.mjs가 검사한다)
import type { Line, Station } from '../data'

export type Step = 'watch' | 'follow' | 'choose' | 'done'
export const steps: { id: Step; label: string }[] = [
  { id: 'watch', label: '보기' }, { id: 'follow', label: '따라 하기' }, { id: 'choose', label: '고르기' }, { id: 'done', label: '완료' },
]
export const nextStep = (step: Step): Step => steps[Math.min(steps.findIndex((item) => item.id === step) + 1, steps.length - 1)].id

export type Place = { line: Line; station: Station; index: number }
export function findStation(lines: Line[], id: string): Place | null {
  for (const line of lines) {
    const index = line.stations.findIndex((station) => station.id === id)
    if (index !== -1) return { line, station: line.stations[index], index }
  }
  return null
}
// 노선 순서대로 처음 만나는 아직 익히지 않은 역. 모두 익혔으면 첫 역
export function resumeStation(lines: Line[], completed: Set<string>): Station {
  for (const line of lines) for (const station of line.stations) if (!completed.has(station.id)) return station
  return lines[0].stations[0]
}
// 같은 노선의 다음 역, 노선 끝이면 다음 노선의 첫 역, 마지막이면 null
export function nextStation(lines: Line[], id: string): Station | null {
  const place = findStation(lines, id)
  if (!place) return null
  const after = place.line.stations[place.index + 1]
  if (after) return after
  const nextLine = lines[lines.indexOf(place.line) + 1]
  return nextLine ? nextLine.stations[0] : null
}
export const doneCount = (line: Line, completed: Set<string>) => line.stations.filter((station) => completed.has(station.id)).length

// 고르기 보기 3개: 정답과 같은 종류의 다른 답 2개. 같은 역은 늘 같은 보기·순서가 나오게 seed로 정한다
export function quizOptions(answer: string, pool: string[], seed: number): string[] {
  const others = [...new Set(pool)].filter((item) => item !== answer)
  const picks = [others[(seed + 1) % others.length], others[(seed + 2) % others.length]].filter((item, i, all) => item !== undefined && all.indexOf(item) === i)
  const options = [...picks]
  options.splice(seed % (picks.length + 1), 0, answer)
  return options
}
export function quizPool(lines: Line[], line: Line): string[] {
  // 글자는 같은 노선(자음끼리·모음끼리), 표현은 모든 표현 노선에서 보기를 고른다
  const source = line.kind === 'letter' ? [line] : lines.filter((item) => item.kind === 'expression')
  return source.flatMap((item) => item.stations.map((station) => station.answer))
}

// 표현·낱말·글자를 한 곳에서 고르고 영상 상세로 이어지는 학습 라이브러리
import { useState } from 'react'
import { lessons, wordGroups, letterFamilies, syllableExamples, type Lesson, type LetterFamily } from '../data'
import Icon from './Icon'
import SignPlayer from './SignPlayer'
type Segment = 'lesson' | 'word' | 'letter'
type Selected = { type: 'lesson'; id: string } | { type: 'word'; word: string } | { type: 'letter'; id: string }
type Props = { completed: Set<string>; onToggleComplete: (id: string) => void }
const segments: { id: Segment; label: string }[] = [{ id: 'lesson', label: '표현' }, { id: 'word', label: '낱말' }, { id: 'letter', label: '글자' }]
export default function Library({ completed, onToggleComplete }: Props) {
  const resume = lessons.find((lesson) => !completed.has(lesson.id)) ?? lessons[0]
  const [segment, setSegment] = useState<Segment>('lesson')
  const [selected, setSelected] = useState<Selected>({ type: 'lesson', id: resume.id })
  const [groupId, setGroupId] = useState(wordGroups[0].id)
  const [kind, setKind] = useState<LetterFamily['kind']>('자음')
  const [detailOpen, setDetailOpen] = useState(false)
  const group = wordGroups.find((item) => item.id === groupId) ?? wordGroups[0]
  const families = letterFamilies.filter((family) => family.kind === kind)
  const pick = (next: Selected) => { setSelected(next); setDetailOpen(true); window.scrollTo({ top: 0 }) }
  const changeSegment = (next: Segment) => {
    setSegment(next)
    setDetailOpen(false)
    if (next === 'lesson') setSelected({ type: 'lesson', id: resume.id })
    if (next === 'word') setSelected({ type: 'word', word: group.words[0] })
    if (next === 'letter') setSelected({ type: 'letter', id: families[0].id })
  }
  const changeGroup = (id: string) => { const next = wordGroups.find((item) => item.id === id) ?? wordGroups[0]; setGroupId(next.id); setSelected({ type: 'word', word: next.words[0] }) }
  const changeKind = (next: LetterFamily['kind']) => { setKind(next); setSelected({ type: 'letter', id: letterFamilies.find((family) => family.kind === next)!.id }) }
  const doneCount = lessons.filter((lesson) => completed.has(lesson.id)).length
  const lessonRow = (lesson: Lesson) => <li key={lesson.id}>
    <button type="button" className={selected.type === 'lesson' && selected.id === lesson.id ? 'row is-selected' : 'row'} onClick={() => pick({ type: 'lesson', id: lesson.id })}>
      <span className={`row-icon tone-${lesson.tone}`}><Icon name={lesson.icon} size={22} /></span>
      <span className="row-text"><strong>{lesson.title}</strong><small>{lesson.phrase}</small></span>
      {completed.has(lesson.id) ? <span className="badge"><Icon name="check" size={14} />익힘</span> : <Icon name="next" size={18} />}
    </button>
  </li>
  const detail = () => {
    if (selected.type === 'lesson') {
      const lesson = lessons.find((item) => item.id === selected.id) ?? lessons[0]
      const done = completed.has(lesson.id)
      const next = lessons[lessons.indexOf(lesson) + 1]
      return <>
        <h2>{lesson.title}</h2>
        <SignPlayer key={lesson.id} words={lesson.words} />
        <div className="phrase"><strong>{lesson.phrase}</strong><p>{lesson.meaning}</p><p className="muted">{lesson.tip}</p></div>
        <div className="actions">
          <button type="button" className={done ? 'btn is-done' : 'btn btn-primary'} onClick={() => onToggleComplete(lesson.id)}>{done ? <><Icon name="check" size={18} />익힘 표시 취소</> : '익힌 표현으로 표시'}</button>
          {next && <button type="button" className="btn" onClick={() => pick({ type: 'lesson', id: next.id })}>다음 표현 · {next.title}<Icon name="next" size={18} /></button>}
        </div>
      </>
    }
    if (selected.type === 'word') {
      const owner = wordGroups.find((item) => item.words.includes(selected.word))
      return <><h2>{selected.word}</h2>{owner && <p className="muted">{owner.label}</p>}<SignPlayer key={selected.word} words={[selected.word]} /></>
    }
    const family = letterFamilies.find((item) => item.id === selected.id) ?? letterFamilies[0]
    return <>
      <h2>{family.label}</h2>
      <SignPlayer key={family.id} words={family.letters} />
      <details className="disclosure">
        <summary>글자를 조합하는 방법</summary>
        <p>수어에 없는 이름, 지명, 새 낱말은 손가락글자로 한 글자씩 전달해요. 받침이 있으면 마지막 자음까지 이어서 표현해요.</p>
        <ul>{syllableExamples.map((example) => <li key={example.word}><strong>{example.word}</strong> = {example.initial} + {example.vowel}{example.final ? ` + ${example.final}` : ''}<small>{example.note}</small></li>)}</ul>
      </details>
    </>
  }
  return <div className={detailOpen ? 'library is-detail' : 'library'}>
    <section className="library-list" aria-label="학습 목록">
      <div className="segments" role="tablist" aria-label="학습 종류">
        {segments.map((item) => <button key={item.id} type="button" role="tab" aria-selected={segment === item.id} className={segment === item.id ? 'segment is-active' : 'segment'} onClick={() => changeSegment(item.id)}>{item.label}</button>)}
      </div>
      {segment === 'lesson' && <>
        <button type="button" className="resume" onClick={() => pick({ type: 'lesson', id: resume.id })}>
          <span className="resume-icon"><Icon name="play" size={18} /></span>
          <span className="row-text"><small>{doneCount === lessons.length ? '모두 익혔어요. 다시 볼까요?' : '이어서 배우기'}</small><strong>{resume.title}</strong></span>
          <Icon name="next" size={18} />
        </button>
        <p className="list-meta">익힌 표현 {doneCount} / {lessons.length}</p>
        <ul className="rows">{lessons.map(lessonRow)}</ul>
      </>}
      {segment === 'word' && <>
        <div className="chips" role="tablist" aria-label="낱말 주제">
          {wordGroups.map((item) => <button key={item.id} type="button" role="tab" aria-selected={item.id === group.id} className={item.id === group.id ? 'chip is-active' : 'chip'} onClick={() => changeGroup(item.id)}>{item.label}</button>)}
        </div>
        <ul className="rows">{group.words.map((word) => <li key={word}><button type="button" className={selected.type === 'word' && selected.word === word ? 'row is-selected' : 'row'} onClick={() => pick({ type: 'word', word })}><span className="row-text"><strong>{word}</strong></span><Icon name="next" size={18} /></button></li>)}</ul>
      </>}
      {segment === 'letter' && <>
        <div className="chips" role="tablist" aria-label="글자 종류">
          {(['자음', '모음'] as const).map((item) => <button key={item} type="button" role="tab" aria-selected={item === kind} className={item === kind ? 'chip is-active' : 'chip'} onClick={() => changeKind(item)}>{item}</button>)}
        </div>
        <ul className="tiles">{families.map((family) => <li key={family.id}><button type="button" className={selected.type === 'letter' && selected.id === family.id ? 'tile is-selected' : 'tile'} onClick={() => pick({ type: 'letter', id: family.id })}>{family.label}</button></li>)}</ul>
      </>}
    </section>
    <section className="library-detail" aria-live="polite">
      <button type="button" className="back" onClick={() => setDetailOpen(false)}><Icon name="back" size={18} />목록</button>
      {detail()}
    </section>
  </div>
}

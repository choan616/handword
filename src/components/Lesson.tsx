// 역 하나를 보기·따라 하기·고르기·완료 네 스텝으로 익히는 레슨 화면
import { useEffect, useState, type CSSProperties } from 'react'
import { lines, syllableExamples } from '../data'
import { findStation, nextStation, nextStep, quizOptions, quizPool, steps, type Step } from '../lib/route'
import { useSigns } from '../lib/useSigns'
import SignMedia from './SignMedia'
import Icon from './Icon'
import Attribution from './Attribution'
type Props = { stationId: string; completed: Set<string>; onComplete: (id: string) => void; onOpen: (id: string) => void; onClose: () => void; onSource: () => void }
export default function Lesson({ stationId, completed, onComplete, onOpen, onClose, onSource }: Props) {
  const { line, station, index } = findStation(lines, stationId)!
  const words = station.words
  const { data, retry } = useSigns(words)
  const [step, setStep] = useState<Step>('watch')
  const [wordIndex, setWordIndex] = useState(0)
  const [rate, setRate] = useState(1)
  const [repeat, setRepeat] = useState(false)
  const [choice, setChoice] = useState<string | null>(null)
  const [result, setResult] = useState<'right' | 'wrong' | 'empty' | null>(null)
  const [playKey, setPlayKey] = useState(0) // 같은 낱말을 처음부터 다시 틀 때 영상을 새로 붙인다
  const restart = (i = 0) => { setWordIndex(i); setPlayKey((count) => count + 1) }
  const next = nextStation(lines, station.id)
  const options = quizOptions(station.answer, quizPool(lines, line), index)
  const word = words[wordIndex]
  const go = (target: Step) => {
    setStep(target); setWordIndex(0); setRate(target === 'follow' ? 0.5 : 1); setChoice(null); setResult(null)
  }
  useEffect(() => { go('watch') }, [stationId])
  // 원본 영상을 합치지 않고 낱말 순서대로 하나씩 재생한다
  const ended = () => {
    if (wordIndex < words.length - 1) { setWordIndex(wordIndex + 1); return true }
    if (repeat && words.length > 1) { setWordIndex(0); return true }
    return false
  }
  const check = () => {
    if (!choice) { setResult('empty'); return }
    setResult(choice === station.answer ? 'right' : 'wrong')
  }
  const style = { '--route': line.color } as CSSProperties
  const stepIndex = steps.findIndex((item) => item.id === step)
  const heading = { watch: station.title, follow: '따라 해 보세요', choose: station.question, done: station.title }[step]
  const lead = {
    watch: station.meaning,
    follow: `0.5× 속도로 보며 손 모양과 표정을 같이 따라 해요. ${station.tip}`,
    choose: '영상을 보고 알맞은 답을 골라요.',
    done: completed.has(station.id)
      ? (line.kind === 'letter' ? '익힌 글자로 표시했어요.' : '익힌 표현으로 표시했어요.')
      : '충분히 익혔다면 아래 버튼으로 익힘을 표시해요.',
  }[step]
  const routeH = (all: boolean) => <ol className="route-h" aria-label="낱말 순서">
    {words.map((item, i) => {
      const state = all || i < wordIndex ? 'done' : i === wordIndex ? 'now' : 'todo'
      return <li key={item} className={`hstop is-${state}`}>
        <button type="button" onClick={() => (all ? go('watch') : restart(i))} aria-current={!all && i === wordIndex ? 'step' : undefined}>
          <span className="marker" aria-hidden="true" /><span className="hstop-label">{item}</span>
        </button>
      </li>
    })}
  </ol>
  return <article className="lesson" style={style} aria-labelledby="lesson-title">
    <div className="lesson-bar">
      <button type="button" className="icon-btn lesson-close" onClick={onClose} aria-label="노선도로 돌아가기"><Icon name="close" size={22} /></button>
      <span className="lesson-pos">{line.kind === 'letter' ? line.title : `${line.label}단원`} · {index + 1}/{line.stations.length}</span>
    </div>
    <nav className="step-tabs" aria-label="학습 단계">
      {steps.map((item, i) => <button key={item.id} type="button" className={item.id === step ? 'step-tab is-active' : 'step-tab'} aria-current={item.id === step ? 'step' : undefined} onClick={() => go(item.id)}>
        {i < stepIndex && <Icon name="check" size={14} />}{item.label}
      </button>)}
    </nav>
    <div className="lesson-head">
      <h1 id="lesson-title">{heading}</h1>
      <p>{lead}</p>
    </div>
    {step !== 'done' && <>
      <SignMedia key={playKey} data={data} word={word} rate={rate} loop={repeat && words.length === 1} onEnded={ended} onRetry={retry} />
      {/* 고르기에서는 낱말 이름이 답을 알려 주므로 띠와 낱말 노선을 숨긴다 */}
      {step !== 'choose' && <>
        <div className="now-band" aria-live="polite">
          <span className="now-label">이번 역</span><strong>{word}</strong>
          <span className="now-next">{wordIndex < words.length - 1 ? <>다음 역 <strong>{words[wordIndex + 1]}</strong></> : '마지막 역'}</span>
        </div>
        {words.length > 1 && routeH(false)}
      </>}
      {step !== 'choose' && <div className="controls">
        <div className="segmented" role="group" aria-label="재생 속도">
          {[1, 0.5].map((value) => <button key={value} type="button" aria-pressed={rate === value} onClick={() => setRate(value)}>{value}×</button>)}
        </div>
        <button type="button" className="btn btn-small" aria-pressed={repeat} onClick={() => setRepeat(!repeat)}>반복</button>
        <button type="button" className="btn btn-small" onClick={() => restart()}>처음부터</button>
      </div>}
    </>}
    {step === 'watch' && line.kind === 'letter' && <details className="disclosure">
      <summary>글자를 조합하는 방법</summary>
      <ul>{syllableExamples.map((example) => <li key={example.word}><strong>{example.word}</strong> = {example.initial} + {example.vowel}{example.final ? ` + ${example.final}` : ''}<small>{example.note}</small></li>)}</ul>
    </details>}
    {step === 'choose' && <fieldset className="options" disabled={result === 'right'}>
      <legend className="sr-only">{station.question}</legend>
      {options.map((option) => {
        const state = result === 'right' && option === station.answer ? ' is-correct' : option === choice ? ' is-selected' : ''
        return <label key={option} className={`option${state}`}>
          <input type="radio" name="answer" value={option} checked={option === choice} onChange={() => { setChoice(option); setResult(null) }} />
          <span className="option-mark" aria-hidden="true">{result === 'right' && option === station.answer && <Icon name="check" size={14} />}</span>
          {option}
        </label>
      })}
      {result === 'empty' && <p className="field-error" role="alert">답을 먼저 골라 주세요.</p>}
      {result === 'wrong' && <p className="field-error" role="alert">아니에요. 영상을 한 번 더 보고 다시 골라 보세요.</p>}
    </fieldset>}
    {step === 'done' && <>
      {routeH(true)}
      {next && <div className="next-stop">
        <h2>다음 역</h2>
        <button type="button" className="station-btn" onClick={() => onOpen(next.id)}>
          <span className="station-text"><strong>{next.title}</strong><small>{next.sub}</small></span><Icon name="next" size={18} />
        </button>
      </div>}
    </>}
    <div className="lesson-foot">
      <Attribution onFull={onSource} />
      {result === 'right' && step === 'choose' && <div className="feedback" role="status">
        <strong>정답이에요</strong>
        <p>{words.join(' · ')} {line.kind === 'letter' ? '글자를 차례로 표현해요.' : `낱말 ${words.length}개를 이어서 표현해요.`}</p>
      </div>}
      <div className="actions">
        {step === 'watch' && <button type="button" className="btn btn-primary btn-block" onClick={() => go(nextStep(step))}>다음 · 따라 하기</button>}
        {step === 'follow' && <>
          <button type="button" className="btn" onClick={() => restart()}>다시 보기</button>
          <button type="button" className="btn btn-primary" onClick={() => go(nextStep(step))}>따라 했어요</button>
        </>}
        {step === 'choose' && (result === 'right'
          ? <button type="button" className="btn btn-primary btn-block" onClick={() => go('done')}>계속하기</button>
          : <button type="button" className="btn btn-primary btn-block" onClick={check}>확인</button>)}
        {step === 'done' && <>
          {!completed.has(station.id) && <button type="button" className="btn btn-primary" aria-label="익힘으로 표시" onClick={() => onComplete(station.id)}>익힘</button>}
          {next && <button type="button" className="btn btn-primary" aria-label="다음 역으로" onClick={() => onOpen(next.id)}>다음 역</button>}
          <button type="button" className="btn" aria-label="노선도로 돌아가기" onClick={onClose}>노선도</button>
        </>}
      </div>
    </div>
  </article>
}

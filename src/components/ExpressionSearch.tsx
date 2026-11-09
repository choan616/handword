// 낱말을 입력해 수어 영상을 찾아보는 검색 화면. 검색 전에는 주제별 낱말 묶음을 보여 준다
import { useState } from 'react'
import { lines, wordGroups } from '../data'
import { useSigns } from '../lib/useSigns'
import SignMedia from './SignMedia'
import Icon from './Icon'
type Props = { onOpen: (stationId: string) => void }
export default function ExpressionSearch({ onOpen }: Props) {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')
  const { data, retry } = useSigns(submitted ? [submitted] : [])
  const search = (word: string) => { const next = word.trim(); if (next) { setQuery(next); setSubmitted(next) } }
  const resource = data?.resources.find((item) => item.word === submitted)
  const stations = lines.flatMap((line) => line.stations.filter((station) => station.words.includes(submitted)).map((station) => ({ line, station })))
  const groups = (title: string) => <section className="word-groups" aria-label={title}>
    {wordGroups.map((group) => <div key={group.id}>
      <h2 className="list-head">{group.label}</h2>
      <ul className="rows">{group.words.map((word) => <li key={word}><button type="button" className="row" onClick={() => search(word)}><span>{word}</span><Icon name="next" size={18} /></button></li>)}</ul>
    </div>)}
  </section>
  return <section className="page" aria-labelledby="search-title">
    <h1 id="search-title" className="page-title">검색</h1>
    <form className="search-form" role="search" onSubmit={(event) => { event.preventDefault(); search(query) }}>
      <label htmlFor="search-query" className="sr-only">찾고 싶은 낱말</label>
      <div className="search-field">
        <div className="search-input">
          <Icon name="search" size={18} />
          <input id="search-query" type="search" value={query} maxLength={60} placeholder="예: 감사합니다" onChange={(event) => setQuery(event.target.value)} />
          {query && <button type="button" className="icon-btn" aria-label="입력 지우기" onClick={() => { setQuery(''); setSubmitted('') }}><Icon name="close" size={18} /></button>}
        </div>
        <button type="submit" className="btn btn-primary">검색</button>
      </div>
      <p className="hint">한 단어씩 입력하면 더 정확하게 찾을 수 있어요.</p>
    </form>
    {!submitted && groups('낱말 묶음')}
    {submitted && !data && <p className="hint" role="status">찾는 중이에요…</p>}
    {submitted && data?.status === 'error' && <div className="alert" role="alert">
      <Icon name="alert" size={22} />
      <div><strong>수어 자료를 불러오지 못했어요.</strong><p>인터넷 연결을 확인한 뒤 다시 불러와 주세요. 입력한 낱말은 그대로 남아 있어요.</p>
        <button type="button" className="btn btn-small" onClick={retry}>다시 불러오기</button></div>
    </div>}
    {submitted && data && data.status !== 'error' && !resource && <>
      <div className="empty"><h2>'{submitted}'의 수어 자료가 없어요.</h2><p>띄어 써서 한 단어씩 찾거나, 아래 낱말로 시작해 보세요.</p></div>
      {groups('낱말 묶음')}
    </>}
    {resource && <div className="result">
      <div className="result-head"><h2>{submitted}</h2><p className="hint">표제어와 설명은 국립국어원 자료 원문 그대로 표시해요.</p></div>
      <SignMedia data={data} word={submitted} onRetry={retry} />
      {resource.title && resource.title !== submitted && <p className="hint">표제어 · {resource.title}</p>}
      {resource.description && <div className="result-text"><h3>수어 설명</h3><p>{resource.description}</p></div>}
      {resource.source_url && <a className="link" href={resource.source_url} target="_blank" rel="noreferrer">{resource.source_name} <Icon name="external" size={16} /></a>}
      {stations.length > 0 && <div className="result-lessons">
        <h3 className="list-head">이 낱말이 나오는 표현</h3>
        <ul className="rows">{stations.map(({ line, station }) => <li key={station.id}><button type="button" className="row" onClick={() => onOpen(station.id)}>
          <span className="station-text"><strong>{station.title}</strong><small>{line.title} {line.stations.indexOf(station) + 1}번째 역 · 낱말 {station.words.length}개</small></span><Icon name="next" size={18} />
        </button></li>)}</ul>
      </div>}
    </div>}
  </section>
}

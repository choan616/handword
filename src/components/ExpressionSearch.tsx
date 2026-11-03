// 낱말을 입력해 수어 영상을 찾아보는 검색 화면
import { useState } from 'react'
import SignPlayer from './SignPlayer'
const examples = ['안녕하세요', '화장실', '병원', '감사합니다', '괜찮다']
export default function ExpressionSearch() {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')
  const search = (word: string) => { const next = word.trim(); if (next) setSubmitted(next) }
  return <section className="page" aria-labelledby="search-title">
    <h1 id="search-title">표현 검색</h1>
    <form className="search-form" onSubmit={(event) => { event.preventDefault(); search(query) }}>
      <label htmlFor="search-query">찾고 싶은 낱말</label>
      <div className="search-field">
        <input id="search-query" type="search" value={query} maxLength={60} placeholder="예: 감사합니다, 화장실" onChange={(event) => setQuery(event.target.value)} />
        <button type="submit" className="btn btn-primary">검색</button>
      </div>
      <p className="muted">한 단어씩 입력하면 더 정확하게 찾을 수 있어요.</p>
    </form>
    <div className="chips" aria-label="검색 예시">
      {examples.map((word) => <button key={word} type="button" className="chip" onClick={() => { setQuery(word); search(word) }}>{word}</button>)}
    </div>
    {submitted && <div className="search-result"><h2>{submitted}</h2><SignPlayer key={submitted} words={[submitted]} /></div>}
  </section>
}

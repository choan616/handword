// 공공누리 제4유형 출처 표기: 화면마다 한 줄(Attribution), 전문은 안내 화면(AttributionFull)
type Props = { onFull: () => void }
export default function Attribution({ onFull }: Props) {
  return <p className="attribution">출처 국립국어원 통합 수어정보 · 공공누리 제4유형 · <button type="button" className="link-btn" onClick={onFull}>전문 보기</button></p>
}
export function AttributionFull() {
  return <p>본 저작물은 '국립국어원'에서 작성하여 <a href="https://www.kogl.or.kr" target="_blank" rel="noreferrer">공공누리 제4유형</a>으로 개방한 '통합 수어정보'를 이용하였으며, 해당 저작물은 '국립국어원, 문화포털(<a href="https://www.culture.go.kr" target="_blank" rel="noreferrer">www.culture.go.kr</a>)'에서 무료로 다운받으실 수 있습니다.</p>
}

// 24px 격자의 선 아이콘 모음 (내비게이션, 동작 공용)
// 모양은 Lucide(lucide-icons/lucide)의 공식 SVG 원본 그대로이며 고지는 THIRD_PARTY_NOTICES.md에 있다.
import type { ReactNode } from 'react'
const icons: Record<string, ReactNode> = {
  library: <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />,
  search: <><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></>,
  info: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  next: <path d="m9 18 6-6-6-6" />,
  close: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
  alert: <><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></>,
  external: <><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
}
type Props = { name: string; size?: number }
export default function Icon({ name, size = 20 }: Props) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{icons[name]}</svg>
}

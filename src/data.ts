// 표현 수업, 낱말 묶음, 손가락글자 묶음 등 학습 목록 데이터
export type Lesson = {
  id: string
  topic: string
  icon: string
  title: string
  phrase: string
  meaning: string
  tip: string
  words: string[]
  tone: string
}
export type WordGroup = { id: string; label: string; words: string[] }
export type LetterFamily = { id: string; label: string; kind: '자음' | '모음'; letters: string[] }
export type SyllableExample = { word: string; initial: string; vowel: string; final?: string; note: string }
export const lessons: Lesson[] = [
  { id: 'greeting-hello', topic: '인사', icon: 'greet', title: '처음 만났을 때 인사', phrase: '안녕하세요', meaning: '처음 만나거나 정중하게 인사할 때 쓰는 표현이에요.', tip: '상대의 눈을 보고 밝은 표정으로 인사해 보세요. 수어는 손동작뿐 아니라 표정과 시선도 함께 전달돼요.', words: ['안녕하세요', '반갑다', '감사합니다'], tone: 'blue' },
  { id: 'daily-meal', topic: '식사', icon: 'meal', title: '식사 약속 묻기', phrase: '같이 밥 먹을까요?', meaning: '식사 시간이나 함께 먹을지 자연스럽게 물을 때 사용해요.', tip: '질문할 때는 고개를 살짝 기울이고, 끝맺음 표정을 분명하게 해 보세요.', words: ['약속', '같이', '먹다'], tone: 'orange' },
  { id: 'daily-place', topic: '이동', icon: 'move', title: '장소와 길 묻기', phrase: '화장실이 어디예요?', meaning: '낯선 곳에서 필요한 장소를 찾을 때 유용한 표현이에요.', tip: '장소를 가리키는 손짓을 함께 쓰면 더 쉽게 이해할 수 있어요.', words: ['화장실', '어디', '가다'], tone: 'green' },
  { id: 'daily-shopping', topic: '쇼핑', icon: 'shop', title: '가격 확인하기', phrase: '이거 얼마예요?', meaning: '물건의 가격이나 구매 정보를 확인할 때 쓰는 기본 표현이에요.', tip: '가리키는 대상과 숫자 표현을 또렷하게 연결해 보세요.', words: ['이것', '얼마', '사다'], tone: 'purple' },
  { id: 'daily-help', topic: '도움', icon: 'help', title: '도움 요청하기', phrase: '도와주세요', meaning: '일상에서 도움이 필요할 때 가장 먼저 익혀두면 좋은 표현이에요.', tip: '급한 상황이 아니라면 천천히 반복해서 전달해도 괜찮아요.', words: ['도움', '괜찮다', '다시'], tone: 'rose' },
  { id: 'daily-feeling', topic: '감정', icon: 'feel', title: '오늘 기분 말하기', phrase: '오늘 기분이 좋아요', meaning: '내 상태를 편안하게 나누고 대화를 이어가는 표현이에요.', tip: '기분을 나타내는 표정을 함께 연습하면 의미가 더 선명해져요.', words: ['좋다', '피곤', '걱정'], tone: 'yellow' },
]
export const wordGroups: WordGroup[] = [
  { id: 'basic', label: '기초', words: ['미안하다'] },
  { id: 'people', label: '사람과 관계', words: ['나', '가족', '친구', '선생'] },
  { id: 'place', label: '장소와 생활', words: ['집', '학교', '화장실', '병원'] },
]
export const letterFamilies: LetterFamily[] = [
  { id: 'giyeok', label: 'ㄱ · ㄲ', kind: '자음', letters: ['ㄱ', 'ㄲ'] },
  { id: 'nieun', label: 'ㄴ', kind: '자음', letters: ['ㄴ'] },
  { id: 'digeut', label: 'ㄷ · ㄸ', kind: '자음', letters: ['ㄷ', 'ㄸ'] },
  { id: 'rieul', label: 'ㄹ', kind: '자음', letters: ['ㄹ'] },
  { id: 'mieum', label: 'ㅁ', kind: '자음', letters: ['ㅁ'] },
  { id: 'bieup', label: 'ㅂ · ㅃ', kind: '자음', letters: ['ㅂ', 'ㅃ'] },
  { id: 'siot', label: 'ㅅ · ㅆ', kind: '자음', letters: ['ㅅ', 'ㅆ'] },
  { id: 'ieung', label: 'ㅇ', kind: '자음', letters: ['ㅇ'] },
  { id: 'jieut', label: 'ㅈ · ㅉ', kind: '자음', letters: ['ㅈ', 'ㅉ'] },
  { id: 'chieut', label: 'ㅊ', kind: '자음', letters: ['ㅊ'] },
  { id: 'kieuk', label: 'ㅋ', kind: '자음', letters: ['ㅋ'] },
  { id: 'tieut', label: 'ㅌ', kind: '자음', letters: ['ㅌ'] },
  { id: 'pieup', label: 'ㅍ', kind: '자음', letters: ['ㅍ'] },
  { id: 'hieut', label: 'ㅎ', kind: '자음', letters: ['ㅎ'] },
  { id: 'a', label: 'ㅏ · ㅑ · ㅐ · ㅒ', kind: '모음', letters: ['ㅏ', 'ㅑ', 'ㅐ', 'ㅒ'] },
  { id: 'eo', label: 'ㅓ · ㅕ · ㅔ · ㅖ', kind: '모음', letters: ['ㅓ', 'ㅕ', 'ㅔ', 'ㅖ'] },
  { id: 'o', label: 'ㅗ · ㅘ · ㅙ · ㅚ · ㅛ', kind: '모음', letters: ['ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ'] },
  { id: 'u', label: 'ㅜ · ㅝ · ㅞ · ㅟ · ㅠ', kind: '모음', letters: ['ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ'] },
  { id: 'eu', label: 'ㅡ · ㅢ', kind: '모음', letters: ['ㅡ', 'ㅢ'] },
  { id: 'i', label: 'ㅣ', kind: '모음', letters: ['ㅣ'] },
]
export const syllableExamples: SyllableExample[] = [
  { word: '가', initial: 'ㄱ', vowel: 'ㅏ', note: '첫소리와 모음을 차례로 손가락글자로 표현해요.' },
  { word: '각', initial: 'ㄱ', vowel: 'ㅏ', final: 'ㄱ', note: '받침도 생략하지 않고, 마지막 자음을 한 번 더 표현해요.' },
  { word: '만', initial: 'ㅁ', vowel: 'ㅏ', final: 'ㄴ', note: '글자를 조합해 이름·장소처럼 낯선 낱말을 또렷하게 전달할 수 있어요.' },
]

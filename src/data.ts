// 표현 수업, 낱말 묶음, 손가락글자 묶음과 이를 단원 노선으로 엮은 학습 데이터
export type Lesson = {
  id: string
  topic: string
  title: string
  phrase: string
  meaning: string
  tip: string
  words: string[]
}
export type WordGroup = { id: string; label: string; words: string[] }
export type LetterFamily = { id: string; label: string; kind: '자음' | '모음'; letters: string[] }
export type SyllableExample = { word: string; initial: string; vowel: string; final?: string; note: string }
// 역: 노선 위의 학습 단위(표현 하나 또는 손가락글자 묶음 하나)
export type Station = { id: string; title: string; sub: string; words: string[]; question: string; answer: string; meaning: string; tip: string }
// 노선: 단원. 노선색은 단원마다 다르고 OKLCH 명도·채도를 맞춘 저채도 색이다
export type Line = { id: string; label: string; title: string; color: string; kind: 'expression' | 'letter'; stations: Station[] }
export const lessons: Lesson[] = [
  { id: 'greeting-hello', topic: '인사', title: '처음 만났을 때 인사', phrase: '안녕하세요', meaning: '처음 만나거나 정중하게 인사할 때 쓰는 표현이에요.', tip: '상대의 눈을 보고 밝은 표정으로 인사해 보세요. 수어는 손동작뿐 아니라 표정과 시선도 함께 전달돼요.', words: ['안녕하세요', '반갑다'] },
  { id: 'daily-meal', topic: '식사', title: '식사 약속 묻기', phrase: '같이 밥 먹을까요?', meaning: '식사 시간이나 함께 먹을지 자연스럽게 물을 때 사용해요.', tip: '질문할 때는 고개를 살짝 기울이고, 끝맺음 표정을 분명하게 해 보세요.', words: ['같이', '먹다'] }, // 사전에서 '밥'은 '초밥' 항목으로 연결돼 쓰지 않는다
  { id: 'daily-place', topic: '이동', title: '장소와 길 묻기', phrase: '화장실이 어디예요?', meaning: '낯선 곳에서 필요한 장소를 찾을 때 유용한 표현이에요.', tip: '장소를 가리키는 손짓을 함께 쓰면 더 쉽게 이해할 수 있어요.', words: ['화장실', '어디'] },
  { id: 'daily-shopping', topic: '쇼핑', title: '가격 확인하기', phrase: '이거 얼마예요?', meaning: '물건의 가격이나 구매 정보를 확인할 때 쓰는 기본 표현이에요.', tip: '가리키는 대상과 숫자 표현을 또렷하게 연결해 보세요.', words: ['이것', '얼마'] },
  { id: 'daily-help', topic: '도움', title: '도움 요청하기', phrase: '도와주세요', meaning: '일상에서 도움이 필요할 때 가장 먼저 익혀두면 좋은 표현이에요.', tip: '급한 상황이 아니라면 천천히 반복해서 전달해도 괜찮아요.', words: ['도움', '부탁'] },
  { id: 'daily-feeling', topic: '감정', title: '오늘 기분 말하기', phrase: '오늘 기분이 좋아요', meaning: '내 상태를 편안하게 나누고 대화를 이어가는 표현이에요.', tip: '기분을 나타내는 표정을 함께 연습하면 의미가 더 선명해져요.', words: ['오늘', '기분', '좋다'] },
  // 2026-11-09 추가: 낱말은 한국수어사전 일상생활 수어에서 골라 lookup_signs로 영상이 있는지 확인했다. 뜻·팁은 검토 전 초안이다
  { id: 'intro-name', topic: '소개', title: '이름 묻기', phrase: '이름이 뭐예요?', meaning: '처음 만난 사람의 이름을 물을 때 쓰는 표현이에요.', tip: '묻는 표현은 눈썹을 살짝 올리고 상대를 바라보며 끝맺어요.', words: ['이름', '무엇'] },
  { id: 'intro-home', topic: '소개', title: '사는 곳 묻기', phrase: '어디에 살아요?', meaning: '사는 동네를 물으며 대화를 이어갈 때 쓰는 표현이에요.', tip: '장소를 묻는 표현이라 끝에서 의문 표정을 분명히 해 보세요.', words: ['살다', '어디'] },
  { id: 'intro-bye', topic: '인사', title: '헤어질 때 인사', phrase: '다음에 또 만나요', meaning: '헤어지며 다시 만나자고 할 때 쓰는 인사예요.', tip: '밝은 표정으로 상대를 보며 마지막 낱말을 또렷하게 마무리해요.', words: ['다음', '또', '만나다'] },
  { id: 'meal-water', topic: '식사', title: '물 부탁하기', phrase: '물 좀 주세요', meaning: '식당이나 모임에서 물을 부탁할 때 쓰는 표현이에요.', tip: '부탁하는 표현은 부드러운 표정과 함께 하면 자연스러워요.', words: ['물', '주다', '부탁'] },
  { id: 'meal-hungry', topic: '식사', title: '배고픔 말하기', phrase: '배고파요, 먹고 싶어요', meaning: '배가 고파 무언가 먹고 싶다고 전할 때 쓰는 표현이에요.', tip: '배고픈 느낌을 표정에도 담아 보세요.', words: ['배고프다', '먹다', '원하다'] },
  { id: 'meal-thanks', topic: '식사', title: '식사 전 인사', phrase: '잘 먹겠습니다', meaning: '식사를 시작하기 전에 고마움을 전하는 인사예요.', tip: '상대를 보며 가볍게 고개를 숙이면 인사의 뜻이 더 잘 전해져요.', words: ['잘', '먹다'] },
  { id: 'place-hospital', topic: '이동', title: '아플 때 말하기', phrase: '아파요, 병원에 가고 싶어요', meaning: '몸이 아파 병원에 가야 한다고 알릴 때 쓰는 표현이에요.', tip: '아픈 곳이 있으면 그 부위를 가리키며 함께 전해 보세요.', words: ['아프다', '병원', '가다', '원하다'] },
  { id: 'time-now', topic: '시간', title: '시간 묻기', phrase: '지금 몇 시예요?', meaning: '현재 시각을 물을 때 쓰는 표현이에요.', tip: '시간을 묻는 표현이라 끝에서 의문 표정을 분명히 해 보세요.', words: ['지금', '시간', '몇'] },
  { id: 'weather-rain', topic: '날씨', title: '날씨 말하기', phrase: '비가 와서 추워요', meaning: '비 오는 날씨와 추운 느낌을 함께 전하는 표현이에요.', tip: '추운 느낌을 몸짓과 표정에 함께 담아 보세요.', words: ['비', '춥다'] },
  { id: 'talk-again', topic: '대화', title: '다시 말해 달라고 하기', phrase: '다시 말해 주세요', meaning: '상대의 말을 놓쳤을 때 한 번 더 부탁하는 표현이에요.', tip: '미안한 표정을 곁들이면 부탁이 더 부드럽게 전해져요.', words: ['말하다', '다시', '부탁'] },
  { id: 'talk-unknown', topic: '대화', title: '모른다고 말하기', phrase: '잘 모르겠어요', meaning: '잘 모르거나 이해하지 못했을 때 솔직하게 알리는 표현이에요.', tip: '고개를 살짝 갸웃하는 표정과 함께 하면 뜻이 분명해져요.', words: ['모르다'] },
  { id: 'talk-ok', topic: '대화', title: '알겠다고 답하기', phrase: '알겠어요, 괜찮아요', meaning: '상대의 말을 이해했고 괜찮다고 답할 때 쓰는 표현이에요.', tip: '고개를 끄덕이며 편안한 표정으로 답해 보세요.', words: ['알다', '괜찮다'] },
  { id: 'talk-sorry', topic: '대화', title: '사과하기', phrase: '미안해요', meaning: '실수했을 때 미안한 마음을 전하는 표현이에요.', tip: '미안한 마음이 표정에 드러나게 해 보세요.', words: ['미안하다'] },
  { id: 'people-family', topic: '관계', title: '가족 묻기', phrase: '가족이 몇 명이에요?', meaning: '상대의 가족 수를 물으며 대화를 이어갈 때 쓰는 표현이에요.', tip: '숫자를 묻는 표현이라 끝에서 의문 표정을 분명히 해 보세요.', words: ['가족', '몇', '사람'] },
  { id: 'people-friend', topic: '관계', title: '기다린다고 말하기', phrase: '친구를 기다려요', meaning: '누군가를 기다리는 중이라고 알릴 때 쓰는 표현이에요.', tip: '기다리는 상황을 표정에도 담아 보세요.', words: ['친구', '기다리다'] },
  { id: 'people-call', topic: '관계', title: '연락 부탁하기', phrase: '전화 주세요', meaning: '나중에 연락해 달라고 부탁할 때 쓰는 표현이에요.', tip: '부탁하는 표현은 부드러운 표정과 함께 하면 자연스러워요.', words: ['전화', '부탁'] },
  { id: 'place-subway', topic: '이동', title: '내릴 곳 묻기', phrase: '지하철 어디서 내려요?', meaning: '지하철에서 내릴 역을 물을 때 쓰는 표현이에요.', tip: '장소를 묻는 표현이라 끝에서 의문 표정을 분명히 해 보세요.', words: ['지하철', '내리다', '어디'] },
  { id: 'shop-card', topic: '쇼핑', title: '카드 결제 묻기', phrase: '카드 돼요?', meaning: '가게에서 카드로 낼 수 있는지 물을 때 쓰는 표현이에요.', tip: '카드를 함께 보여 주면 더 쉽게 전해져요.', words: ['카드', '되다'] },
  { id: 'meal-coffee', topic: '식사', title: '커피 권하기', phrase: '커피 마실래요?', meaning: '함께 커피를 마시자고 권할 때 쓰는 표현이에요.', tip: '권하는 표현이라 끝에서 의문 표정과 함께 상대를 바라봐요.', words: ['커피', '마시다'] },
  { id: 'meal-tasty', topic: '식사', title: '맛 말하기', phrase: '맛있어요', meaning: '음식이 맛있다고 전할 때 쓰는 표현이에요.', tip: '만족스러운 표정을 함께 지으면 뜻이 더 잘 전해져요.', words: ['맛있다'] },
  { id: 'time-tomorrow', topic: '시간', title: '약속 정하기', phrase: '내일 만나요', meaning: '다음 날 다시 만나자고 약속할 때 쓰는 표현이에요.', tip: '밝은 표정으로 상대를 보며 마무리해요.', words: ['내일', '만나다'] },
  { id: 'weather-hot', topic: '날씨', title: '더위 말하기', phrase: '오늘은 더워요', meaning: '오늘 날씨가 덥다고 전하는 표현이에요.', tip: '더운 느낌을 표정과 몸짓에 함께 담아 보세요.', words: ['오늘', '덥다'] },
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
const lessonStation = (id: string): Station => {
  const lesson = lessons.find((item) => item.id === id)!
  return { id: lesson.id, title: lesson.phrase, sub: `${lesson.title} · 낱말 ${lesson.words.length}개`, words: lesson.words, question: '이 표현의 뜻은?', answer: lesson.phrase, meaning: lesson.meaning, tip: lesson.tip }
}
const letterStations = (kind: LetterFamily['kind']): Station[] => letterFamilies.filter((family) => family.kind === kind).map((family) => ({
  id: `letter-${family.id}`, title: family.label, sub: `손가락글자 · ${family.letters.length}개`, words: family.letters,
  question: '이 손가락글자는?', answer: family.label,
  meaning: '수어에 없는 이름, 지명, 새 낱말은 손가락글자로 한 글자씩 전달해요.', tip: '손바닥이 어느 쪽을 향하는지도 함께 보세요.',
}))
export const lines: Line[] = [
  { id: 'basic', label: '1', title: '일상 기본 표현', color: '#2c5f6b', kind: 'expression', stations: ['greeting-hello', 'intro-name', 'intro-home', 'daily-help', 'daily-feeling', 'intro-bye'].map(lessonStation) },
  { id: 'meal-move', label: '2', title: '식사와 이동', color: '#7a502d', kind: 'expression', stations: ['daily-meal', 'meal-water', 'meal-hungry', 'meal-thanks', 'meal-tasty', 'meal-coffee', 'daily-place', 'place-subway', 'place-hospital', 'daily-shopping', 'shop-card'].map(lessonStation) },
  { id: 'time-weather', label: '3', title: '시간과 날씨', color: '#7f4851', kind: 'expression', stations: ['time-now', 'time-tomorrow', 'weather-rain', 'weather-hot'].map(lessonStation) },
  { id: 'talk-people', label: '4', title: '대화와 관계', color: '#5d5e29', kind: 'expression', stations: ['talk-again', 'talk-unknown', 'talk-ok', 'talk-sorry', 'people-family', 'people-friend', 'people-call'].map(lessonStation) },
  { id: 'consonant', label: '자', title: '손가락글자 자음', color: '#6b4e78', kind: 'letter', stations: letterStations('자음') },
  { id: 'vowel', label: '모', title: '손가락글자 모음', color: '#465a85', kind: 'letter', stations: letterStations('모음') },
]

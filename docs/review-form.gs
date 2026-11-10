// 손말하루 낱말 구성 감수 폼을 만드는 구글 앱스 스크립트: script.google.com의 새 프로젝트에 붙여 넣고 createReviewForm을 한 번 실행한다 (2026-11-10 기준, scripts/make-review.mjs가 만든 파일)
const GROUPS = [
  {
    "title": "1단원 일상 기본 표현",
    "rows": [
      "처음 만났을 때 인사: 안녕하세요 → 반갑다",
      "이름 묻기: 이름 → 무엇",
      "사는 곳 묻기: 살다 → 어디",
      "도움 요청하기: 도움 → 주세요",
      "오늘 기분 말하기: 오늘 → 기분 → 좋다",
      "헤어질 때 인사: 다음 → 또 → 만나다"
    ]
  },
  {
    "title": "2단원 식사와 이동",
    "rows": [
      "식사 약속 묻기: 같이 → 먹다",
      "물 부탁하기: 물 → 주세요",
      "배고픔 말하기: 배고프다 → 먹다 → 원하다",
      "식사 전 인사: 잘 → 먹다",
      "맛 말하기: 맛있다",
      "커피 권하기: 커피 → 마시다",
      "장소와 길 묻기: 화장실 → 어디",
      "내릴 곳 묻기: 지하철 → 내리다 → 어디",
      "아플 때 말하기: 아프다 → 병원 → 가다 → 원하다",
      "가격 확인하기: 이것 → 얼마",
      "카드 결제 묻기: 카드 → 되다"
    ]
  },
  {
    "title": "3단원 시간과 날씨",
    "rows": [
      "시간 묻기: 지금 → 시간 → 몇",
      "약속 정하기: 내일 → 만나다",
      "날씨 말하기: 비 → 춥다",
      "더위 말하기: 오늘 → 덥다"
    ]
  },
  {
    "title": "4단원 대화와 관계",
    "rows": [
      "다시 말해 달라고 하기: 말하다 → 다시 → 주세요",
      "모른다고 말하기: 모르다",
      "알겠다고 답하기: 알다 → 괜찮다",
      "사과하기: 미안하다",
      "가족 묻기: 가족 → 몇 → 사람",
      "기다린다고 말하기: 친구 → 기다리다",
      "연락 부탁하기: 전화 → 주세요"
    ]
  }
]
const CHOICES = ['알맞음', '일부 수정이 필요함', '알맞지 않음', '판단하기 어려움']
const PAGE_HELP = "한 줄이 상황 하나이고, \"상황 이름: 낱말 순서\"로 적혀 있습니다. 낱말 영상은 아래 표에서 낱말을 눌러 볼 수 있습니다.\nhttps://github.com/choan616/handword/blob/main/docs/review-request.md\n문제가 있다고 표시한 줄은 아래 의견 칸에 상황 이름과 함께 적어 주세요."
const INTRO = "손말하루(https://choan616.github.io/handword/)는 수어를 처음 배우는 성인을 위한 비영리 학습 웹앱입니다. 국립국어원 한국수어사전의 낱말 영상을 상황별로 묶어 차례로 보여 줍니다.\n\n화면에 나오는 것은 낱말 영상이며 문장 영상이 아닙니다. 낱말을 이어 붙인 순서가 실제 수어 문장이라고 안내하지 않습니다. 다만 낱말 묶음이 그 상황에 알맞은지는 수어 사용자의 확인이 필요해 감수를 부탁드립니다.\n\n단원마다 한 쪽이며, 상황 여러 개를 표로 한 번에 평가합니다. 일부 쪽만 답해 주셔도 큰 도움이 됩니다. 이름과 소속은 선택이며, 의견은 앱의 낱말 구성과 안내 문구를 고치는 데에만 사용합니다."
function createReviewForm() {
  const form = FormApp.create('손말하루 낱말 구성 감수')
  form.setDescription(INTRO)
  form.setCollectEmail(false)
  form.setProgressBar(true)
  form.setAllowResponseEdits(true)
  form.setShowLinkToRespondAgain(false)
  form.setConfirmationMessage('감수에 참여해 주셔서 감사합니다.')
  form.addTextItem().setTitle('이름 (선택)')
  form.addTextItem().setTitle('소속 또는 수어와의 관계 (선택)').setHelpText('예: 농인, 수어통역사, 수어 강사, 수어를 배우는 사람')
  GROUPS.forEach((group) => {
    form.addPageBreakItem().setTitle(group.title).setHelpText(PAGE_HELP)
    form.addGridItem().setTitle('이 낱말 묶음이 이 상황에 알맞은가요?').setRows(group.rows).setColumns(CHOICES).setRequired(false)
    form.addParagraphTextItem().setTitle('이 단원 의견').setHelpText('빠졌거나 바꿔야 할 낱말, 함께 알려야 할 표정·시선·방향을 자유롭게 적어 주세요. (선택)')
  })
  form.addPageBreakItem().setTitle('전체 의견')
  form.addParagraphTextItem().setTitle('입문자가 먼저 익힐 상황의 순서, 빠진 상황, 그 밖의 의견').setHelpText('선택 사항입니다.')
  Logger.log('편집 주소: ' + form.getEditUrl())
  Logger.log('응답 주소: ' + form.getPublishedUrl())
}

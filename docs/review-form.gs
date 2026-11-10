// 손말하루 낱말 구성 감수 폼을 만드는 구글 앱스 스크립트: script.google.com의 새 프로젝트에 붙여 넣고 createReviewForm을 한 번 실행한다 (2026-11-10 기준, scripts/make-review.mjs가 만든 파일)
const ITEMS = [
  {
    "n": 1,
    "title": "처음 만났을 때 인사",
    "help": "한국어 예: 안녕하세요\n낱말 순서: 안녕하세요 → 반갑다\n사전 영상 보기\n안녕하세요 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=3331\n반갑다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=12464"
  },
  {
    "n": 2,
    "title": "이름 묻기",
    "help": "한국어 예: 이름이 뭐예요?\n낱말 순서: 이름 → 무엇\n사전 영상 보기\n이름 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=7059\n무엇 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=7224"
  },
  {
    "n": 3,
    "title": "사는 곳 묻기",
    "help": "한국어 예: 어디에 살아요?\n낱말 순서: 살다 → 어디\n사전 영상 보기\n살다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=8291\n어디 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=8799"
  },
  {
    "n": 4,
    "title": "도움 요청하기",
    "help": "한국어 예: 도와주세요\n낱말 순서: 도움 → 주세요\n사전 영상 보기\n도움 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=5447\n주세요 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6980"
  },
  {
    "n": 5,
    "title": "오늘 기분 말하기",
    "help": "한국어 예: 오늘 기분이 좋아요\n낱말 순서: 오늘 → 기분 → 좋다\n사전 영상 보기\n오늘 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=7703\n기분 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=9360\n좋다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=9078"
  },
  {
    "n": 6,
    "title": "헤어질 때 인사",
    "help": "한국어 예: 다음에 또 만나요\n낱말 순서: 다음 → 또 → 만나다\n사전 영상 보기\n다음 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=15350\n또 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=7422\n만나다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=12165"
  },
  {
    "n": 7,
    "title": "식사 약속 묻기",
    "help": "한국어 예: 같이 밥 먹을까요?\n낱말 순서: 같이 → 먹다\n사전 영상 보기\n같이 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=1397\n먹다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=10419"
  },
  {
    "n": 8,
    "title": "물 부탁하기",
    "help": "한국어 예: 물 좀 주세요\n낱말 순서: 물 → 주세요\n사전 영상 보기\n물 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=10981\n주세요 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6980"
  },
  {
    "n": 9,
    "title": "배고픔 말하기",
    "help": "한국어 예: 배고파요, 먹고 싶어요\n낱말 순서: 배고프다 → 먹다 → 원하다\n사전 영상 보기\n배고프다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=9387\n먹다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=10419\n원하다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=48"
  },
  {
    "n": 10,
    "title": "식사 전 인사",
    "help": "한국어 예: 잘 먹겠습니다\n낱말 순서: 잘 → 먹다\n사전 영상 보기\n잘 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=9543\n먹다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=10419"
  },
  {
    "n": 11,
    "title": "맛 말하기",
    "help": "한국어 예: 맛있어요\n낱말 순서: 맛있다\n사전 영상 보기\n맛있다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6456"
  },
  {
    "n": 12,
    "title": "커피 권하기",
    "help": "한국어 예: 커피 마실래요?\n낱말 순서: 커피 → 마시다\n사전 영상 보기\n커피 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=8198\n마시다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6277"
  },
  {
    "n": 13,
    "title": "장소와 길 묻기",
    "help": "한국어 예: 화장실이 어디예요?\n낱말 순서: 화장실 → 어디\n사전 영상 보기\n화장실 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=971\n어디 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=8799"
  },
  {
    "n": 14,
    "title": "내릴 곳 묻기",
    "help": "한국어 예: 지하철 어디서 내려요?\n낱말 순서: 지하철 → 내리다 → 어디\n사전 영상 보기\n지하철 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=9855\n내리다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6177\n어디 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=8799"
  },
  {
    "n": 15,
    "title": "아플 때 말하기",
    "help": "한국어 예: 아파요, 병원에 가고 싶어요\n낱말 순서: 아프다 → 병원 → 가다 → 원하다\n사전 영상 보기\n아프다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=5621\n병원 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=24010\n가다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=11796\n원하다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=48"
  },
  {
    "n": 16,
    "title": "가격 확인하기",
    "help": "한국어 예: 이거 얼마예요?\n낱말 순서: 이것 → 얼마\n사전 영상 보기\n이것 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=8472\n얼마 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=7806"
  },
  {
    "n": 17,
    "title": "카드 결제 묻기",
    "help": "한국어 예: 카드 돼요?\n낱말 순서: 카드 → 되다\n사전 영상 보기\n카드 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=9962\n되다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6798"
  },
  {
    "n": 18,
    "title": "시간 묻기",
    "help": "한국어 예: 지금 몇 시예요?\n낱말 순서: 지금 → 시간 → 몇\n사전 영상 보기\n지금 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6990\n시간 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=24028\n몇 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=7806"
  },
  {
    "n": 19,
    "title": "약속 정하기",
    "help": "한국어 예: 내일 만나요\n낱말 순서: 내일 → 만나다\n사전 영상 보기\n내일 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6442\n만나다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=12165"
  },
  {
    "n": 20,
    "title": "날씨 말하기",
    "help": "한국어 예: 비가 와서 추워요\n낱말 순서: 비 → 춥다\n사전 영상 보기\n비 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6463\n춥다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=9670"
  },
  {
    "n": 21,
    "title": "더위 말하기",
    "help": "한국어 예: 오늘은 더워요\n낱말 순서: 오늘 → 덥다\n사전 영상 보기\n오늘 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=7703\n덥다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6492"
  },
  {
    "n": 22,
    "title": "다시 말해 달라고 하기",
    "help": "한국어 예: 다시 말해 주세요\n낱말 순서: 말하다 → 다시 → 주세요\n사전 영상 보기\n말하다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6135\n다시 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=7422\n주세요 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6980"
  },
  {
    "n": 23,
    "title": "모른다고 말하기",
    "help": "한국어 예: 잘 모르겠어요\n낱말 순서: 모르다\n사전 영상 보기\n모르다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=11931"
  },
  {
    "n": 24,
    "title": "알겠다고 답하기",
    "help": "한국어 예: 알겠어요, 괜찮아요\n낱말 순서: 알다 → 괜찮다\n사전 영상 보기\n알다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6031\n괜찮다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=9466"
  },
  {
    "n": 25,
    "title": "사과하기",
    "help": "한국어 예: 미안해요\n낱말 순서: 미안하다\n사전 영상 보기\n미안하다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=9917"
  },
  {
    "n": 26,
    "title": "가족 묻기",
    "help": "한국어 예: 가족이 몇 명이에요?\n낱말 순서: 가족 → 몇 → 사람\n사전 영상 보기\n가족 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6770\n몇 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=7806\n사람 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=8239"
  },
  {
    "n": 27,
    "title": "기다린다고 말하기",
    "help": "한국어 예: 친구를 기다려요\n낱말 순서: 친구 → 기다리다\n사전 영상 보기\n친구 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=7028\n기다리다 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=7336"
  },
  {
    "n": 28,
    "title": "연락 부탁하기",
    "help": "한국어 예: 전화 주세요\n낱말 순서: 전화 → 주세요\n사전 영상 보기\n전화 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=7229\n주세요 https://sldict.korean.go.kr/front/sign/signContentsView.do?top_category=CTE&origin_no=6980"
  }
]
const INTRO = "손말하루(https://choan616.github.io/handword/)는 수어를 처음 배우는 성인을 위한 비영리 학습 웹앱입니다. 국립국어원 한국수어사전의 낱말 영상을 상황별로 묶어 차례로 보여 줍니다.\n\n화면에 나오는 것은 낱말 영상이며 문장 영상이 아닙니다. 낱말을 이어 붙인 순서가 실제 수어 문장이라고 안내하지 않습니다. 다만 낱말 묶음이 그 상황에 알맞은지는 수어 사용자의 확인이 필요해 감수를 부탁드립니다.\n\n각 쪽에서 상황 하나씩 보여 드립니다. 일부 쪽만 답해 주셔도 큰 도움이 됩니다. 이름과 소속은 선택이며, 의견은 앱의 낱말 구성과 안내 문구를 고치는 데에만 사용합니다."
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
  ITEMS.forEach((item) => {
    form.addPageBreakItem().setTitle(item.n + '. ' + item.title).setHelpText(item.help)
    form.addMultipleChoiceItem().setTitle(item.n + '. 이 낱말 묶음이 이 상황에 알맞은가요?').setChoiceValues(['알맞음', '일부 수정이 필요함', '알맞지 않음', '판단하기 어려움'])
    form.addParagraphTextItem().setTitle(item.n + '. 의견').setHelpText('빠졌거나 바꿔야 할 낱말, 함께 알려야 할 표정·시선·방향을 자유롭게 적어 주세요.')
  })
  form.addPageBreakItem().setTitle('전체 의견')
  form.addParagraphTextItem().setTitle('입문자가 먼저 익힐 상황의 순서, 빠진 상황, 그 밖의 의견').setHelpText('선택 사항입니다.')
  Logger.log('편집 주소: ' + form.getEditUrl())
  Logger.log('응답 주소: ' + form.getPublishedUrl())
}

---
name: 손말하루
description: 단원을 지하철 노선으로, 표현을 역으로 읽게 해 수어 입문 성인이 이번 역부터 차례로 익히게 돕는 차분한 학습 도구
colors:
  primary: "#2c5f6b"
  primary-ink: "#114a56"
  primary-tint: "#e7f0f1"
  primary-soft: "#c5e4ed"
  hatch: "#e3edef"
  ink: "#172022"
  ink-2: "#566366"
  rule: "#d8dfe0"
  rail: "#bfcacc"
  ground: "#ffffff"
  ground-2: "#f2f5f5"
  success: "#1f7a4a"
  success-tint: "#e6f3ec"
  danger: "#a8322a"
  video: "#111318"
  route-basic: "#2c5f6b"
  route-meal-move: "#7a502d"
  route-consonant: "#6b4e78"
  route-vowel: "#465a85"
typography:
  title:
    fontFamily: "'Noto Sans KR', system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.35
  body:
    fontFamily: "'Noto Sans KR', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Noto Sans KR', system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  region: "0"
  press: "6px"
  marker: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ground}"
    rounded: "{rounded.press}"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.press}"
    height: "48px"
  option-selected:
    backgroundColor: "{colors.hatch}"
    rounded: "{rounded.press}"
  option-correct:
    backgroundColor: "{colors.success-tint}"
    textColor: "{colors.success}"
    rounded: "{rounded.press}"
---

# Design System: 손말하루

## Overview

**Creative North Star: "지하철 노선도"**

단원은 노선, 표현은 역, 낱말은 '이번 역·다음 역'이다. 학습 위치를 노선 위의 현재 위치로 읽게 한다. 흰 바탕에 먹색 글자와 1px 괘선, 굵은 노선 하나와 원형 역 표시가 화면의 뼈대다. 둥근 카드 목록과 게임식 경로 노드는 쓰지 않는다.

**Key Characteristics:**
- 앱 공통색은 쪽빛 청록 하나, 노선색은 단원마다 다르다
- 라운드는 역할별: 영역 0, 누르는 것 6px, 의미 있는 표식은 원
- 깊이는 그림자 없이 괘선과 면 색으로만 만든다
- 모바일은 노선도와 레슨을 한 장씩, 넓은 화면은 노선도·레슨 2열

## Colors

### Primary
- **쪽빛 청록** (#2c5f6b): 주 버튼, 활성 탭 밑줄, 1단원 노선. 흰 글자 대비 7.10.
- **깊은 쪽빛** (#114a56): 링크, 켜진 토글 글자.
- **옅은 쪽빛** (#e7f0f1): 이번 역 행, 켜진 토글 바탕.
- **사선 쪽빛** (#e3edef): 고르기에서 고른 보기의 사선(4px, 간격 12px).

### Route (노선색)
OKLCH 명도 0.47, 채도 0.075로 맞춰 어느 노선도 튀지 않는다. 정답 녹색과 겹치는 색상 140~160은 쓰지 않는다.
- 1단원 일상 기본 표현 #2c5f6b, 2단원 식사와 이동 #7a502d, 손가락글자 자음 #6b4e78, 손가락글자 모음 #465a85.

### Neutral
- **먹** (#172022): 본문. **보조** (#566366): 보조 글자, 흰 바탕 대비 6.1 이상.
- **괘선** (#d8dfe0), **남은 노선** (#bfcacc), **보조 바탕** (#f2f5f5). 회색에도 쪽빛 기운을 섞는다.

### Named Rules
**한 공통색 규칙.** 누르는 것(주 버튼, 활성 탭)은 단원이 바뀌어도 쪽빛 청록이다. 노선색은 노선·역·이번 역 띠·노선 번호에만 쓴다.
**유형 무색 규칙.** 보기·따라 하기·고르기 스텝마다 색을 바꾸지 않는다. 노선 은유와 충돌한다.
**형태 구분 규칙.** 고른 보기는 사선(확정 전), 정답은 녹색 채움(확정)이다. 색만으로 구분하지 않는다.

## Typography

**Font:** Noto Sans KR(Google Fonts, 400·500·700), 대체는 시스템 한글 글꼴. 숫자는 고정폭(tabular-nums).

### Hierarchy
- **Title** (700, 22px): 화면·레슨 제목.
- **Line head** (700, 18px): 노선 이름.
- **Body** (400, 16px, 1.6): 설명. 문단 폭 65ch 이하.
- **Label** (500, 13–14px): 역 보조 글자, 스텝 탭, 출처 한 줄.

## Layout

본문 최대 폭 1120px. 넓은 화면(900px 이상)은 `minmax(300px, 360px) 1fr` 두 열로 노선도가 왼쪽(고정 스크롤), 레슨이 오른쪽이다. 좁은 화면은 노선도에서 역을 누르면 레슨이 화면 전체를 덮고 헤더·탭바를 숨긴다. 영상과 이번 역 띠는 좁은 화면에서 좌우 끝까지 붙는다. 터치 대상은 최소 44px, 320px에서 가로 넘침이 없다.

## Shapes

- 영역(행, 영상, 띠, 안내 블록)은 직각이다.
- 누르는 것(버튼, 토글, 입력, 보기)은 6px이다.
- 역 표시와 노선 번호는 원이다. 지난 역은 노선색 채움, 이번 역은 흰 원에 굵은 노선색 테, 남은 역은 회색 테.
- 지난 구간은 4px 노선색, 남은 구간은 2px 회색 선이다.

## Components

### 노선도 (홈)
노선 머리(번호 원, 이름, 익힌 수/전체) 아래 역 행(제목, 보조 글자, 익힘 또는 '이번 역' 표, 화살표). 열린 노선 하나만 펼치고 나머지는 '환승' 행으로 접는다. 맨 아래 '이어서 배우기' 주 버튼.

### 레슨
닫기·위치(1단원 · 2/3) 바, 스텝 탭(보기·따라 하기·고르기·완료, 지난 스텝은 체크), 제목과 설명, 영상(낱말 원본을 차례로 재생), 이번 역 띠(노선색 바탕, 이번 역·다음 역), 가로 낱말 노선, 속도 1×/0.5×·반복·처음부터, 출처 한 줄, 하단 주 버튼. 고르기에서는 띠와 낱말 노선을 숨긴다(답이 드러남).

### 검색
입력(돋보기, 지우기)과 검색 버튼, 검색 전에는 주제별 낱말 묶음 목록. 결과는 영상, 표제어, 설명 원문, 사전 원문 링크, '이 낱말이 나오는 표현'. 결과 없음과 불러오기 실패(보조 바탕 띠, 다시 불러오기)를 구분한다.

### 안내
이렇게 배워요(번호 원을 잇는 쪽빛 노선), 알아두세요, 자료 출처 전문, 아이콘 라이선스, 배우러 가기.

## Do's and Don'ts

### Do:
- **Do** 출처 한 줄(출처 국립국어원 통합 수어정보 · 공공누리 제4유형 · 전문 보기)을 모든 화면에 둔다. 전문은 안내에만 둔다.
- **Do** 낱말 영상은 합치지 않고 원본을 차례로 재생한다.
- **Do** 포커스 외곽선(2px 쪽빛)을 항상 보이게 한다.

### Don't:
- **Don't** 헤딩 위에 작은 라벨을 얹는다.
- **Don't** 영역에 라운드를 주거나 카드 안에 카드를 넣는다.
- **Don't** 그림자로 높이를 만든다.
- **Don't** "공식" 같이 기관과 연관되어 보이는 문구를 쓴다.

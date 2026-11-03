---
name: 손말하루
description: 수어 입문 성인이 영상 하나에 집중해 익히도록 돕는 차분한 남색 학습 도구
colors:
  primary: "#4355b9"
  primary-ink: "#34449c"
  primary-tint: "#e9eaff"
  surface: "#ffffff"
  background: "#f7f7fc"
  text: "#20233a"
  muted: "#5f6380"
  line: "#e4e5ef"
  success: "#1f6b44"
  success-tint: "#e2f5ea"
typography:
  headline:
    fontFamily: "system-ui, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "system-ui, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "system-ui, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "system-ui, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "12px"
  md: "16px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    height: "44px"
    padding: "0 18px"
  button-primary-hover:
    backgroundColor: "{colors.primary-ink}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    height: "44px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    height: "40px"
    padding: "0 16px"
  chip-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
  list-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
  nav-item-active:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.sm}"
    height: "44px"
---

# Design System: 손말하루

## Overview

**Creative North Star: "조용한 교실"**

영상이 가장 큰 요소이고, 나머지는 영상을 고르고 따라 하는 일을 돕는 조용한 도구다. 남색 하나가 선택과 주요 행동을 맡고, 흰 표면과 옅은 배경이 나머지를 받친다. 화면마다 같은 머리글·폭·간격을 쓰므로 어디에 있어도 같은 앱으로 읽힌다.

장식은 쓰지 않는다. 설명하는 라벨, 이모지 아이콘, 카드 안의 카드, 히어로 일러스트가 없다. 정보 위계는 글자 크기와 굵기, 간격으로만 만든다.

**Key Characteristics:**
- 남색 단일 포인트, 나머지는 중립 면
- 시스템 한글 글꼴, 본문 16px
- 16px 반경과 1px 테두리 하나로 높이를 표현한다
- 모바일은 하단 탭바와 목록→상세, 넓은 화면은 목록·상세 2열

## Colors

중립 면 위에 남색 하나와 성공 초록만 의미를 가진다.

### Primary
- **시그널 남색** (#4355b9): 선택된 세그먼트·칩, 주요 버튼, '이어서 배우기' 행. 한 화면에서 면으로 쓰이는 곳은 한두 곳이다.
- **깊은 남색** (#34449c): 주요 버튼 hover, 링크, 활성 내비 글자.
- **옅은 남색** (#e9eaff): 세그먼트 바탕, 활성 내비 바탕, 안내 박스, 숫자 원.

### Neutral
- **옅은 라일락 바탕** (#f7f7fc): 페이지 배경.
- **종이 흰색** (#ffffff): 행, 칩, 입력, 헤더 표면.
- **먹 남색** (#20233a): 본문 글자, 영상 레터박스 바탕.
- **안개 회색** (#5f6380): 보조 글자. 배경 위 대비 4.5:1 이상.
- **가는 선** (#e4e5ef): 표면의 1px 테두리와 구분선.

### Tertiary
- **익힘 초록** (#1f6b44, 바탕 #e2f5ea): 익힌 표현 배지와 '익힘 표시 취소' 버튼에만 쓴다.

### Named Rules
**한 목소리 규칙.** 남색은 선택과 주요 행동에만 쓴다. 장식에는 쓰지 않는다.
**주제색 규칙.** 표현 주제 아이콘 바탕(파랑·주황·초록·보라·분홍·노랑 틴트)은 목록 행의 아이콘 칸 안에서만 쓴다. 면으로 번지지 않게 한다.

## Typography

**Display Font:** 없음. 큰 표제도 본문과 같은 글꼴을 쓴다.
**Body Font:** system-ui, Apple SD Gothic Neo, Malgun Gothic, Noto Sans KR (한글은 기기 기본 글꼴).

**Character:** 작업 도구답게 눈에 띄지 않는 기본 글꼴이다. 위계는 크기와 굵기로만 만든다.

### Hierarchy
- **Headline** (700, 26px, 1.3): 검색·안내 화면 제목.
- **Title** (700, 22px, 1.3): 상세 화면 제목.
- **Lead** (700, 20px): 표현 문장.
- **Body** (400, 16px, 1.6): 설명과 안내. 문단 폭은 720px 이하.
- **Label** (600, 13–14px): 보조 정보, 칩, 푸터 출처 문구(13px).

## Layout

본문 최대 폭은 1120px이다. 넓은 화면(900px 이상)은 `minmax(300px, 380px) 1fr` 두 열이고 목록이 왼쪽, 상세가 오른쪽이다. 좁은 화면은 한 열이며 목록에서 항목을 고르면 상세가 전체 화면으로 열리고 '목록' 버튼으로 돌아온다. 하단 탭바 64px가 고정되고 본문 아래에는 탭바 높이만큼 여백이 있다. 간격은 4·8·12·16·24·32px 단계를 쓴다. 터치 대상은 최소 44px이다. 320px에서 가로 넘침이 없다.

## Elevation & Depth

기본은 평평하다. 깊이는 1px 테두리와 면 색 차이로 표현한다. 그림자는 선택된 세그먼트(`0 2px 8px rgba(42,45,92,.1)`), 알림 토스트에만 쓴다. 테두리와 그림자를 한 요소에 함께 쓰지 않는다.

### Named Rules
**한 가지 높이 규칙.** 요소는 테두리 또는 그림자 중 하나만 갖는다.

## Shapes

행·영상·안내 박스는 16px, 버튼·세그먼트·내비 항목은 12px, 칩과 배지는 알약(999px)이다. 영상 영역은 3:2 비율이고 레터박스는 먹 남색이다. 아이콘은 24px 격자의 직접 그린 선 아이콘이며 선 두께 1.75로 통일한다.

## Components

### Buttons
- **Shape:** 12px 반경, 높이 44px.
- **Primary:** 남색 바탕, 흰 글자. hover는 깊은 남색.
- **Secondary:** 흰 바탕, 1px 선. 익힘 상태는 초록 틴트 바탕.
- **Text:** 밑줄 글자 버튼('다시 불러오기').

### Chips
- **Style:** 흰 바탕, 1px 선, 알약. 활성은 남색 바탕에 흰 글자.
- **State:** 낱말 탭과 필터에 같은 형태를 쓴다. 자료가 없는 낱말은 '자료 없음'이 붙는다.

### List Rows
- **Corner Style:** 16px. 아이콘 칸(44px, 주제색) · 제목과 보조 글자 · 배지 또는 화살표.
- **State:** 선택 표시(남색 테두리와 옅은 바탕)는 목록과 상세가 함께 보이는 넓은 화면에서만 쓴다.

### Inputs / Fields
- **Style:** 높이 48px, 1px 선, 12px 반경, 흰 바탕. 포커스는 3px 남색 외곽선.

### Navigation
- **넓은 화면:** 헤더 오른쪽에 아이콘+글자 항목. 활성은 옅은 남색 바탕.
- **좁은 화면:** 하단 고정 탭바, 항목은 세로 아이콘+12px 글자, 활성은 남색 글자.

### 세그먼트
- 표현·낱말·글자를 옅은 남색 바탕 트랙 위에서 고른다. 선택된 칸은 흰 면과 그림자.

## Do's and Don'ts

### Do:
- **Do** 한 화면에서 영상이 가장 크게 보이게 한다.
- **Do** 출처 문구(공공누리 제4유형)를 모든 화면 아래 13px 이상으로 둔다.
- **Do** 새 화면도 같은 머리글·폭(720px 또는 2열)·간격 단계를 쓴다.
- **Do** 포커스 외곽선(3px 남색)을 항상 보이게 한다.

### Don't:
- **Don't** 헤딩 위에 작은 라벨을 얹는다.
- **Don't** 카드 안에 카드를 넣는다.
- **Don't** 이모지를 아이콘으로 쓴다. 직접 그린 선 아이콘만 쓴다.
- **Don't** "공식" 같이 기관과 연관되어 보이는 문구를 쓴다.
- **Don't** 모달로 안내를 띄운다. 펼침 영역을 쓴다.

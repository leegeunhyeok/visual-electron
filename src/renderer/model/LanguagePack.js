/**
 * Language.js
 * 언어팩 데이터
 * [ 지원 ]
 * : 한국어
 * : 영어
 */

/* Korean */
const $kor = {
  greet: '반갑습니다',
  setting: '설정',
  drawer: [
    {
      text: '새 비쥬얼 생성',
      name: 'create'
    },
    {
      text: '검색',
      name: 'search'
    },
    {
      text: '정보',
      name: 'info'
    }
  ],
  settings: {
    language: '언어',
    fullscreen: {
      text: '전체 화면',
      enable: '활성화',
      disable: '비활성화'
    },
    update: '업데이트 확인'
  }
}

/* English */
const $eng = {
  greet: 'Welcome',
  setting: 'Setting',
  drawer: [
    {
      text: 'Create new visual',
      name: 'create'
    },
    {
      text: 'Search',
      name: 'search'
    },
    {
      text: 'Information',
      name: 'info'
    }
  ],
  settings: {
    language: 'Lauguage',
    fullscreen: {
      text: 'Full screen',
      enable: 'Enable',
      disable: 'Disable'
    },
    update: 'Check for update'
  }
}

export default {
  langs: [
    {
      lang: 'kr',
      kr: '한국어',
      en: 'Korean'
    },
    {
      lang: 'en',
      kr: '영어',
      en: 'English'
    }
  ],
  kr: $kor,
  en: $eng
}

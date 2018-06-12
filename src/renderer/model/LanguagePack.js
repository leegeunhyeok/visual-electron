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
  load: '비주얼 파일 불러오기',
  setting: '설정',
  home: '홈으로 가기',
  openErr: '파일을 여는 중 오류가 발생하였습니다',
  saveErr: '파일을 저장하는 중 오류가 발생하였습니다',
  applyErr: '데이터를 적용할 수 없습니다',
  save: '저장되었습니다',
  apply: '적용',
  already: '이미 존재합니다',
  change: '변경',
  add: '추가',
  delete: '삭제',
  properties: '속성',
  background: [
    '흰색',
    '기본'
  ],
  label: '레이블',
  drawer: {
    default: [
      {
        text: '새 비주얼 생성',
        name: 'create'
      },
      {
        text: '비주얼 불러오기',
        name: 'load'
      },
      {
        text: '정보',
        name: 'info'
      }
    ],
    edit: [
      {
        text: '저장',
        name: 'save'
      }
    ]
  },
  settings: {
    language: '언어',
    fullscreen: {
      text: '전체 화면',
      enable: '활성화',
      disable: '비활성화'
    },
    lastest: '최신 버전',
    current: '현재 버전'
  },
  info: {
    introduce: 'Electron + Vue.js 기반의 데이터 시각화 도구입니다',
    system: '시스템 정보'
  },
  create: {
    name: '비주얼 이름',
    type: '차트 유형',
    submit: '비주얼 생성',
    already: '이미 파일이 존재합니다: ',
    created: '새 비주얼이 생성되었습니다!',
    blank: '비주얼 이름과 타입은 필수 항목입니다',
    save: '비주얼 파일 저장 디렉토리 선택'
  },
  props: {
    label: '레이블',
    fill: '채우기',
    radius: '둥글기',
    lineTension: '선 곡률',
    showLine: '선 보이기',
    spanGaps: 'spanGaps',
    backgroundColor: '배경색',
    borderColor: '테두리 색',
    borderWidth: '테두리 폭',
    borderDash: '테두리 점선',
    borderDashOffset: '테두리 시작점',
    borderSkipped: '테두리 스킵',
    borderCapStyle: '테두리 끝 스타일',
    borderJoinStyle: '테두리 접점 스타일',
    hoverBackgroundColor: 'Hover 배경색',
    hoverBorderColor: 'Hover 테두리 색',
    hoverBorderWidth: 'Hover 테두리 폭',
    pointBackgroundColor: '꼭짓점 배경색',
    pointBorderColor: '꼭짓점 테두리 색',
    pointBorderWidth: '꼭짓점 테두리 폭',
    pointRadius: '꼭짓점 둥글기',
    pointStyle: '꼭짓점 스타일',
    pointHoverBackgroundColor: '꼭짓점 Hover 배경 색',
    pointHoverBorderColor: '꼭짓점 Hover 테두리 색',
    pointHoverBorderWidth: '꼭짓점 Hover 테두리 폭',
    pointHoverRadius: '꼭짓점 Hover 둥글기'
  }
}

/* English */
const $eng = {
  greet: 'Welcome',
  load: 'Visual file load',
  setting: 'Setting',
  home: 'Go to home',
  openErr: 'Open file error',
  saveErr: 'Save file error',
  applyErr: 'Can\'t apply data',
  save: 'Saved',
  apply: 'Apply',
  already: 'Already exist',
  change: 'Change',
  add: 'Add',
  delete: 'Delete',
  properties: 'Property',
  background: [
    'White',
    'Default'
  ],
  label: 'Label',
  drawer: {
    default: [
      {
        text: 'Create new Visual',
        name: 'create'
      },
      {
        text: 'Load Visual',
        name: 'load'
      },
      {
        text: 'Information',
        name: 'info'
      }
    ],
    edit: [
      {
        text: 'Save',
        name: 'save'
      }
    ]
  },
  settings: {
    language: 'Lauguage',
    fullscreen: {
      text: 'Full screen',
      enable: 'Enable',
      disable: 'Disable'
    },
    lastest: 'Lastest version',
    current: 'Current Version'
  },
  info: {
    introduce: 'Electron + Vue.js based data visualization tool',
    system: 'System Information'
  },
  create: {
    name: 'Visual Name',
    type: 'Chart type',
    submit: 'Create Visual',
    already: 'File already exists: ',
    created: 'New visual Created!',
    blank: 'Visual name and Type are required',
    save: 'Choose Visual file save directory'
  },
  props: {
    label: 'Label',
    fill: 'Fill',
    radius: 'Radius',
    lineTension: 'Line tension',
    showLine: 'Show line',
    spanGaps: 'Span gaps',
    backgroundColor: 'Background color',
    borderColor: 'Border color',
    borderWidth: 'Border width',
    borderDash: 'Border dash',
    borderDashOffset: 'Border offset',
    borderSkipped: 'Border skipped',
    borderCapStyle: 'Border cap style',
    borderJoinStyle: 'Border join style',
    hoverBackgroundColor: 'Hover background color',
    hoverBorderColor: 'Hover border color',
    hoverBorderWidth: 'Hover border width',
    pointBackgroundColor: 'Point background color',
    pointBorderColor: 'Point border color',
    pointBorderWidth: 'Point border width',
    pointRadius: 'Point radius',
    pointStyle: 'Point style',
    pointHoverBackgroundColor: 'Point hover background color',
    pointHoverBorderColor: 'Ponint hover border color',
    pointHoverBorderWidth: 'Ponint hover border width',
    pointHoverRadius: 'Ponint hover radius'
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

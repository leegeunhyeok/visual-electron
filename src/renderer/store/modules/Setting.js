const state = {
  /* 프로그램 언어 */
  lang: 'en',
  /* 전체화면 여부 */
  fullscreen: false
}

const mutations = {
  CHANGE_LANGUAGE (state, lang) {
    state.lang = lang
  },
  CHANGE_FULLSCREEN (state, fullscreen) {
    state.fullscreen = fullscreen
  }
}

export default {
  state,
  mutations
}

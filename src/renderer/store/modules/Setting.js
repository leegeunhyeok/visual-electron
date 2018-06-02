const state = {
  lang: 'en',
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

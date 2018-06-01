const state = {
  lang: 'en'
}

const mutations = {
  CHANGE_LANGUAGE (state, lang) {
    state.lang = lang
  }
}

export default {
  state,
  mutations
}

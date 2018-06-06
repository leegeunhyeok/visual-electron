const state = {
  /* 비주얼 편집 창 여부 */
  edit: false
}

const mutations = {
  CHANGE_EDIT_STATUS (state, edit) {
    state.edit = edit
  }
}

export default {
  state,
  mutations
}

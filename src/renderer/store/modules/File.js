const state = {
  /* 현재 선택된 파일 */
  fileDir: '',
  /* 저장 상태 */
  save: false
}

const mutations = {
  SET_FILE_DIR (state, fileDir) {
    state.fileDir = fileDir
  },
  SET_SAVE_STATUS (state, save) {
    state.save = save
  }
}

export default {
  state,
  mutations
}

const state = {
  /* 현재 선택된 파일 */
  fileDir: ''
}

const mutations = {
  SET_FILE_DIR (state, fileDir) {
    state.fileDir = fileDir
  }
}

export default {
  state,
  mutations
}

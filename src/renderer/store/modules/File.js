const state = {
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

const state = {
  fileName: '',
  fileDir: ''
}

const mutations = {
  SET_FILE_NAME (state, fileName) {
    state.fileName = fileName
  },
  SET_FILE_DIR (state, fileDir) {
    state.fileDir = fileDir
  }
}

export default {
  state,
  mutations
}

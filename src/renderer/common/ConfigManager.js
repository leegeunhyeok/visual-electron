/**
 * ConfigManager.js
 * $path 의 설정 파일을 읽어옵니다.
 * 설정 저장 및 불러오기 기능
 */

const fs = require('fs')
const $path = './config/config.ini'

class Config {
  constructor () {
    console.log('Created config manager instance.')
  }

  /* 설정 파일 읽고 JSON으로 변환 */
  load () {
    if (fs.existsSync($path)) {
      try {
        this.config = JSON.parse(fs.readFileSync($path, 'utf-8'))
      } catch (e) {
        this.config = {}
        console.log(e)
      }
    } else {
      this.config = {}
      this.createFile()
    }
  }

  /* 현재 설정 상태 저장 */
  save () {
    try {
      fs.writeFileSync($path, JSON.stringify(this.config), 'utf-8')
    } catch (e) {
      console.log(e)
    }
  }

  /* 새 설정 파일 생성 */
  createFile () {
    try {
      fs.openSync($path, 'w')
    } catch (e) {
      console.log(e)
    }
  }

  /* 지정 값 설정에 적용 */
  setConfig (section, key, value) {
    this.config[section][key] = value
  }

  /* 설정 값 불러오기 */
  getConfig (section, key) {
    try {
      const value = this.config[section][key]
      return value
    } catch (e) {
      return undefined
    }
  }
}

export default Config

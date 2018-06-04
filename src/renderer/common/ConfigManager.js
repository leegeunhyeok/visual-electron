/**
 * ConfigManager.js
 * $path 의 설정 파일을 읽어옵니다.
 * 설정 저장 및 불러오기 기능
 */

const fs = require('fs')
const $path = './config/config.ini'
const $dir = './config/'

/* 기본 설정 값 */
const $default = {
  Language: {
    lang: 'en'
  },
  Fullscreen: {
    enable: false
  }
}

class Config {
  /* 생성자 */
  constructor () {
    console.log('Created config manager instance.')
  }

  /* 설정 파일 읽고 JSON으로 변환 */
  load () {
    /* 파일 존재 여부 */
    if (fs.existsSync($path)) {
      try {
        /* 데이터 읽고 Json 형태로 형 변환 */
        this.config = JSON.parse(fs.readFileSync($path, 'utf-8'))
        console.log('Config loaded.')
      } catch (e) {
        /* 예외 발생 시 기본 설정으로 적용 */
        this.config = $default
        console.log(e)
      }
    } else {
      /* 설정 파일 또는 디렉토리가 없을 경우 새로 생성 */
      console.log('Create new config file.')
      this.config = $default
      this.createFile()
    }
  }

  /* 현재 설정 상태 저장 */
  save () {
    try {
      fs.writeFileSync($path, JSON.stringify(this.config), 'utf-8')
      console.log('Config saved.')
    } catch (e) {
      console.log(e)
    }
  }

  /* 새 설정 파일 생성 */
  createFile () {
    try {
      /* 설정 파일 디렉토리가 존재하지 않을 경우 디렉토리 생성 */
      if (!fs.existsSync($dir)) {
        console.log('Config directory is not exists.')
        fs.mkdirSync($dir)
      }
      /* 파일 생성 */
      fs.openSync($path, 'w')
      console.log('Created new config file.')

      /* 새 파일 생성 후 기본 설정으로 저장 */
      this.save()
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

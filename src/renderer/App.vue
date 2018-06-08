<template>
  <div id="app" class="main-background">
    <div id="header">
      <div id="drawer-open-icon" @click="drawerToggle">
        <span class="horizontal-line-top"></span>
        <span class="horizontal-line-middle"></span>
        <span class="horizontal-line-bottom"></span>
      </div>
    </div>
    <transition name="drawer-slide" mode="in-out">
      <drawer v-if="drawerOpen" :lang="lang" @clickMenu="drawerMenu" @clickEditMenu="editMenu"></drawer>
    </transition>
    <transition name="fade" mode="out-in">
      <notify v-if="notifyOpen" :message="notifyMessage" :lang="lang" @closeNotify="closeNotify"></notify>
    </transition>
    <router-view @closeDrawer="drawerClose" @openNotify="checkNotify" @fullscreen="activeFullscreen" :lang="lang" ref="edit"></router-view>
  </div>
</template>

<script>
import Language from './model/LanguagePack.js'

import Drawer from './components/Drawer.vue'
import Notify from './components/Notify.vue'

export default {
  name: 'visual-electron',
  data () {
    return {
      /* 언어 데이터 */
      lang: Language,
      /* Drawer 열림/닫힘 */
      drawerOpen: false,
      /* 알림 보임/숨김 */
      notifyOpen: false,
      /* 알림 메시지 */
      notifyMessage: ''
    }
  },
  components: {
    /* Drawer 컴포넌트 */
    'drawer': Drawer,
    /* 알림 창 컴포넌트 */
    'notify': Notify
  },
  /* Config 파일 읽기 */
  created () {
    this.$config.load()
    /* Vuex에 설정값 저장 */
    this.$store.commit('CHANGE_LANGUAGE', this.$config.getConfig('Language', 'lang'))
    this.$store.commit('CHANGE_FULLSCREEN', this.$config.getConfig('Fullscreen', 'enable'))
  },
  mounted () {
    /* 마운트 완료 후 설정의 전체화면 여부 확인 및 활성화 */
    this.activeFullscreen(this.$store.state.setting.fullscreen)
  },
  methods: {
    /* Drawer 토글 */
    drawerToggle () {
      this.drawerOpen = !this.drawerOpen
      let top = document.getElementsByClassName('horizontal-line-top')[0]
      let middle = document.getElementsByClassName('horizontal-line-middle')[0]
      let bottom = document.getElementsByClassName('horizontal-line-bottom')[0]
      if (this.drawerOpen) {
        top.classList.add('drawer-opend-top')
        middle.classList.add('drawer-opend-middle')
        bottom.classList.add('drawer-opend-bottom')
      } else {
        top.classList.remove('drawer-opend-top')
        middle.classList.remove('drawer-opend-middle')
        bottom.classList.remove('drawer-opend-bottom')
      }
    },
    /* Drawer 닫기 */
    drawerClose () {
      this.drawerOpen = false
      let top = document.getElementsByClassName('horizontal-line-top')[0]
      let middle = document.getElementsByClassName('horizontal-line-middle')[0]
      let bottom = document.getElementsByClassName('horizontal-line-bottom')[0]
      top.classList.remove('drawer-opend-top')
      middle.classList.remove('drawer-opend-middle')
      bottom.classList.remove('drawer-opend-bottom')
    },
    /* Drawer 선택 메뉴에 알맞는 동작 */
    drawerMenu (name) {
      if (name === 'create') {
        this.$router.push({name: 'create'})
      } else if (name === 'load') {
        /* Electron 다이얼로그 열기 */
        const dir = this.$electron.remote.dialog.showOpenDialog(
          {
            properties: ['openFile'],
            filters: [
              {
                name: 'Visual Data Set',
                extensions: ['vds']
              }
            ],
            title: this.lang[this.$store.state.setting.lang]['load']
          }
        )

        /* 선택된 파일이 존재 할 경우 */
        if (dir) {
          this.$store.commit('SET_FILE_DIR', dir.pop())
          this.$router.push({name: 'edit'})
        }
      } else if (name === 'info') {
        this.$router.push({name: 'info'})
      } else if (name === 'setting') {
        this.$router.push({name: 'setting'})
      }
      this.drawerClose()
    },
    /* Edit 상태의 Drawer 선택 메뉴에 알맞는 동작 */
    editMenu (name) {
      if (name === 'save') {
        this.$store.commit('SET_SAVE_STATUS', true)
      } else if (name === 'home') {
        this.$store.commit('CHANGE_EDIT_STATUS', false)
        this.$router.push({name: 'home'})
      }
      this.drawerClose()
    },
    /* 알림이 있는지 확인 */
    checkNotify (message) {
      /* 빈 메시지일 경우 알림창 열지 않음 */
      if (message === '') {
        return
      }

      /* 알림이 이미 있을 경우 기존 알림 닫고 0.5초 뒤 생성 */
      if (this.notifyOpen) {
        this.closeNotify()
        setTimeout(() => {
          this.openNotify(message)
        }, 500)
      } else {
        this.openNotify(message)
      }
    },
    /* 알림 창 열기 */
    openNotify (message) {
      this.notifyMessage = message
      this.notifyOpen = true
      /* 5초 뒤 알림 닫기 */
      setTimeout(() => {
        this.notifyOpen = false
      }, 5000)
    },
    /* 알림 창 닫기 */
    closeNotify () {
      this.notifyOpen = false
    },
    /* 전체화면 설정 */
    activeFullscreen (enable) {
      this.$electron.remote.getCurrentWindow().setFullScreen(enable)
    }
  }
}
</script>

<style>
@font-face {
  font-family: "NanumSquareRound";
  src:url('./assets/fonts/NanumSquareRoundR.eot');
  src:url('./assets/fonts/NanumSquareRoundR.eot#iefix') format('embedded-opentype'),
  url('./assets/fonts/NanumSquareRoundR.woff') format('woff'),
  url('./assets/fonts/NanumSquareRoundR.ttf') format('truetype');
  src:local(¡Ø), url('./assets/fonts/NanumSquareRoundR.woff') format('woff');
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  cursor: default;
  user-select: none;
}

::-webkit-scrollbar { 
  display: none; 
}

html, body {
  width: 100%;
  height: 100%;
}

.main-background {
  background-color: #2f3242;
  color: #a2ecfb;
}

body { 
  font-family: "NanumSquareRound";
}

#app {
  width: 100%;
  height: 100%;
}

#header {
  background-color: #21232e;
  position: absolute;
  width: 100%;
  height: 50px;
  top: 0;
  left: 0;
  z-index: 9999;
}

.horizontal-line-top {
  cursor: pointer;
  position: absolute;
  height: 2px;
  width: 30px;
  background-color: #a2ecfb;
  top: 16px;
  left: 10px;
  transition: .5s;
}

.horizontal-line-middle {
  cursor: pointer;
  position: absolute;
  height: 2px;
  width: 30px;
  background-color: #a2ecfb;
  top: 24px;
  left: 10px;
  transition: .5s;
}

.horizontal-line-bottom {
  cursor: pointer;
  position: absolute;
  height: 2px;
  width: 30px;
  background-color: #a2ecfb;
  top: 32px;
  left: 10px;
  transition: .5s;
}

.drawer-opend-top {
  width: 20px;
  left: 15px;
  top: 18px;
  transform: rotate(-40deg);
}

.drawer-opend-middle {
  width: 20px;
  left: 15px;
  opacity: 0;
}

.drawer-opend-bottom {
  width: 20px;
  left: 15px;
  top: 30px;
  transform: rotate(40deg)
}

.drawer-slide-enter-active {
  transition: all .5s;
}

.drawer-slide-leave-active {
  transition: all .5s;
}

.drawer-slide-enter, .drawer-slide-leave-to {
  transform: translateX(-300px);
}

#drawer-open-icon {
  cursor: pointer;
  width: 50px;
  height: 50px;
  transition: .5s;
}

#drawer-open-icon:hover {
  background-color: #13141a;
}

#loading-area {
  width: 100%;
  height: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.button {
  outline: none;
  cursor: pointer;
  color: #a2ecfb;
  background-color: #282a38;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  transition: .5s;
}

.button:hover {
  background-color: #1a1b24;
}

</style>

<template>
  <div id="app" class="main-background">
    <div id="main">
      <div id="header">
        <div id="drawer-open-icon" @click="drawerToggle">
          <span class="horizontal-line-top"></span>
          <span class="horizontal-line-middle"></span>
          <span class="horizontal-line-bottom"></span>
        </div>
      </div>
      <transition name="drawer-slide" mode="in-out">
        <drawer v-if="drawerOpen" :lang="lang" @clickMenu="drawerMenu"></drawer>
      </transition>
      <router-view @closeDrawer="drawerClose" :lang="lang"></router-view>
    </div>
  </div>
</template>

<script>
import Language from './model/LanguagePack.js'

import Drawer from './components/Drawer.vue'

export default {
  name: 'visual-electron',
  data () {
    return {
      lang: Language,
      drawerOpen: false,
      settingPopup: false
    }
  },
  components: {
    'drawer': Drawer
  },
  /* Config 파일 읽기 */
  created () {
    this.$config.load()
    this.$store.commit('CHANGE_LANGUAGE', this.$config.getConfig('Language', 'lang'))
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
      if (name === 'setting') {
        this.$router.push({name: 'setting'})
      }

      this.drawerClose()
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

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

body { font-family: 'Source Sans Pro', sans-serif; }

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

</style>

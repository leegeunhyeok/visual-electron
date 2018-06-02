<template>
  <div id="setting" @click="$emit('closeDrawer')">
    <div id="setting-area">
      <div id="button-group">
        <div class="setting-text">{{ lang[$store.state.setting.lang]['settings']['language'] }}</div>
        <div class="setting-button language-button" v-for="lang in lang['langs']" :key="lang.lang" @click="changeLanguage(lang.lang)">
          {{ lang[$store.state.setting.lang] }}
        </div>
      </div>
      <div id="fullscreen-area">
        <div class="setting-text">
          {{ lang[$store.state.setting.lang]['settings']['fullscreen']['text'] }}
        </div>
        <div class="setting-button" @click="toggleFullscreen">
          {{ lang[$store.state.setting.lang]['settings']['fullscreen'][fullscreen] }}
        </div>
      </div>
      <div id="check-update-area">
        <div id="checking-image-area">
          <img src="../assets/electron.png" class="rotate" v-show="checking">
        </div>
        <div id="check-update-button" class="setting-button" @click="checkUpdate">
          {{ lang[$store.state.setting.lang]['settings']['update'] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setting',
  props: ['lang'],
  data () {
    return {
      checking: false
    }
  },
  computed: {
    fullscreen () {
      return this.$store.state.setting.fullscreen ? 'disable' : 'enable'
    }
  },
  methods: {
    /* 언어 변경 이벤트 */
    changeLanguage (lang) {
      this.$store.commit('CHANGE_LANGUAGE', lang)
      this.$config.setConfig('Language', 'lang', lang)
      this.$config.save()
    },
    /* 전체화면 활성화/비활성화 토글 */
    toggleFullscreen () {
      let status = !this.$store.state.setting.fullscreen
      /* 데이터에 따라 전페화면, 기본화면 토글 */
      this.$electron.remote.getCurrentWindow().setFullScreen(status)
      this.$store.commit('CHANGE_FULLSCREEN', status)
      this.$config.setConfig('Fullscreen', 'enable', status)
      this.$config.save()
    },
    /* 업데이트 확인 */
    checkUpdate () {
      if (this.checking === false) {
        this.checking = true
        console.log('Check update')
      }
    }
  }
}
</script>

<style>

#setting {
  position: absolute;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  text-align: center;
}

#setting-area {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

#button-group {
  display: inline-block;
  padding: 10px;
  margin: 20px 0;
}

.setting-text {
  font-weight: bold;
  margin: 10px;
}

.setting-button {
  cursor: pointer;
  background-color: #282a38;
  border-radius: 5px;
  margin: auto;
  padding: 10px 20px;
  margin: 10px;
  transition: .5s;
}

.setting-button:hover {
  background-color: #1a1b24;
}

.language-button {
  float: left;
}

#fullscreen-area {
  padding: 30px;
}

#check-update-area {
  padding: 0 30px;
}

#checking-image-area {
  margin: auto;
  width: 128px;
  height: 128px;
}

.rotate {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  0% {
    opacity: 0.0;
    transform: rotate(0deg)
  }

  100% {
    opacity: 1.0;
    transform: rotate(360deg)
  }
}

#check-update-button {
  margin-top: 24px;
}

</style>

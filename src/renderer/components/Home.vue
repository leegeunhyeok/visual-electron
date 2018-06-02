<template>
  <div id="wrapper" @click="$emit('closeDrawer')">
    <div id="home">
      <div id="home-content-area">
        <img src="../assets/logo.png">
        <div id="home-greet">
          {{ lang[$store.state.setting.lang]['greet'] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  props: ['lang'],
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>

#wrapper {
  padding-top: 50px;
  width: 100%;
  height: 100%;
}

#home {
  margin: auto;
  padding-top: 20px;
  text-align: center;
}

#home-content-area {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%) translateY(-40%)
}

#home-greet {
  font-weight: bold;
}

</style>

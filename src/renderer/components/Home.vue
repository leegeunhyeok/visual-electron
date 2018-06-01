<template>
  <div id="wrapper">
    <div id="home">
      <img src="../assets/logo.png">
      <div @click="open('https://github.com/leegeunhyeok')">
        Home
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main',
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

</style>

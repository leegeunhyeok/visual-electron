<template>
  <div id="visual-edit">
    <div>{{ $store.state.file.fileDir }}</div>
    <div id="edit-chart-area">
      <canvas id="chart"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit',
  props: ['lang'],
  data () {
    return {
      fileDir: '',
      visual: {},
      option: {},
      chart: null
    }
  },
  created () {
    this.$store.commit('CHANGE_EDIT_STATUS', true)
    try {
      this.fileDir = this.$store.state.file.fileDir
      const fs = require('fs')
      const visual = fs.readFileSync(this.fileDir, 'utf-8')
      this.visual = JSON.parse(visual)
    } catch (e) {
      console.log(e)
      this.$emit('openNotify', this.lang[this.$store.state.setting.lang]['openErr'])
      this.$router.push({name: 'home'})
    }
  },
  mounted () {
    const ctx = document.getElementById('chart')
    this.chart = new this.$chart(ctx, this.visual.chart)
  }
}
</script>

<style>

#visual-edit {
  padding-top: 50px;
}

</style>

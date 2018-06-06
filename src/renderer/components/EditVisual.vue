<template>
  <div id="visual-edit">
    <div id="edit-chart-area">
      <canvas id="chart"></canvas>
    </div>
    <div id="edit-area">
      Edit area
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit',
  props: ['lang'],
  data () {
    return {
      /* 파일 경로 */
      fileDir: '',
      /* 차트 데이터 객체 */
      visual: {},
      /* 차트 옵션 문자열(순환참조 오류 방지) */
      option: '',
      /* Chart.js 인스턴스 */
      chart: null
    }
  },
  computed: {
    save () {
      return this.$store.state.file.save
    }
  },
  watch: {
    save (newVal, oldVal) {
      this.saveVisual(newVal)
    }
  },
  created () {
    try {
      this.fileDir = this.$store.state.file.fileDir
      const fs = require('fs')
      const visual = fs.readFileSync(this.fileDir, 'utf-8')
      this.visual = JSON.parse(visual)
      this.option = JSON.stringify(this.visual.chart)
      this.$store.commit('CHANGE_EDIT_STATUS', true)
    } catch (e) {
      console.log(e)
      this.$emit('openNotify', this.lang[this.$store.state.setting.lang]['openErr'])
      this.$store.commit('CHANGE_EDIT_STATUS', false)
      this.$router.push({name: 'home'})
    }
  },
  mounted () {
    /* 차트 생성 */
    const ctx = document.getElementById('chart')
    this.chart = new this.$chart(ctx, this.visual.chart)
  },
  methods: {
    saveVisual (save) {
      this.$store.commit('SET_SAVE_STATUS', false)
      try {
        if (save) {
          let saveData = this.visual
          saveData.chart = JSON.parse(this.option)
          const fs = require('fs')
          fs.writeFileSync(this.fileDir, JSON.stringify(saveData))
          this.$emit('openNotify', this.lang[this.$store.state.setting.lang]['save'])
        }
      } catch (e) {
        console.log(e)
        this.$emit('openNotify', this.lang[this.$store.state.setting.lang]['saveErr'])
      }
    }
  }
}
</script>

<style>

#visual-edit {
  padding-top: 50px;
  background-color: #2f3242;
  height: 100%;
}

#edit-chart-area {
  margin: auto;
  margin-top: 25px;
  width: 90%;
}

#edit-area {
  position: absolute;
  border-top: 1px solid #4b506a;
  background-color: #2f3242;
  width: 100%;
  padding: 10px 20px;
  bottom: 0;
}

</style>

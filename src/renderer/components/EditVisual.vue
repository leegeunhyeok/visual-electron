<template>
  <div id="visual-edit">
    <div id="edit-chart-area">
      <canvas id="chart"></canvas>
    </div>
    <div id="edit-area">
      <div id="edit-control-area">Control</div>
      <div id="edit">
        <textarea id="edit-text-area" v-model="option"></textarea>
        <button id="edit-text-apply" @click="apply">
          {{ lang[$store.state.setting.lang]['apply'] }}
        </button>
      </div>
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
      this.option = JSON.stringify(this.visual.chart, null, 1)
      this.$store.commit('CHANGE_EDIT_STATUS', true)
      console.log(this.option)
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
    },
    apply () {
      /* 옵션 String To JSON */
      const option = JSON.parse(this.option)
      const ctx = document.getElementById('chart')
      const context = ctx.getContext('2d')
      context.clearRect(0, 0, ctx.width, ctx.height)

      /* 기존의 차트 삭제 */
      if (this.chart !== null) {
        this.chart.destroy()
      }
      /* 차트 새로 생성 */
      this.chart = new this.$chart(ctx, option)
    }
  }
}
</script>

<style>

#visual-edit {
  padding-top: 50px;
  background-color: #2f3242;
  width: 100%;
  height: 100%;
}

#edit-chart-area {
  margin: auto;
  margin-top: 25px;
  width: 80%;
  height: 60%;
}

#edit-area {
  position: absolute;
  border-top: 1px solid #4b506a;
  background-color: #2f3242;
  width: 100%;
  height: 30%;
  bottom: 0;
}

#edit-control-area {
  float: left;
  width: 70%;
  height: 100%;
  margin: 0;
  padding: 10px 20px;
}

#edit {
  float: left;
  width: 30%;
  height: 100%;
  margin: 0;
  padding: 10px 20px;
  border-left: 1px solid #4b506a;
}

#edit-text-area {
  outline: none;
  width: 100%;
  height: 85%;
  background-color: #444960;
  color: #8e93af;
  transition: .5s;
}

#edit-text-area:focus {
  color: #a2ecfb;
  border: 1px solid #a2ecfb;
}

#edit-text-apply {
  outline: none;
  width: 100%;
  height: 15%;
  cursor: pointer;
  color: #a2ecfb;
  background-color: #444960;
  border: 1px solid #8e93af;
  transition: .5s;
}

#edit-text-apply:hover {
  background-color: #1a1b24;
  border: 1px solid #a2ecfb;
  
}

</style>

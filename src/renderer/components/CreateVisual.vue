<template>
  <div id="create-visual" @click="$emit('closeDrawer')">
    <div id="visual-name-area">
      <input id="visual-name" v-model="fileName" :placeholder="lang[$store.state.setting.lang]['create']['name']">
    </div>
    <div id="visual-type-list">
      <select id="chart-types" v-model="type" @change="typeChanged">
        <option value="" selected disabled hidden>{{ lang[$store.state.setting.lang]['create']['type'] }}</option>
        <option v-for="chart in charts" :key="chart.name">{{ chart.name }}</option>
      </select>
    </div>
    <div id="chart-type-area">
      <canvas id="chartType"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create',
  props: ['lang', 'charts'],
  data () {
    return {
      fileName: '',
      type: '',
      chart: null
    }
  },
  methods: {
    typeChanged () {
      var option = {}
      const ctx = document.getElementById('chartType')
      const context = ctx.getContext('2d')
      context.clearRect(0, 0, ctx.width, ctx.height)

      /* 기존의 차트 삭제 */
      if (this.chart !== null) {
        this.chart.destroy()
      }

      /* 선택한 차트 불러오기 */
      this.charts.forEach(chart => {
        if (this.type === chart.name) {
          option = chart.option
        }
      })

      /* 반응형 옵션 추가 */
      option.options = {
        responsive: true
      }

      /* 차트 생성 */
      this.chart = new this.$chart(ctx, option)
    }
  }
}
</script>

<style>

#create-visual {
  display: inline-block;
  padding-top: 100px;
  width: 100%;
  background-color: #2f3242;
}

#visual-name-area {
  margin: auto;
  text-align: center;
}

#visual-name {
  padding: 5px 10px;
  background-color: #444960;
  outline: none;
  border: 1px solid #444960;
  color: #a2ecfb;
  transition: .5s;
}

#visual-name::-webkit-input-placeholder {
  color: #acb0c4;
}

#visual-name:focus {
  border: 1px solid #a2ecfb;
}

#visual-type-list {
  margin: auto;
  margin-top: 50px;
  text-align: center;
}

#chart-types {
  background-color: #444960;
  outline: none;
  border: 1px solid #a2ecfb;
  color: #a2ecfb;
  padding: 5px;
  font-size: 1.1rem;
}

#chart-type-area {
  margin: auto;
  margin-top: 4%;
  position: relative;
  width: 40%;
  height: 24vh;
}

@media (min-width: 1200px) {
  #chart-type-area {
    margin-top: 6%;
    width: 50%;
    height: 30vh;
  }
}
</style>

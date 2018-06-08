<template>
  <div id="create-visual" @click="$emit('closeDrawer')">
    <div id="visual-name-area">
      <input id="visual-name" v-model="visualName" :placeholder="lang[$store.state.setting.lang]['create']['name']">
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
    <div id="create-button-area">
      <div id="visual-create-button" class="button" @click="onCreateVisual">
        {{ lang[$store.state.setting.lang]['create']['submit'] }}
      </div>
    </div>
  </div>
</template>

<script>
/* 차트 유형 및 임시 데이터 */
import Types from '../model/ChartTypes.js'

/* 차트 유형 및 임시 데이터 String */
const TypesString = JSON.stringify(Types)

/* 비주얼 파일 확장자 */
const ext = '.vds'

export default {
  name: 'create',
  props: ['lang'],
  data () {
    return {
      /* 비주얼 명 */
      visualName: '',
      /* 차트 타입 */
      type: '',
      /* 차트 유형 및 임시 데이터 */
      charts: Types,
      /* 차트 인스턴스 */
      chart: null,
      /* 차트 유형 및 임시 데이터 to String */
      chartString: TypesString
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
      for (let chart of Types) {
        if (this.type === chart.name) {
          option = chart.option
          break
        }
      }

      /* 차트 생성 */
      this.chart = new this.$chart(ctx, option)
    },
    /* 비주얼 생성 버튼 이벤트 */
    onCreateVisual () {
      if (this.visualName && this.type) {
        /* Electron 다이얼로그 열기 */
        const dir = this.$electron.remote.dialog.showOpenDialog(
          {
            properties: ['openDirectory'],
            title: this.lang[this.$store.state.setting.lang]['create']['save']
          }
        )

        /* 선택한 디렉토리가 존재 할 경우 */
        if (dir) {
          /* String to JSON */
          const sample = JSON.parse(TypesString)
          let option = {}

          /* 현재 선택한 차트의 옵션 선택 */
          for (let chart of sample) {
            if (this.type === chart.name) {
              option = chart.option
              break
            }
          }

          /* 저장할 데이터 */
          const saveData = {
            type: this.type,
            /* TODO: 선택한 차트 옵션값으로 지정하기 */
            chart: option
          }

          /* 저장 파일 명 */
          const filename = this.visualName + ext

          /* 파일 중복 확인 */
          try {
            const fs = require('fs')
            if (fs.existsSync(dir + '/' + filename)) {
              this.$emit('openNotify', this.lang[this.$store.state.setting.lang]['create']['already'] + filename)
            } else {
              fs.writeFileSync(dir + '/' + filename, JSON.stringify(saveData))
              this.$store.commit('SET_FILE_DIR', dir + '/' + filename)
              this.$emit('openNotify', this.lang[this.$store.state.setting.lang]['create']['created'])
              this.$router.push({name: 'edit'})
            }
          } catch (e) {
            this.$emit('openNotify', this.lang[this.$store.state.setting.lang]['saveErr'])
          }
        }
      } else {
        this.$emit('openNotify', this.lang[this.$store.state.setting.lang]['create']['blank'])
      }
    }
  }
}
</script>

<style>

#create-visual {
  display: inline-block;
  padding-top: 100px;
  width: 100%;
  height: 100%;
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
  margin-top: 6%;
  position: relative;
  width: 40%;
  height: 40%;
}

#create-button-area {
  width: 100%;
  text-align: center;
}

#visual-create-button {
  position: absolute;
  margin: 0;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}
</style>

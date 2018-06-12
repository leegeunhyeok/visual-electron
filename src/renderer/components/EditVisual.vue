<template>
  <div id="visual-edit">
    <div id="edit-chart-area">
      <canvas id="chart"></canvas>
    </div>
    <div id="edit-area">
      <div id="edit-control-area">
        <div id="edit-select-area">
          <!-- 레이블 SELECT -->
          <select class="select" v-model="label" @change="changeLabel">
            <option disabled value="">
              {{ lang[$store.state.setting.lang]['label'] }}
            </option>
            <option v-for="data in optionObject.data.labels" :key="data">
              {{ data }}
            </option>
            <option value="add"> {{ lang[$store.state.setting.lang]['add'] }} </option>
          </select>
          <!-- END -->
          <!-- 속성 SELECT -->
          <select class="select" v-model="prop" @change="changeProperty">
            <option disabled value="">
              {{ lang[$store.state.setting.lang]['properties'] }}
            </option>
            <option v-for="(prop, i) in properties[optionObject.type]" :key="i">
              {{ lang[$store.state.setting.lang]['props'][prop.name] }}
            </option>
          </select>
          <button @click="toggleBackground" class="button white-toggle">
            {{ lang[$store.state.setting.lang]['background'][background] }}
          </button>
          <!-- END -->
        </div>
        <div id="edit-cotrol" v-if="labelIdx !== -1">
          <div id="edit-label">
            <!-- 라벨 추가 -->
            <div v-if="addLabel">
              <input class="edit-input" v-model="tempLabel">
              <button class="button" @click="addLabelData">
                {{ lang[$store.state.setting.lang]['add'] }}
              </button>
            </div>
            <!-- 라벨 변경 -->
            <div v-else>
              <div>
                <input class="edit-input" v-model="tempLabel">
              </div>
              <div>
                <button class="button" @click="changeLabelData">
                  {{ lang[$store.state.setting.lang]['change'] }}
                </button>
                <button class="button" @click="deleteLabelData">
                  {{ lang[$store.state.setting.lang]['delete'] }}
                </button>
              </div>
            </div>
          </div>
          <!-- 색 변경 -->
          <div id="edit-color" v-if="color">
            Color
          </div>
        </div>
      </div>
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
import Properties from '../model/DatasetProp.js'

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
      chart: null,
      /* 차트별 프로퍼티 */
      properties: Properties,
      /* 배경 색 */
      background: 0,
      /* 선택 된 프로퍼티 */
      prop: '',
      /* 선택 레이블 */
      label: '',
      /* 변경 예정 레이블 */
      tempLabel: '',
      /* 레이블 추가 */
      addLabel: false,
      /* 색 편집 상태 */
      color: false,
      /* 선택한 레이블 인덱스 */
      labelIdx: -1
    }
  },
  computed: {
    save () {
      return this.$store.state.file.save
    },
    /* 문자열로 되어있는 옵션 객체화 */
    optionObject () {
      return JSON.parse(this.option)
    }
  },
  watch: {
    /* Vuex 저장 상태 감시 */
    save (newVal, oldVal) {
      /* 상태 변경 시 저장 메소드 호출 */
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
    /* 레이블 변경 */
    changeLabel () {
      if (this.label === 'add') {
        this.addLabel = true
        this.tempLabel = ''
      } else {
        this.addLabel = false
        this.tempLabel = this.label
        /* 레이블 인덱스 구하기 */
        for (let i = 0; i < this.optionObject.data.labels.length; i++) {
          if (this.optionObject.data.labels[i] === this.label) {
            this.labelIdx = i
            break
          }
        }
      }
    },
    /* 레이블 데이터 변경 */
    changeLabelData () {
      let option = JSON.parse(this.option)
      for (let i = 0; i < option.data.labels.length; i++) {
        if (option.data.labels[i] === this.label) {
          option.data.labels[i] = this.tempLabel
        }
      }
      /* 변경 후 임시 레이블 데이터 비우기 */
      this.tempLabel = ''
      this.option = JSON.stringify(option, null, 1)
      this.apply()
    },
    /* 레이블 추가 */
    // TODO: 현재 도넛 차트 기준으로 개발 진행 중..
    addLabelData () {
      let option = JSON.parse(this.option)
      let already = false

      /* 레이블 중복 체크 */
      for (let i = 0; i < option.data.labels.length; i++) {
        if (option.data.labels[i] === this.tempLabel) {
          already = true
          break
        }
      }

      /* 해당 레이블이 이미 존재하는 경우 */
      if (already) {
        this.$emit('openNotify', this.lang[this.$store.state.setting.lang]['already'])
      } else {
        /* 존재하지 않으면 추가 */
        option.data.labels.push(this.tempLabel)
        for (let i = 0; i < option.data.datasets.length; i++) {
          if (option.data.datasets[i]['data'] !== undefined) {
            option.data.datasets[i].backgroundColor.push('rgba(255, 255, 255, 0.2)')
            option.data.datasets[i].borderColor.push('rgba(255, 255, 255, 1)')
            option.data.datasets[i].data.push(10)
            break
          }
        }

        /* 선택 레이블 초기화 */
        this.label = ''
        /* 레이블 인덱스 초기화 */
        this.labelIdx = -1
        this.option = JSON.stringify(option, null, 1)
        this.apply()
      }
    },
    /* 레이블 삭제 */
    deleteLabelData () {
      let option = JSON.parse(this.option)
      for (let dataset of option.data.datasets) {
        Object.keys(dataset).forEach(k => {
          /* 선택된 레이블 Dataset 데이터 삭제 */
          dataset[k].splice(this.labelIdx, 1)
        })
      }
      /* 레이블 삭제 */
      option.data.labels.splice(this.labelIdx, 1)

      /* 선택 레이블 인덱스 -1 로 설정 */
      this.labelIdx = -1
      this.option = JSON.stringify(option, null, 1)
      this.apply()
    },
    /* 프로퍼티 변경 */
    changeProperty () {
      /* 선택한 프로퍼티 옵션 값 구하기 */
      for (let prop of this.properties[this.optionObject.type]) {
        if (this.lang[this.$store.state.setting.lang]['props'][prop.name] === this.prop) {
          console.log(prop.name)
          break
        }
      }
    },
    /* 배경색 토글 */
    toggleBackground () {
      this.background = this.background === 0 ? 1 : 0
      let area = document.getElementById('edit-chart-area')
      if (this.background === 1) {
        area.classList.add('white-background')
      } else {
        area.classList.remove('white-background')
      }
    },
    /* 비주얼 저장 */
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
    /* 옵션 적용 */
    apply () {
      try {
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

        /* 강제 뷰 업데이트 */
        this.$forceUpdate()
      } catch (e) {
        console.log(e)
        this.$emit('openNotify', this.lang[this.$store.state.setting.lang]['applyErr'])
      }
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

.white-background {
  background-color: #ffffff;
}

.white-toggle {
  float: right;
  margin: 0;
}

.select {
  font-family: "NanumSquareRound";
  margin: 0;
  margin-right: 10px;
  float: left;
  background-color: #444960;
  outline: none;
  border: 1px solid #a2ecfb;
  color: #a2ecfb;
  padding: 5px;
  font-size: 1.1rem;
}

#edit-select-area {
  display: inline-block;
  width: 100%;
}

#edit-control {
  float: left;
  width: 100%;
}

.edit-input {
  outline: none;
  border: 1px solid #8e93af;
  background-color: #444960;
  padding: 5px 10px;
  color: #8e93af;
  transition: .5s;
}

.edit-input:focus {
  color: #a2ecfb;
  border: 1px solid #a2ecfb;
}

</style>

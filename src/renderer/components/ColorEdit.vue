<template>
  <div id="edit-color">
    <div class="color-picker">
      <label>{{ lang[$store.state.setting.lang]['color'] }}</label>
      <input type="color" id="color" v-model="colorValue" @change="setPreview">
    </div>
    <div class="color-picker">
      <label>{{ lang[$store.state.setting.lang]['alpha'] }}</label>
      <input type="number" class="edit-input" min="0" max="1" step="0.01" v-model="alpha" @change="setPreview">
    </div>
    <div id="color-preview" class="color-picker">
      <b style="color: #fff">{{ lang[$store.state.setting.lang]['preview'][0] }}</b>
      <b style="color: #000">{{ lang[$store.state.setting.lang]['preview'][1] }}</b>
    </div>
    <button class="button color-button" @click="apply">
      {{ lang[$store.state.setting.lang]['apply'] }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'editColor',
  props: ['rgba', 'lang'],
  data () {
    return {
      /* 투명도 */
      alpha: 0,
      /* 색상 HEX 데이터 */
      colorValue: ''
    }
  },
  watch: {
    /* 부모의 데이터가 변경될 경우 자식 컴포넌트에서 감지 */
    rgba (newVal, oldVal) {
      /* 변경된 색상으로 다시 설정 */
      this.setColor()
    }
  },
  mounted () {
    this.setColor()
  },
  methods: {
    /* rgba 데이터를 colorValue, alpha에 변환 후 대입 */
    setColor () {
      if (this.rgba === '') {
        this.colorValue = '#000000'
        this.alpha = 1.0
      } else {
        let color = this.rgba.replace('rgba(', '').replace(')', '').split(',')
        this.colorValue = '#'
        this.colorValue += parseInt(color[0]).toString(16) + parseInt(color[1]).toString(16) + parseInt(color[2]).toString(16)
        this.alpha = parseFloat(color[3])
      }
      /* 미리보기 설정 */
      this.setPreview()
    },
    /* 색상 미리보기 */
    setPreview () {
      if (this.alpha > 1 || this.alpha < 0) {
        this.$emit('openNotify', this.lang[this.$store.state.setting.lang]['alphaRange'])
        return
      }
      let preview = document.getElementById('color-preview')
      preview.style['background-color'] = this.colorValue
      preview.style['opacity'] = this.alpha
    },
    /* 지정 색상 적용 */
    apply () {
      /* 알파값 1이상, 0 이하인 경우 */
      if (this.alpha > 1 || this.alpha < 0) {
        this.$emit('openNotify', this.lang[this.$store.state.setting.lang]['alphaRange'])
        return
      }

      /* 앞의 # 문자 제거 */
      const colorHex = this.colorValue.replace('#', '')
      /* 부모 컴포넌트에게 전달하는 데이터 */
      /* 형식: rgba(1, 2, 3, 0) */
      let colorCode = 'rgba('

      /* R, G, B 세 항목만 반복문으로 진행 */
      for (let i = 0; i < 3; i++) {
        /* 16진수를 10진수로 변환 */
        let value = parseInt(('0x' + colorHex[i * 2] + colorHex[i * 2 + 1]).toString(10))
        colorCode += value + ', '
      }

      /* A 마지막 항목은 따로 병합 */
      colorCode += this.alpha + ')'
      this.$emit('apply', colorCode)
    }
  }
}
</script>

<style>

#edit-color {
  float: right;
  border: 1px solid #a2ecfb;
  padding: 5px;
  text-align: center;
}

.color-picker {
  margin-bottom: 5px;
}

#color-preview {
  width: 100%;
  height: 20px;
  background-color: #000000;
  opacity: 1.0;
}

.color-button {
  margin: 0;
  margin-top: 5px;
  padding: 5px 10px;
}

#color {
  border: none;
  outline: none;
  background-color: #2f3242;
}

</style>

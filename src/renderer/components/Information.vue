<template>
  <div id="information">
    <div id="info-area">
      <h1>Visual Electron</h1>
      <div class="info-introduce">
        <p>{{ lang[$store.state.setting.lang]['info']['introduce'] }}</p>
      </div>
      <div id="sample-chart-area">
        <canvas id="sampleChart"></canvas>
      </div>
      <div id="powered-text">
        <p>Powered by Chart.js</p>
      </div>
      <div id="github-info" @click="linkToGithub">
        <img id="github-icon" src="../assets/github.svg">
        <h4 id="github-id">Leegeunhyeok</h4>
      </div>
      <div id="system-info-area">
        <div id="system-info">
          <div id="system-title">{{ lang[$store.state.setting.lang]['info']['system'] }}</div>
          <div class="system-info-item">
            <div class="system-info-title">Electron</div>
            <div>{{ electron }}</div>
          </div>
          <div class="system-info-item">
            <div class="system-info-title">Node.js</div>
            <div>{{ node }}</div>
          </div>
          <div class="system-info-item">
            <div class="system-info-title">Vue.js</div>
            <div>{{ vue }}</div>
          </div>
          <div class="system-info-item">
            <div class="system-info-title">Platform</div>
            <div>{{ platform }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  props: ['lang'],
  data () {
    return {
      /* 차트 인스턴스 */
      chart: null,
      /* Electron 버전 */
      electron: process.versions['atom-shell'],
      /* Node.js 버전 */
      node: process.versions.node,
      /* 플랫폼 유형 */
      platform: require('os').platform(),
      /* Vue.js 버전 */
      vue: require('vue/package.json').version
    }
  },
  /* 마운트 후 */
  mounted () {
    /* 예제 차트 생성 */
    const ctx = document.getElementById('sampleChart')
    this.chart = new this.$chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# Sample',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
    this.randomData()
  },
  methods: {
    /* 차트 랜덤 데이터 적용 */
    randomData () {
      setInterval(() => {
        for (let i = 0; i < 6; i++) {
          this.chart.data.datasets[0].data.pop()
        }
        this.chart.update()

        for (let i = 0; i < 6; i++) {
          this.chart.data.datasets[0].data.push(Math.floor(Math.random() * 20) + 1)
        }
        this.chart.update()
      }, 2500)
    },
    /* 깃허브 링크 연결 */
    linkToGithub () {
      this.$electron.shell.openExternal('https://github.com/leegeunhyeok/visual-electron')
    }
  }
}
</script>

<style>

#information {
  display: inline-block;
  width: 100%;
  padding-top: 50px;
  background-color: #2f3242;
}

#info-area {
  text-align: center;
  margin: auto;
  padding-top: 20px;
}

.info-introduce {
  margin: 20px 0;
}

#powered-text {
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

#github-info {
  cursor: pointer;
  margin: auto;
  margin-top: 50px;
}

#github-icon {
  cursor: pointer;
  width: 40px;
  height: 40px;
}

#github-id {
  cursor: pointer;
}

#sample-chart-area {
  margin: auto;
  position: relative;
  margin-top: 4%;
  width: 65%;
  height: 45vh;
}

#sample-chart-button {
  cursor: pointer;
  background-color: #282a38;
  border-radius: 5px;
  margin: auto;
  padding: 10px 20px;
  margin: 10px;
  transition: .5s;
}

#sample-chart-button:hover {
  background-color: #1a1b24;
}

@media (min-width: 1200px) {
  #sample-chart-area {
    margin-top: 6%;
    width: 50%;
    height: 40vh;
  }
}

#system-info-area {
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 80%;
}

#system-info {
  margin: auto;
  padding: 10px;
  width: 60%;
  background-color: rgba(162, 236, 251, 0.2);
  border-radius: 2px;
  border: 3px solid #a2ecfb;
}

#system-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.system-info-item {
  margin: 20px 0;
}

.system-info-title {
  font-weight: bold;
  margin-bottom: 5px;
}

</style>

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
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  props: ['lang'],
  data () {
    return {
      chart: null
    }
  },
  mounted () {
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
    linkToGithub () {
      this.$electron.shell.openExternal('https://github.com/leegeunhyeok/visual-electron')
    }
  }
}
</script>

<style>

#information {
  padding-top: 50px;
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
  width: 70%;
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

</style>

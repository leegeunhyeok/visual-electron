/**
 * ChartTypes.js
 * 차트 타입 모음 및 예제 코드
 */

/* Chart types */
const $types = [
  /* Line */
  {
    name: 'Line Chart',
    option: {
      type: 'line',
      data: {
        labels: [1, 2, 3],
        datasets: [
          {
            data: [14, 20, 28],
            label: 'Red',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
          },
          {
            data: [30, 23, 15],
            label: 'Blue',
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false
          },
          {
            data: [5, 13, 25],
            label: 'Yellow',
            borderColor: 'rgba(255, 206, 86, 1)',
            fill: false
          }
        ]
      }
    }
  },
  /* Bar */
  {
    name: 'Bar Chart',
    option: {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'Bar',
            data: [12, 19, 8],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 3
          }
        ]
      }
    }
  },
  /* Radar */
  {
    name: 'Radar Chart',
    option: {
      type: 'radar',
      data: {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
          {
            label: 'Red',
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointBorderColor: '#fff',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            data: [9, 2, 5, 4]
          },
          {
            label: 'Blue',
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            pointBorderColor: '#fff',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            data: [1, 2, 5, 10]
          },
          {
            label: 'Yellow',
            fill: true,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            pointBorderColor: '#fff',
            pointBackgroundColor: 'rgba(255, 206, 86, 1)',
            data: [2, 3, 7, 1]
          }
        ]
      }
    }
  },
  /* Doughnut */
  {
    name: 'Doughnut Chart',
    option: {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: '# Doughnut',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            data: [10, 20, 30]
          }
        ],
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ]
      }
    }
  },
  /* Pie */
  {
    name: 'Pie Chart',
    option: {
      type: 'pie',
      data: {
        datasets: [
          {
            label: '# Pie',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            data: [10, 20, 30]
          }
        ],
        labels: [
          'Red',
          'Yellow',
          'Blue'
        ]
      }
    }
  },
  /* Polar Chart */
  {
    name: 'Polar Chart',
    option: {
      type: 'polarArea',
      data: {
        datasets: [
          {
            label: '# Pie',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            data: [10, 20, 30]
          }
        ],
        labels: [
          'Red',
          'Yellow',
          'Blue'
        ]
      }
    }
  },
  /* Scatter */
  {
    name: 'Scatter Chart',
    option: {
      type: 'scatter',
      data: {
        datasets: [{
          label: '# Scatter',
          data: [
            {
              x: -7,
              y: 0
            },
            {
              x: 2,
              y: 8
            },
            {
              x: 8,
              y: -1
            }
          ],
          backgroundColor: 'rgba(162, 236, 251, 0.2)',
          borderColor: 'rgba(162, 236, 251, 1)'
        }]
      }
    }
  },
  /* Bubble */
  {
    name: 'Bubble Chart',
    option: {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: ['Red'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            data: [{
              x: 33,
              y: 5.245,
              r: 30
            }]
          },
          {
            label: ['Blue'],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            data: [{
              x: 66,
              y: 7.526,
              r: 20
            }]
          },
          {
            label: ['Yellow'],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            data: [{
              x: 47,
              y: 5.921,
              r: 15
            }]
          }
        ]
      }
    }
  }
]

export default $types

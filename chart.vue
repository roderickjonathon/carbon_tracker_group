new Vue({
      el: '#chart',
      components: {
        apexchart: VueApexCharts,
      },
      data: {
        series: [44, 33, 54, 45],
        chartOptions: {
          colors: ['#93C3EE', '#E5C6A0', '#669DB5', '#94A74A'],
          fill: {
            type: 'image',
            opacity: 0.85,
            image: {
              src: ['../../assets/images/stripes.jpg', '../../assets/images/1101098.png',
                '../../assets/images/4679113782_ca13e2e6c0_z.jpg',
                '../../assets/images/2979121308_59539a3898_z.jpg'
              ],
              width: 25,
              imagedHeight: 25
            },
          },
          stroke: {
            width: 4
          },
          dataLabels: {
            enabled: false
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      }

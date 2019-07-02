<template lang="html">
  <div id="chart">
     <apexchart type=pie width=380 :options="chartOptions" :series="series" />
   </div>
</template>

<script>
import { eventBus } from '@/main';
import VueApexCharts from 'vue-apexcharts'



export default {
  name: "carbon-chart",
  props: ["profiles"],
  components: {
    "apexchart": VueApexCharts
  },
  data(){
    return {
      series: [44, 33, 54, 90],
      chartOptions: {
        colors: ['#93C3EE', '#E5C6A0', '#669DB5', '#94A74A'],
        fill: {
          type: 'image',
          opacity: 0.85,
          image: {
            src: ['./assets/images/earth.jpg', '../../assets/images/1101098.png',
              '../../assets/images/4679113782_ca13e2e6c0_z.jpg',
              '../../assets/images/2979121308_59539a3898_z.jpg'
            ],
            width: 50,
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
  }
}



</script>

<style lang="css" scoped>
#grid {
  width: 15vw;
  border: solid 5px;
  background-color: white;
  display: inline-grid;
}








</style>

<template lang="html">
  <div id="carbon-chart">
    <h1>Your Personal Pie</h1>
    <apexcharts id="chart" type=pie width=800 :options="chartOptions" :series="series" />
    <!-- <p> {{getLastItemOfArray()}} </p> -->
    <!-- <p>{{this.profiles[0]}}</p> -->
  </div>
</template>

<script>
import { eventBus } from '@/main';
import VueApexCharts from 'vue-apexcharts'



export default {
  name: "carbon-chart",
  props: ["profiles"],

  components: {
    "apexcharts": VueApexCharts
  },
  props:['profiles'],
  data(){
    return {
      chartData: [],
      series: [this.profiles[0].devices, this.profiles[0].purchases, this.profiles[0].travel, this.profiles[0].food],
      chartOptions: {


        fill: {
          colors: ['#162D50', '#00E396', '#FEB019', '#71C837', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'],
          type: 'image',
          opacity: 100
          // image: {
          //   src: ['./assets/images/earth.jpg', '../../assets/images/1101098.png',
          //     '../../assets/images/4679113782_ca13e2e6c0_z.jpg',
          //     '../../assets/images/2979121308_59539a3898_z.jpg'
          //   ],
          //   width: 50,
          //   imagedHeight: 25
          // }
        },
        stroke: {
          width: 2
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '30px',


          },

          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 400
              },
              legend: {
                position: 'bottom',
                labels: {
                  colors: this.colors
                }
              }
            }
          }]
        }
      }
    }
  },

  methods: {
    arrayReverse(){
      return this.profiles.reverse()
    }
  },

  mounted(){

    eventBus.$on("profile-added", (data) => {
      // console.log("data", data);
      this.series = data
    })

    this.arrayReverse()


  },

  // computed: {
  //   arrayReverse(){
  //     return this.profiles.reverse()
  //   }
  // }
}



</script>

<style lang="css" scoped>
#grid {
  width: 15vw;
  border: solid 5px;
  background-color: white;
  display: inline-grid;
}

p {
  color: white;
}

h1 {
  color: white;
  margin-top: 5%;
}

#chart {
  margin: 5%;

}







</style>

<template lang="html">
  <div id="carbon-chart">
    <h1>Your Personal Pie</h1>
    <apexcharts id="chart" type=pie width=800 :options="chartOptions" :series="series" />
    <p v-if="this.profiles[0].food >= 3901">Have you considered trying Vegetarian or Vegan a few days a week...?</p>
    <p v-if="this.profiles[0].food <= 3811">Good work with your food choices, the planet thanks you and so do the animals!</p>
    <p v-if="this.profiles[0].purchases <= 1765">Limited purchases today, well done</p>
    <p v-if="this.profiles[0].purchases > 1765">You purchases are carbon heavy!</p>
    <p v-if="this.profiles[0].recycling == 0">It would be great if you would consider recycling, the world is in trouble!!</p>
    <p v-if="this.profiles[0].recycling < -17 && this.profiles[0].recycling > -50 ">Keep up the good work on your recycling</p>
    <p v-if="this.profiles[0].recycling < -50">You are a waste superstar</p>
    <p v-if="this.profiles[0].devices < 8300">Good effort you have a less than average footprint based on your device use!</p>
    <p v-if="this.profiles[0].devices > 8300">Consider using your devices less, did you know vampire power accounts for 10% of your bill!</p>
    <p v-if="this.profiles[0].travel == 0">Well done for travelling green! </p>
    <p v-if="this.profiles[0].travel > 0 && this.profiles[0].travel <= 2172 ">Public transport saves carbon, well done!</p>
    <p v-if="this.profiles[0].travel > 2172">Cars are one of the biggest polluters, consider public transport or even a wee cycle.</p>
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
        colors: this.colors,
        labels:['Devices', 'Purchases', 'Transport', 'Food'],

        useSeriescolors: true,

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
          formatter: function(val, opt) {

            return Math.floor(val)  + "%"
          },
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
                position: 'right',
                fontSize: '50px',

                labels: {
                  colors: this.colors,
                  userSeriesColors: true,
                  fontSize: '50px'

                }
              }
            }
          }]
        }
      }
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

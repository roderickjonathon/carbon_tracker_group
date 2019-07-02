<template lang="html">
  <div id="chart">
     <apexcharts type=pie width=380 :options="chartOptions" :series="series" />
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
  },

  // methods:{
    // getLastItemOfArray(){
    //   let profiles = this.profiles
    //   return profiles[0].devices
      // const purchases = profiles[0].purchases
      // const devices = profiles[0].devices
      // const travel = profiles[0].travel
      // const food = profiles[0].food
      //
      // this.series.push(purchases)
      // this.series.push(devices)
      // this.series.push(travel)
      // this.series.push(food)

    // }



  // },

  mounted(){

    eventBus.$on("profile-added", (data) => {
      console.log("data", data);
      this.series = data
    })



},

  computed: {
    arrayReverse(){
      return this.profiles.reverse()
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

p {
  color: white;
}








</style>

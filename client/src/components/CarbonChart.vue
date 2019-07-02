<template lang="html">
  <div id="carbon-chart">
    <h1>{{this.profiles[0].name}}, here's your stats!</h1>
    <apexcharts id="chart" type=pie width=800  :options="chartOptions" :series="series" />
    <div id='tips'>
      <div id="food-tips">
      <h3>Your food habits produced {{this.profiles[0].food / 1000}}Kg of C0²</h3>
      <p v-if="this.profiles[0].food >= 3901">Have you considered trying Vegetarian or Vegan a few days a week...?</p>
      <p v-if="this.profiles[0].food <= 3811">Good work with your food choices, the planet thanks you and so do the animals!</p>
    </div>
    <div id="purchases-tips">
      <h3>Your purchasing habits produced {{this.profiles[0].purchases / 1000}}Kg of C0²</h3>
      <p v-if="this.profiles[0].purchases <= 1765">Limited purchases today, well done</p>
      <p v-if="this.profiles[0].purchases > 1765">You purchases are carbon heavy!</p>
    </div>
    <div id="recycling-tips">
      <h3>Your recycling habits offset {{this.profiles[0].recycling / 1000}}Kg of C0²</h3>
      <p v-if="this.profiles[0].recycling == 0">It would be great if you would consider recycling, the world is in trouble!!</p>
      <p v-if="this.profiles[0].recycling < -17 && this.profiles[0].recycling > -50 ">Keep up the good work on your recycling</p>
      <p v-if="this.profiles[0].recycling < -50">You are a waste superstar</p>
    </div>
    <div id="devices-tips">
      <h3>Your device usage produced {{this.profiles[0].devices / 1000}}Kg of C0²</h3>
      <p v-if="this.profiles[0].devices < 8300">Good effort you have a less than average footprint based on your device use!</p>
      <p v-if="this.profiles[0].devices > 8300">Consider using your devices less, did you know vampire power accounts for 10% of your bill!</p>
    </div>
    <div id="travel-tips">
      <h3>Your travel methods produced {{this.profiles[0].travel / 1000}}Kg of C0²</h3>
      <p v-if="this.profiles[0].travel == 0">Well done for travelling green! </p>
      <p v-if="this.profiles[0].travel > 0 && this.profiles[0].travel <= 2172 ">Public transport saves carbon, well done!</p>
      <p v-if="this.profiles[0].travel > 2172">Cars are one of the biggest polluters, consider public transport or even a wee cycle.</p>
    </div>
  </div>
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
          colors: ['#71C837', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'],
          type: 'image',
          opacity: 100

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
          legend: {
            position: 'right',
            fontSize: '80px',

            labels: {
              colors: [ '#71C837', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'],
              userSeriesColors: false,
              fontSize: '80px'

            }
          },

          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 400
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
  font-size: 135%;
  font-weight: bold;
}

h1 {
  color: #71C837;
  margin-top: 5%;
  font-size: 380%;
}

h3 {

  color: #71C837;
  font-weight: bold;
  font-size: 180%;
}

#chart {
  margin: -1%;




}

#tips {
  width: 35vw;
  border: solid 5px;
  border-radius: 25px;
  border-color: white;
  margin-left: 49%;
  margin-bottom: 2%;
  margin-right: 20%;
  margin-top: -35%;
  background-color: #162D50;

}





</style>

<template lang="html">
  <div>
    <div>
      <h1>Leaderboard</h1>
      <apexcharts name="leaderboard" id="leaderboard" width=1200 type="bar" :options="chartOptions" :series="series"></apexcharts>

    </div>



  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';
import ApexCharts from 'apexcharts';
import VueApexCharts from 'vue-apexcharts'
import CarbonChart from '@/components/CarbonChart.vue'


export default {



  name: "leaderboard",
  components:{
    "apexcharts": VueApexCharts,
    "carbon-chart": CarbonChart

  },
  props:["profiles"],
  data() {
    return {
      colors: ['#008FFB', '#00E396', '#FEB019', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'],
      chartOptions: {
        fill: {
          colors: ['#71C837'],
          type: 'image',
          opacity: 100

        },
        chart: {
          height: 50,
          id: 'vuechart-example',
          events: {
            click: function(){
              this.arrayOfNames().unshift()
            }
          }
        },

        colors: this.colors,
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: '45%',
            distrubuted: true

          }
        },

        dataLabels: {
          enabled: true,
          // textAnchor: 'start',
          align: 'left',
          verticalAlign: 'middle',
          formatter: function(val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + "  : " + val + "Kg"
          },
          offsetX: 10,
          offsetY: -35,
          style:{
            fontSize: '80px;'
          }
        },
        xaxis: {
          categories: this.arrayOfNames(),
          labels: {



            styles:{
              colors: ['#71C837'],
              fontSize:'40px'
            }
          },
        },
      },
      series: [{ data: this.arrayOfFootprints()  }]
    }
  },


  methods: {
    deleteProfile(targetProfile){
      const id=targetProfile._id
      fetch("http://localhost:3000/api/profiles/" + id, {
        method: "DELETE"
      })
      .then((res) => res.json())
      .then((res) => {
        eventBus.$emit("delete-profile", id)
      })
    },



    arrayOfFootprints(){
      const result = this.profiles.map( (profile) => {
        return profile.totalCarbon
      })
      return result.sort()
      // return result.reverse()
    },

    arrayOfNames(){
      const result = this.profiles.map( (profile) => {
        return profile.name
      })
      return result
    },




  }


}
</script>





<style lang="css" scoped>


#leaderboard {
  /* color: white; */
  border: solid 5px;
  border-color: white;
  border-radius: 25px;
  /* font-size: 150%; */
  background-color: #162D50;


}

apexcharts-svg {
  font-size: 300%;
}

h1 {
  color: #71C837;
  font-size: 300%;
}





</style>

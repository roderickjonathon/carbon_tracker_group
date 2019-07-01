<template lang="html">
  <div>
    <div>

      <apexcharts id="leaderboard" width="1000" type="bar" :options="chartOptions" :series="series"></apexcharts>
    </div>



  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';
import ApexCharts from 'apexcharts';
import VueApexCharts from 'vue-apexcharts'


export default {



  name: "leaderboard",
  components:{
    "apexcharts": VueApexCharts
  },
  props:["profiles"],
  data() {
    return {
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'],
      chartOptions: {
        chart: {
          height: 350,
          id: 'vuechart-example'
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
          textAnchor: 'start',
          formatter: function(val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex]
          },
          offsetX: 0,
          fontSize: '300%'
        },
        xaxis: {
          categories: this.arrayOfNames(),
          labels: {
            hideOverlappingLabels: true,
            rotate: 90,
            fontSize:'400%'
          },
          style: {
            labels:{
            colors: this.colors,
            fontSize: '300%'

          }
          },

        },

      },


    series: [{

      data: this.arrayOfFootprints()
    }]
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

  handleChange(profile){
    const edited = {
      checked_in: !profile.checked_in
    }
    const id = profile._id
    fetch("http://localhost:3000/api/profiles/" + id, {
      method: "PUT",
      body: JSON.stringify(edited),
      headers: { 'Content-Type': 'application/json'}
    })
    .then((res) => res.json())
    .then((res) => {
      eventBus.$emit("update-profile", id)
    })
  },

  arrayOfFootprints(){
    const result = this.profiles.map( (profile) => {
      return profile.totalCarbon
    })
    result.sort()
    return result.reverse()
  },

  arrayOfNames(){
    const result = this.profiles.map( (profile) => {
      return profile.name
    })
    return result
  }


}


}
</script>





<style lang="css" scoped>


#leaderboard {
  /* color: white; */
  border: solid 5px;
  border-color: white;
  border-radius: 25px;
  font-size: 100%;

}





</style>

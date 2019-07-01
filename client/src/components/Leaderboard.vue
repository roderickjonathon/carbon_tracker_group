<template lang="html">
  <div>
    <div>
      {{arrayOfFootprints()}}
      <apexcharts width="500" type="bar" :options="chartOptions" :series="series"></apexcharts>
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
      chartOptions: {
          chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [{
          name: 'series-1',
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
      return result
    }


  }


}
</script>





<style lang="css" scoped>


#leaderboard {
  color: white;
  border: solid 5px;
  border-color: white;
  border-radius: 25px;
  font-size: 200%;

}

table {
  font-family: inherit;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475C0;
  margin: 10px 10px 0 10px;
  border-radius: 25px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C00;
  color: white;
  padding: 8px;
  min-width: 30px;
  border: solid;
  border-radius: 25px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
  border-radius: 25px;
}
table td:last-child {
  border-right: none;
  border-radius: 25px;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F90;
  border-radius: 25px;
}




</style>

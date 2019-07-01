<template lang="html">
  <div>

    <!-- <b-table id="leaderboard" striped hover :items="profiles"></b-table> -->
    <ul id="leaderboard" v-for="profile in profiles"><h1> Name: {{ profile.name}}</h1>
                                                    <p>  Footprint: {{profile.totalCarbon}}KG</p>
                                                  </ul>
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';


export default {



    name: "leaderboard",
    props:["profiles"],



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
      }
    }


}
</script>





<style lang="css" scoped>


#leaderboard {
  color: white;
}




</style>

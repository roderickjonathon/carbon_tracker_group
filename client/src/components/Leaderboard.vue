<template lang="html">
  <div>
<<<<<<< HEAD
    <b-table id="leaderboar" striped hover :items="profiles"></b-table>
=======
    <b-table id="leaderboard" striped hover :items="profiles"></b-table>
>>>>>>> jonny
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

table {
  font-family: 'Open Sans', sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475C;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C;
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
}

#leaderboard {
  color: white;
}


</style>

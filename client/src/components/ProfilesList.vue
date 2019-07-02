<template lang="html">
  <div class="wrapper">
    <ul>
    </ul>

  </div>
</template>

<script>
import { eventBus } from '@/main'


export default {
  name: "profiles-list",
  props: ["profiles"],

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

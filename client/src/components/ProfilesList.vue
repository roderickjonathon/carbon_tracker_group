<template lang="html">
  <div class="wrapper">
    <ul>
      <div id="grid" v-for="profile in profiles">
        <p>{{ profile.name }}</p>
        <p>{{ profile.email}}</p>
        <p>{{ profile.travel}}</p>
        <p>{{ profile.food}}</p>
        <p>{{ profile.recycling.join("  ")}}</p>
        <p>{{ profile.purchases.join(" ")}}</p>
        <p>{{ profile.devices.join(" ")}}</p>
        <button type="button" v-on:click="deleteProfile (profile)">Delete Profile</button>
        <button type="button">Create Carbon Score</button>

      </div> -->
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
#grid {
  width: 15vw;
  border: solid 5px;
  background-color: white;
  display: inline-grid;
}








</style>

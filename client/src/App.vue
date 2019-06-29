<template>
  <div id="app">
    <profiles-form/>
    <profiles-list :profiles="profiles"/>

  </div>
</template>
<title>Code Clan Carbon Count</title>
<script>

import ProfilesList from './components/ProfilesList.vue'
import ProfilesForm from './components/ProfilesForm.vue'
import { eventBus } from './main.js'

export default {
  name: 'app',
  data(){
    return {
      profiles: [],
      newData: ""
    }
  },
  components: {
    'profiles-list': ProfilesList,
    'profiles-form': ProfilesForm
  },
  mounted(){
    fetch('http://localhost:3000/api/profiles')
    .then((res) => res.json())
    .then((data) => this.profiles = data)

    eventBus.$on("profile-added", (data) => {
      this.profiles.push(data)
    })

    eventBus.$on("delete-profile", (id) => {
      this.deleteProfile(id)
    })

    eventBus.$on("update-profile", (id) => {
      this.updateProfile(id)
    })
  },
  methods: {
    deleteProfile(id){
      for (let i = 0; i < this.profiles.length; i++){
        const profile = this.profiles[i]
        if (id == profile._id){
          this.profiles.splice(i,1)
        }
      }
    },
    updateProfile(id){
      for (let i = 0; i < this.profiles.length; i++){
        const profile = this.profiles[i]
        if (id == profile._id){
          this.profiles[i].checked_in = !(this.profiles[i].checked_in)
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 50px;
  background-color: #535657;
  background-image: url('./assets/earth.jpg');
  display: flex;
}


</style>

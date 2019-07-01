<template>
  <div id="app">
    <nav>
      <img id='logo' src="@/assets/images/logo_earth.png" alt="">
    </br>
      <router-link :to="{ name: 'calculate'}">Calculate Your Footprint</router-link> |
      <router-link  :to="{ name: 'score'}">See How You Did Today</router-link>

    </nav>
    <router-view id="view"></router-view>


    <!-- <profiles-form/> -->
    <!-- <profiles-list :profiles="profiles"/> -->
    <!-- <leaderboard :profiles="profiles"/> -->

  </div>
</template>

<script>

import ProfilesList from './components/ProfilesList.vue'
import ProfilesForm from './components/ProfilesForm.vue'
import Leaderboard from './components/Leaderboard.vue'
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
    'profiles-form': ProfilesForm,
    'leaderboard': Leaderboard
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
  margin-top: 10%;
  background-color: #53565700;
  width: 80%;
  margin-right: auto;
  margin-left: auto;




  /* display: flex; */
}


.nav-item {
  color: white;
}

body {
  background-color: #53565700;
  background-image: url('assets/images/earthbg.jpg');


}

#logo {


}


</style>

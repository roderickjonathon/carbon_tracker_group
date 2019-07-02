<template>
  <div id="app">
    <nav>

      <img id='logo' src="@/assets/images/logo_earth.png" alt="" width="40%" height="40%">
    </br>
      <router-link id="link"  :to="{ name: 'calculate'}">Calculate Your Footprint</router-link> |
      <router-link  id="link" :to="{ name: 'score'}">See Your Stats</router-link>

    </nav>
    <router-view :profiles="profiles" id="view"></router-view>
    <div class='climate-clock'>
      <iframe src='//embed.climateclock.net?buttons=1&audio=1' style='border:0'>
      </iframe> </div>


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

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 5%;
  background-color: #53565700;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
}




.nav-item {
  color: white;
}

body {
  background-color: #53565700;
  background-image: url('assets/images/earthhi.jpg');


}

a {

}

#link {
  color: white;
  font-weight: bold;
  font-size: 180%;
  padding: 5vh 5vw;
  text-decoration: underline;
}

img {
  margin-top: -3%;
}

.climate-clock{
  position:relative;
  padding-bottom:30%;
  height:0;
  overflow:hidden;
  max-width: 100%;
}


.climate-clock iframe{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:20%;
}

@media(min-width:700px){.climate-clock{padding-bottom:56.25%;}}



</style>

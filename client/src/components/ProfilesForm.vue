<template lang="html">
  <div class="">
    <!-- <form class="" v-on:submit.prevent="addProfile" method="post">
    <header>Code Clan Carbon Counter</header>
    <br>

    <label>Add Profile Name: </label>
    <input type="text" v-model="name" required/>

    <label>Add E-mail: </label>
    <input type="email" v-model="email" />

    <label>Add Travel Mode: </label>
    <input type="travel-mode" v-model="travel" />

    <label>Add Food Preference: </label>
    <input type="food" v-model="food" />

    <label>Add Recycling Preference: </label>
    <input type="recycling" v-model="recycling" />

    <label>Create Profile: </label>
    <input type="submit" value="Add profile" />
  </form> -->
  <div>
    <b-tabs justified fill content-class="mt-3">


      <b-tab   title="Personal Details" active>
        <h2>Please enter your details to begin:</h2>
        <form v-on:submit="addProfile" id="details-form">
          <label for="name">Name:</label>
          <input  type="text" name="name" value="" v-model="name" required>
          <label for="email">Email:</label>
          <input  type="email" name="email" value="" v-model="email" required>
          <input type="submit" value="Next"/>
        </form>
      </b-tab>


      <b-tab  title="Travel Habits">
        <h2>How did you travel to CodeClan today?</h2>

          <select v-model="travel" >
            <option disabled value="">Select a mode of transport...</option>
            <option>Bus</option>
            <option>Train</option>
            <option>Cycle/Walk</option>
            <option>Car/Taxi</option>

          </select>

        </form>

      </b-tab>



      <b-tab title="Dietry" active>



      </b-tab>

      <b-tab title="Purchases">

      </b-tab>


      <b-tab title="Devices">

      </b-tab>
    </b-tabs>
    <div class="text-center">
      <b-button-group class="mt-2">
        <b-button v-on:click="tabIndex--">Previous</b-button>
        <b-button v-on:click="tabIndex++">Next</b-button>
      </b-button-group>
    </div>
  </div>
</div>
</template>

<script>
import { eventBus } from '@/main';
import { TabsPlugin } from 'bootstrap-vue'




export default {
  name: "profiles-form",
  data(){
    return {
      tabIndex: 0,
      name: "",
      email: "",
      travel: "",
      food: "",
      recycling: ""

    }
  },
  methods: {
    addProfile(){
      const profile = {
        name: this.name,
        email: this.email,
        travel: this.travel,
        food: this.food,
        recycling: this.recycling
      }
      fetch("http://localhost:3000/api/profiles", {
        method: "POST",
        body: JSON.stringify(profile),
        headers: { 'Content-Type': 'application/json'}
      })
      .then((res)=> res.json())
      .then((data) => {
        eventBus.$emit("profile-added", data)
      })
      this.name = ""
      this.email = ""
      this.travel = ""
      this.food = ""
      this.recycling = ""
    },

    // addDetails(){
    //   const details = {
    //     name: this.name,
    //     email: this.email
    //
    //   }
    //   fetch("http://localhost:3000/api/profiles", {
    //     method: "POST",
    //     body: JSON.stringify(details),
    //     headers: { 'Content-Type': 'application/json'}
    //   })
    //   .then((res)=> res.json())
    //   .then((data) => {
    //     eventBus.$emit("profile-added", data)
    //   })
    //   this.name = ""
    //   this.email = ""
    //   this.travel = ""
    //   this.food = ""
    //   this.recycling = ""
    //
    // }
  }
}
</script>

<style lang="css" scoped>
.container{
  background-color: #DEE7E7;
  margin: auto;
  /* width: 80%;  */
}

form {
  width: 75%;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.7);
  padding: 20px;
  margin-bottom: 40px;
}

h2 {
  margin: 10px 0;
  padding: 0;
}

label {
  min-width: 100px;
  display: inline-block;
}

.formWrap {
  margin-bottom: 10px;
}

#details-form {
  border-radius: 15px;
}
</style>

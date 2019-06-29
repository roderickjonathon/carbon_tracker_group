<template lang="html">
  <div class="big-form">

    <!-- This is the form for getting info from user -->
    <b-tabs justified fill content-class="mt-3">

      <b-tab v-model="tabIndex"   title="Personal Details" active >
        <b-form-input v-model="name" placeholder="Enter your name"></b-form-input>
        <b-form-input v-model="email" placeholder="Enter your email"></b-form-input>
      </b-tab>

      <b-tab  title="Travel Habits">
        <h2>So {{name}}, How did you travel to CodeClan today?</h2>

        <select v-model="travel" >
          <option disabled value="">Select a mode of transport...</option>
          <option>Bus</option>
          <option>Train</option>
          <option>Cycle/Walk</option>
          <option>Car/Taxi</option>
        </select>
      </form>
    </b-tab>

    <b-tab title="Dietry">
      <b-form-group label="Choose a diet type:">
        <b-form-radio v-model="food" name="some-radios" value="vegatarian">Vegetarian</b-form-radio>
        <b-form-radio v-model="food" name="some-radios" value="vegan">Vegan</b-form-radio>
        <b-form-radio v-model="food" name="some-radios" value="meat">Meat Eater</b-form-radio>
        <b-form-radio v-model="food" name="some-radios" value="pescetarian">Pescetarian</b-form-radio>
      </b-form-group>
    </b-tab>

    <b-tab title="Purchases">

      <b-form-group id="checkbox-label" label="What everyday purchases did you make today?">
        <b-form-checkbox-group id="checkbox" v-model="purchases" name="purchases" buttons >
          <b-form-checkbox value="clothes">New Clothes</b-form-checkbox>
          <b-form-checkbox value="ready_meals">Ready-made meals/sandwhiches</b-form-checkbox>
          <b-form-checkbox value="bottled_water">Bottles Water</b-form-checkbox>
          <b-form-checkbox value="barista_coffee">Barista Coffee</b-form-checkbox>
        </b-form-checkbox-group>

      </b-form-group>
    </b-tab>


    <b-tab title="Devices">
      <select v-model="deviceTimeA" >
        <option disabled value="">How long did you spend using your phone today?</option>
        <option value="1"> Less than 1 hour</option>
        <option value="1.5"> 1 to 2 hours </option>
        <option value="3"> 2-4 hours</option>
        <option value="4.5"> Over 4 hours</option>
      </select>
      <select v-model="deviceTimeB" >
        <option disabled value="">How long did you spend watching TV/Streaming?</option>
        <option value="1"> Less than 1 hour</option>
        <option value="1.5"> 1 to 2 hours </option>
        <option value="3"> 2-4 hours</option>
        <option value="4.5"> Over 4 hours</option>
      </select>
      <select v-model="deviceTimeC" >
        <option disabled value="">How long did you spend using other electrical devices?</option>
        <option value=1> Less than 1 hour</option>
        <option value=1.5> 1 to 2 hours </option>
        <option value=3> 2-4 hours</option>
        <option value=4.5> Over 4 hours</option>
      </select>

      <!-- <h3>You spent a total of {{ getTotalTime() }} hours using devices and appliances today:</h3> -->
      <!-- The above function isn't working so we'll need to sort that! -->
    </b-tab>

    <b-tab title="Recycling">
      <b-form-group id="checkbox-label" label="What do you recycle?">
        <b-form-checkbox-group id="checkbox" v-model="recycling" name="recycling" buttons >
          <b-form-checkbox id="checkbox" value="plastic">Plastic</b-form-checkbox>
          <b-form-checkbox id="checkbox" value="glass">Glass</b-form-checkbox>
          <b-form-checkbox id="checkbox" value="food waste">Food Waste</b-form-checkbox>
          <b-form-checkbox id="checkbox" value="electronics">Electronics</b-form-checkbox>
        </b-form-checkbox-group>

        <form id="submit-button" v-on:submit="addProfile">
        <button type="submit" name="button">Complete Form</button>
      </form>
      </b-form-group>

    </b-tab>




  </b-tabs>
  <div class="text-center">
    <b-button-group class="mt-2">
      <b-button v-on:click="tabIndex--">Previous</b-button>
      <b-button v-on:click="tabIndex++">Next</b-button>
    </b-button-group>
    <!-- These buttons are supposed to flip  between the tabs but had no luck fixing them yet, doing exactly what the docs say! -->
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
      tabIndex: 1,
      name: "",
      email: "",
      travel: "",
      food: "",
      recycling: [],
      purchases: [],
      devices: 0,

      deviceTimeA: 0,
      deviceTimeB: 0,
      deviceTimeC: 0

    }
  },
  methods: {
    addProfile(){
      const profile = {
        name: this.name,
        email: this.email,
        travel: this.travel,
        food: this.food,
        recycling: this.recycling,
        purchases: this.purchases,
        devices: this.devices
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
      this.purchases = ""
      this.devices = ""
    },

    getTotalDeviceTime(){
      // Need to sort this function for calculating total device time use.
    }


  }
}
</script>

<style lang="css" scoped>
.container{
  background-color: #DEE7E7;
  margin: auto;
  /* width: 80%; */
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

#submit-button {
  background-color:  #535657;
  font-size: 50%;
}

#checkbox-label {
  font-size: 200%;
}

#checkbox {
  font-size: 300%;
}
</style>

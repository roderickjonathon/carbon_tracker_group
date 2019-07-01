<template lang="html">
  <div id="big-form">

    <!-- This is the form for getting info from user -->
    <b-tabs class="tabs" v-model="tabIndex"  justified fill content-class="mt-3" >

      <b-tab  title="Personal Details" active >
        <b-form-input v-model="name" placeholder="Enter your name" required></b-form-input>
        <b-form-input v-model="email" placeholder="Enter your email" required></b-form-input>
      </b-tab>

      <b-tab title="Travel Habits">
        <p id="travel-question">So {{name}}, How did you travel to CodeClan today?</p>

        <select v-model="travel" >
          <option disabled value="">Select a mode of transport...</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="cycle">Cycle/Walk</option>
          <option value="car">Car/Taxi</option>
        </select>
        <select v-model="distance" >
          <option disabled value="How far did you travel?">How far did you travel...</option>
          <option value="1">0-1 Miles</option>
          <option value="2">1-2 Miles</option>
          <option value="4">2-4 Miles</option>
          <option value="6">4-6 Miles</option>
          <option value="8">6-8 Miles</option>
        </select>

      <p id="travel-question">You emitted {{ getTotalTravel() }}KG of carbon</p>
    </b-tab>

    <b-tab title="Dietry">
      <b-form-group id="devices-question" label="Choose a diet type:">
        <b-form-radio-group buttons>
          <b-form-radio v-model="food" name="some-radios" value="1">Vegetarian</b-form-radio>
          <b-form-radio v-model="food" name="some-radios" value="2">Vegan</b-form-radio>
          <b-form-radio v-model="food" name="some-radios" value="3">Meat Eater</b-form-radio>
          <b-form-radio v-model="food" name="some-radios" value="4">Pescetarian</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <p id="travel-question">{{ getTotalFood()}}KG carbon </p>
    </b-tab>

    <b-tab title="Purchases">

      <b-form-group id="checkbox-label" label="What everyday purchases did you make today?">
        <b-form-checkbox-group id="checkbox" v-model="purchases" name="purchases" buttons >
          <b-form-checkbox value=0 >None</b-form-checkbox>
          <b-form-checkbox value=1 >New Clothes</b-form-checkbox>
          <b-form-checkbox value=2 >Ready-made meals/sandwhiches</b-form-checkbox>
          <b-form-checkbox value=3 >Bottled Water</b-form-checkbox>
          <b-form-checkbox value=4 >Barista Coffee</b-form-checkbox>
        </b-form-checkbox-group>

      </b-form-group>
      <p id="travel-question"> {{getTotalPurchases()}}KG of carbon</p>
    </b-tab>

    <b-tab id="devices" title="Devices">
      <b-form-group id="devices-question" label="How long did you spend using devices?">
        <p>Phones, tablets, tv, streaming etc</p>
      </b-form-group>
      <div>
        <b-form-group>

          <b-form-checkbox-group buttons name="phone" required>
            <b-form-checkbox v-model="devices" name="J" value="1">Less than 1 hour</b-form-checkbox>
            <b-form-checkbox v-model="devices" name="K" value="2">1-2 hours</b-form-checkbox>
            <b-form-checkbox v-model="devices" name="L" value="3">2-4 hours</b-form-checkbox>
            <b-form-checkbox v-model="devices" name="M" value="4">4+ hours</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <p id='travel-question'>{{getTotalDevices()}}KG of Carbon</p>
      </div>





    </b-tab>




    <b-tab title="Recycling">
      <b-form-group id="checkbox-label" label="What do you recycle?">
        <b-form-checkbox-group id="checkbox" v-model="recycling" name="recycling" buttons >
          <b-form-checkbox id="checkbox" value="-1">Plastic</b-form-checkbox>
          <b-form-checkbox id="checkbox" value="-2">Glass</b-form-checkbox>
          <b-form-checkbox id="checkbox" value="-3">Food Waste</b-form-checkbox>
          <b-form-checkbox id="checkbox" value="-4">Electronics</b-form-checkbox>
        </b-form-checkbox-group>

        <form id="submit-button" v-on:submit="addProfile">
          <button type="submit" name="button">Complete Form</button>
        </form>
      </b-form-group>
      <p id="travel-question">{{getTotalRecycling()}}KG of carbon</p>

    </b-tab>




  </b-tabs>
  <div class="text-center">
    <b-button-group class="mt-2">
      <b-button @click="tabIndex--">Previous</b-button>
      <b-button @click="tabIndex++">Next</b-button>
    </b-button-group>

  </div>
</div>
</template>

<script>
import { eventBus } from '@/main';
import { TabsPlugin } from 'bootstrap-vue';





export default {
  name: "profiles-form",
  data(){
    return {
      tabIndex: 1,
      name: "",
      email: "",
      travel: "",
      distance: 0,
      food: "",
      recycling: [],
      purchases: [],
      devices: []



    }
  },
  methods: {
    addProfile(){
      const profile = {
        name: this.name,
        email: this.email,
        travel: this.getTotalTravel(),
        // distance: this.distance,
        food: this.getTotalFood(),
        recycling: this.getTotalRecycling(),
        purchases: this.getTotalPurchases(),
        devices: this.getTotalDevices()
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
      this.distance = ""
      this.food = ""
      this.recycling = ""
      this.purchases = ""
      this.devices = ""
    },

    getTotalDevices(){
      // Need to sort this function for calculating total device time use.

      const total = this.devices.reduce( (runningTotal, device) => {
        return runningTotal += Number(device)
      }, 0)
      return total
    },

    getTotalFood(){
      let foodTotal = 0
      if (this.food == "1" ) {
        foodTotal += 1
      }
      if (this.food == "2"){
        foodTotal += 2
      }
      if (this.food == "3"){
        foodTotal += 3
      }
      if (this.food == "4"){
        foodTotal += 4
      }
      return foodTotal
    },


    getTotalPurchases(){
      let total = this.purchases.reduce((runningTotal, purchase) => {
        return runningTotal += Number(purchase)
      }, 0)
      return total

    },

    getTotalRecycling(){
      let total = this.recycling.reduce((runningTotal, item) => {
        return runningTotal += Number(item)
      }, 0)
      return total

    },

    getTotalTravel(){
      let travelTotal = 0
      if (this.travel == "cycle"){
        travelTotal += 0
      }
      if (this.travel == "train"){
        travelTotal += 1
      }
      if (this.travel == "bus"){
        travelTotal += 2
      }
      if (this.travel == "car"){
        travelTotal += 3
      }
      return travelTotal * this.distance
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
  background-color:  #53565700;
  font-size: 80%;
}

#checkbox-label {
  font-size: 200%;
  color: white;
}

#checkbox {
  font-size: 300%;
}

#devices-question {
  font-size: 200%;
  color: white;
}

#travel-question {
  font-size: 200%;
  color: white;
}

#big-form {
  align: center;
    color: white;
}

#devices{
  align: center;
}

</style>

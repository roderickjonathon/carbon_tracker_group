<template lang="html">
  <div id="big-form">

    <!-- This is the form for getting info from user -->
    <b-tabs class="tabs" v-model="tabIndex"  justified fill content-class="mt-3" >

      <b-tab  title="Personal Details" active >
        <b-form-input v-model="name" placeholder="Enter your name" required></b-form-input>
        <b-form-input v-model="email" placeholder="Enter your email" required></b-form-input>
      </b-tab>

      <b-tab title="Travel Habits">
        <p id="travel-question">So {{name}}, how did you travel to today?</p>


        <select name="travel" v-model="travel" >
          <option disabled value="">Select a mode of transport...</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="cycle">Cycle/Walk</option>
          <option value="car">Car/Taxi</option>
        </select>

      </br>
    </br>
        <select name="distance" v-model="distance" >
          <option disabled value="">How far did you travel...</option>
          <option value="1">0-1 Miles</option>
          <option value="2">1-2 Miles</option>
          <option value="4">2-4 Miles</option>
          <option value="6">4-6 Miles</option>
          <option value="8">6-8 Miles</option>
        </select>

      <!-- <p id="travel-question">You emitted {{ getTotalTravel() }}KG of carbon</p> -->
    </b-tab>

    <b-tab title="Food Choices">
      <b-form-group id="diet-question" label="Diet type:">
        <b-form-radio-group id="checkbox" buttons>
          <b-form-radio v-model="food" name="some-radios" value="1">Vegan</b-form-radio>
          <b-form-radio v-model="food" name="some-radios" value="2">Vegetarian</b-form-radio>
          <b-form-radio v-model="food" name="some-radios" value="3">Meat Eater</b-form-radio>
          <b-form-radio v-model="food" name="some-radios" value="4">Pescetarian</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <!-- <p id="travel-question">{{ getTotalFood()}}KG carbon </p> -->
    </b-tab>

    <b-tab title="Purchases">

      <b-form-group id="checkbox-label" label="What everyday purchases did you make today?">
        <b-form-checkbox-group id="checkbox" v-model="purchases" name="purchases" buttons required >

          <b-form-checkbox value=10 >New Clothes</b-form-checkbox>
          <b-form-checkbox value=20 >Pack of Cigarettes</b-form-checkbox>
          <b-form-checkbox value=100 >Bottled Water</b-form-checkbox>
          <b-form-checkbox value=200 >Barista Coffee</b-form-checkbox>
          <b-form-checkbox value=14150 >Attended Gig/Conference</b-form-checkbox>
          <b-form-checkbox value=350 >Bottle of Juice</b-form-checkbox>
          <b-form-checkbox value=181 >Online Purchase</b-form-checkbox>
          <b-form-checkbox value=169 >Chocolate Bar/Sweetie</b-form-checkbox>
          <b-form-checkbox value=2500 >Takeaway Food</b-form-checkbox>
        </b-form-checkbox-group>

      </b-form-group>
      <!-- <p id="travel-question"> {{getTotalPurchases()}}KG of carbon</p> -->
    </b-tab>

    <b-tab  title="Devices">
      <b-form-group id="checkbox-label" label="How long did you spend using devices?">
        <p>Phones, tablets, TV, streaming etc</p>
      </b-form-group>
      <div>
        <b-form-group>

          <b-form-checkbox-group id="checkbox-btn" buttons name="phone" required>
            <b-form-checkbox v-model="devices" name="J" value="1">Less than 1 hour</b-form-checkbox>
            <b-form-checkbox v-model="devices" name="K" value="2">1-2 hours</b-form-checkbox>
            <b-form-checkbox v-model="devices" name="L" value="3">2-4 hours</b-form-checkbox>
            <b-form-checkbox v-model="devices" name="M" value="4">4+ hours</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <!-- <p id='travel-question'>{{getTotalDevices()}}KG of Carbon</p> -->
      </div>





    </b-tab>




    <b-tab title="Recycling">
      <b-form-group id="checkbox-label" label="What did you recycle?">
        <b-form-checkbox-group id="checkbox" v-model="recycling" name="recycling" buttons >
          <b-form-checkbox id="checkbox" value="-128">Paper</b-form-checkbox>
          <b-form-checkbox id="checkbox" value="-17">Glass</b-form-checkbox>
          <b-form-checkbox id="checkbox" value="-30">Plastic</b-form-checkbox>
          <b-form-checkbox id="checkbox" value="-214">Aluminium</b-form-checkbox>
          <b-form-checkbox id="checkbox" value="-21">Wood</b-form-checkbox>
          <b-form-checkbox id="checkbox" value="-90">Food</b-form-checkbox>
        </b-form-checkbox-group>

        <form  id="submit-button" v-on:submit="addProfile">
        <router-link id='link' :to="{ name: 'score'}">  <button v-on:click="tabIndex = 0" type="submit" name="button">Complete Form</button></router-link>
        </form>
      </b-form-group>

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
      travel: 0,
      distance: 0,
      food: 0,
      recycling: 0,
      purchases: 0,
      devices: 0,
      totalCarbon: 0




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
        devices: this.getTotalDevices(),
        totalCarbon: this.getTotalCarbon()
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
      this.travel = 0
      this.distance = 0
      this.food = 0
      this.recycling = 0
      this.purchases = 0
      this.devices = 0
      this.totalCarbon = 0

    },

    getTotalDevices(){
      let devicesTotal = 0
      if (this.devices == "1" ) {
        devicesTotal += 3561
      }
      if (this.devices == "2"){
        devicesTotal += 7122
      }
      if (this.devices == "3"){
        devicesTotal += 10683
      }
      if (this.devices == "4"){
        devicesTotal += 14244
      }
      return devicesTotal
    },




    getTotalFood(){
      let foodTotal = 0
      if (this.food == "1" ) {
        foodTotal += 2903
      }
      if (this.food == "2"){
        foodTotal += 3811
      }
      if (this.food == "3"){
        foodTotal += 5625
      }
      if (this.food == "4"){
        foodTotal += 3901
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
        travelTotal += 22
      }
      if (this.travel == "bus"){
        travelTotal += 109
      }
      if (this.travel == "car"){
        travelTotal += 167
      }
      return travelTotal * this.distance
    },


    getTotalCarbon(){
      let runningTotalCarbon = 0
      runningTotalCarbon += this.getTotalTravel()
      runningTotalCarbon += this.getTotalPurchases()
      runningTotalCarbon += this.getTotalFood()
      runningTotalCarbon += this.getTotalRecycling()
      runningTotalCarbon += this.getTotalDevices()
      return runningTotalCarbon / 1000

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
  background-color: #162D50;
  height: 25%;
  font-size: 25%;
  border: solid 3px;
  margin-top: 5%;
}

button {
  background-color: #162D50;
  color: white;
  border-radius: 25px;
  font-size: 125%;
  margin-top: 5%;
  margin-bottom: -15%;
}

.formWrap {
  margin-bottom: 10px;
}


li {
  color: white;
}

select {
  width: 25%;
}



#details-form {
  border-radius: 15px;

}

#submit-button {
  background-color:  #53565700;
  font-size: 80%;
  color: #71C837;
}

#checkbox-label {
  font-size: 200%;
  color: #71C837;
}

#travel-label {
  font-size: 200%;
}

#checkbox {
  font-size: 250%;
}

#devices-question {
  font-size: 200%;
  color: #71C837;
  /* -webkit-text-stroke-width: 1px;
-webkit-text-stroke-color: black; */
}

#travel-question {
  font-size: 200%;
  color: #71C837;
  /* -webkit-text-stroke-width: 1px;
-webkit-text-stroke-color: black; */
}

#diet-question {
  font-size: 200%;
  color: #71C837;
  /* -webkit-text-stroke-width: 1px;
-webkit-text-stroke-color: black; */
}

#dietry-options {
  font-size: 200%;
  color: #71C837;
}

#big-form {
  align: center;
    color: #71C837;
    margin-top: 8%;
    margin-bottom: 5%;
    border: solid 5px;
    border-radius: 25px;
    border-color: white;
    padding: 5%;
    padding-top: 5%;
    font-weight: bold;
    background-color: #162D50;


}

#checkbox-btn{
  font-size: 600%;
}

#devices{
  align: center;
}

.form-control {
  background-color: #0000f;
  opacity: 50;

}



</style>

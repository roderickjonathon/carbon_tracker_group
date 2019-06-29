use carbon_counter;
db.dropDatabase();

db.profiles.insertMany([
  {
    name: "Jonny Circles",
    email: "roderickjgillies@gmail.com",
    travel_mode: "Bus",
    food_choice: "Veggie",
    recycling: ["Plastic", "Glass", "Paper", "Food"]
  },
  {
    name: "Marcin Sukacz",
    email: "marcin.sukacz@gmail.com",
    travel_mode: "Bike",
    food_choice: "Veggie",
    recycling: ["Plastic", "Glass", "Paper", "Food"]
  },
  {
    name: "Darren Nicol",
    email: "darren.nicol75@gmail.com",
    travel_mode: "Walk",
    food_choice: "Omnivore",
    recycling: ["Plastic", "Glass"],
  }
]);

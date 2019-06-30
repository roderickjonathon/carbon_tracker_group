use carbon_counter;
db.dropDatabase();

db.profiles.insert([
  {
    name: "Jonny Circles",
    email: "roderickjgillies@gmail.com",
    travel: "Bus",
    food: "Veggie",
    recycling: ["Plastic", "Glass", "Paper", "Food"]
  },
  {
    name: "Marcin Sukacz",
    email: "marcin.sukacz@gmail.com",
    travel: "Bike",
    food: "Veggie",
    recycling: ["Plastic", "Glass", "Paper", "Food"]
  },
  {
    name: "Darren Nicol",
    email: "darren.nicol75@gmail.com",
    travel: "Walk",
    food: "Omnivore",
    recycling: ["Plastic"]
  }
]);

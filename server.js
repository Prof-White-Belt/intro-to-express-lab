import express from 'express';

const app = express();

// greeting route
app.get('/greetings/:username', (req, res) => {
  const { username } = req.params;  
  res.send(`Hello there, ${username}!`);  
});

//  dice route
app.get('/roll/:number', (req, res) => {
  const max = Number(req.params.number);  

  if (isNaN(max)) {  
    return res.send("You must specify a number.");
  }

  const randomRoll = Math.floor(Math.random() * (max + 1));  
  res.send(`You rolled a ${randomRoll}!`);  
});

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
  
  // Route for Collectibles
  app.get('/collectibles/:index', (req, res) => {
    const index = Number(req.params.index);  
  
    if (isNaN(index) || index < 0 || index >= collectibles.length) {  
      return res.send("This item is not yet in stock. Check back soon!");
    }
  
    const item = collectibles[index];  
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
  });
  
  // Shoes Data
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];
  
  // shoes route 
  app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;
  
    // Filter by min-price
    if (req.query['min-price']) {
      const minPrice = Number(req.query['min-price']);
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
  
    // Filter by max-price
    if (req.query['max-price']) {
      const maxPrice = Number(req.query['max-price']);
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
  
    if (req.query['type']) {
      const type = req.query['type'].toLowerCase();
      filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type);
    }
  
    res.json(filteredShoes);
  });
  
  app.listen(3000, () => {
    console.log("Server is running");
  });
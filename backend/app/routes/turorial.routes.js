module.exports = (app) => {
    const players = require("../controllers/tutorial.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", players.create);
  
    // Retrieve all Tutorials
    router.get("/", players.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", players.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", players.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", players.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", players.delete);
  
    // Delete all Tutorials
    router.delete("/", players.deleteAll);
  
    app.use("/api/players", router);
  };
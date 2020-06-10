module.exports = app => {
    const recipesDB = app.data.recipes
    const controller = {};
  
    controller.listRecipes = (req, res) => res.status(200).json(recipesDB);
  
    return controller;
  }
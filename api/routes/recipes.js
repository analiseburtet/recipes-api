module.exports = app => {
const controller = app.controllers.recipes
const controllerId = app.controllers.recipe

app.route('/api/v1/recipes')
    .get(controller.listRecipes);

app.route('/api/v1/recipes/:id')
    .get(controllerId.recipe);
}
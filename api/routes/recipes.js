const fs = require('fs');
const path = require('path');

    module.exports = app => {
const controller = app.controllers.recipes
const controllerId = app.controllers.recipe

app.route('/api/v1/recipes')
    .get(controller.listRecipes)
    .post((req, res, next) => {
        const filePath = path.join(__dirname, '../data/recipes.json');
        fs.readFile(filePath, 'utf8', function readFileCallback(err, data){
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data);
                obj.recipes.data.push(req.body);
                json = JSON.stringify(obj);
                fs.writeFile(filePath, json, 'utf8', (err) => {
                    if (err) console.log(err)
                }); // write it back
            }});

        console.log(req.body.id)
        res.send(`Add a Recipe, id: ${req.body.id}`)
      })

app.route('/api/v1/recipes/:id')
    .get(controllerId.recipe);
}

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

module.exports = app => {
    const controller = app.controllers.recipes
    const controllerId = app.controllers.recipe
    const filePath = path.join(__dirname, '../data/recipes.json');

    app.route('/api/v1/recipes')
        .get(controller.listRecipes)
        .post((req, res) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data);
                    obj.recipes.data.push(req.body);
                    json = JSON.stringify(obj);
                    fs.writeFile(filePath, json, 'utf8', (err) => err ? console.log(err) : null)
                }
            });
            res.send(`Add a Recipe, id: ${req.body.id}`)
        })
        .put((req, res) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let id = req.body.id
                    obj = JSON.parse(data)
                    recipes = obj.filter((el) => el.id !== id)
                    recipes.push(req.body)
                    json = JSON.stringify(recipes)
                    fs.writeFile(filePath, json, 'utf8', (err) => err ? console.log(err) : null)
                }
            });
            res.send(`Put a Recipe, id: ${req.body.id}`)
        })
        .delete((req, res) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data);
                    array = obj.recipes.data
                    json = array.filter((el) => el.id !== req.body.id)
                    jsonF = JSON.stringify(json);
                    fs.writeFile(filePath, jsonF, 'utf8', (err) => err ? console.log(err) : null)
                }
            });
            res.send(`Delete a Recipe, id: ${req.body.id}`)
        })

    app.route('/api/v1/recipes/:id')
        .get(controllerId.recipe);

    app.route('/api/v1/login')
        .post((req, res) => {
            if (req.body.user === 'luiz' && req.body.password === '123') {
                //auth ok
                const id = 1; //esse id viria do banco de dados
                const token = jwt.sign({
                    id
                }, process.env.SECRET, {
                    expiresIn: 300 // expires in 5min
                });
                return res.json({
                    auth: true,
                    token: token
                });
            }

            res.status(500).json({
                message: 'Login inválido!'
            });
        })

    app.route('/api/v1/logout')
        .post((req, res) => {
            res.json({
                auth: false,
                token: null
            })
        })

    app.route('/api/v1/clientes')
        .get((req, res) => {
            console.log("Retornou todos clientes!");
            res.json([{
                id: 1,
                nome: 'luiz'
            }]);
        })
}

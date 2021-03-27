module.exports = app => {
const recipesDB = app.data.recipes
const controllerId = {};

controllerId.recipe = async (req, res) => {
    try {
        const data = await recipesDB.recipes.data.find(e => e.id === req.params.id);
        res.status(200).send(data);
    } catch (e) {
    res.status(500).send({message: 'Falha ao carregar.'});
    }
}
return controllerId;
}

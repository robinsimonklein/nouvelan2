const {Router} = require('express')

const router = Router()

const models = require('./../models/index')

/* ADD category. */
router.post('/categories/add', async function (req, res, next) {
    try {
        const category = await models.Category.create({
            name: req.body.name,
            slug: req.body.slug,
            color: req.body.color || '',
            icon: req.body.icon || ''
        })
        res.status(201).json(category)
    }catch(error) {
        res.status(500).send(error.message);
    }
})

/* GET categories listing. */
router.get('/categories', async function (req, res, next) {
    try {
        const categories = await models.Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

/* GET category by ID. */
router.get('/categories/:id', async function (req, res, next) {
    const id = parseInt(req.params.id)
    try {
        const category = await models.Category.findOne({
            where: { id: id }
        });
        if(category){
            res.status(200).json(category);
        }else {
            res.status(404).send('Category with the specified ID does not exists')
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router

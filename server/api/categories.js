const {Router} = require('express')

const router = Router()

const models = require('./../models/index')

// Mock Users
const categories = [
    {
        id: 1,
        name: 'Boire',
        color: 'blue',
        icon: 'glass-martini-alt'
    },
    {
        id: 2,
        name: 'Manger',
        color: 'pink',
        icon: 'pizza-slice'
    },
    {
        id: 3,
        name: 'S\'amuser',
        color: 'yellow',
        icon: 'laugh-beam'
    },
    {
        id: 4,
        name: 'À ramener',
        color: 'green',
        icon: 'suitcase'
    },
]

/* ADD category. */
router.post('/categories/add', function (req, res, next) {
    console.log(req.body)
    models.Category.create({
        name: req.body.name || '',
        slug: req.body.slug || '',
        color: req.body.color || '',
        icon: req.body.icon || ''
    })

    res.json(categories)
})

/* GET categories listing. */
router.get('/categories', function (req, res, next) {
    res.json(categories)
})

/* GET category by ID. */
router.get('/categories/:id', function (req, res, next) {
    const id = parseInt(req.params.id)
    if (id >= 0 && id < categories.length) {
        res.json(categories[id])
    } else {
        res.sendStatus(404)
    }
})

module.exports = router

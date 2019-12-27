const {Router} = require('express')

const router = Router()

const models = require('./../models/index')


/* ADD todos */
router.post('/todos/add', async function (req, res, next) {
    console.log(req.body)
    try {
        const todo = await models.Todo.create({
            name: req.body.name,
            checked: req.body.checked || false,
            amount: req.body.amount,
            CategoryId: req.body.CategoryId
        })
        res.status(201).json(todo)
    } catch (error) {
        res.status(500).send(error.message);
    }
})

/* GET todos listing. */
router.get('/todos', async function (req, res, next) {
    try {
        const todos = await models.Todo.findAll();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

/* GET todos by ID. */
router.get('/todos/:todoId', async function (req, res, next) {
    try {
        const { todoId } = req.params;

        const todos = await models.Todo.findOne({
            where: {id: todoId}
        });

        if(todos){
            res.status(200).json(todos);
        }else {
            res.status(404).send('Todo with the specified ID does not exists')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

/* UPDATE todos by id */
router.put('/todos/:todoId', async function (req, res, next) {
    try {
        const { todoId } = req.params;
        const [ updated ] = await models.Todo.update(req.body, {
            where: { id: todoId }
        });
        if (updated) {
            const todos = await models.Todo.findAll();
            return res.status(200).json(todos);
        }
        throw new Error('Todo not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

/* DELETE todos by ID. */
router.delete('/todos/:todoId', async function (req, res, next) {
    try {
        const { todoId } = req.params;
        const deleted = await models.Todo.destroy({
            where: { id: todoId }
        });
        if (deleted) {
            res.status(204).send("Post deleted");
        }
        throw new Error("Todo not found");
    } catch (error) {
        res.status(500).send(error.message);
    }
})


module.exports = router

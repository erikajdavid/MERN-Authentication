const router = require("express").Router();
const todoList = require("../models/listModel");
const auth = require("../middlewear/auth");

router.post("/", auth, async (req, res) => {
    try {
        const { todo } = req.body

        const newTodo = new todoList({
            todo
        });

        const saveTodo = await newTodo.save();

        res.json(saveTodo);
        
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

//get full todo list in an array
router.get("/", auth, async (req, res) => {
    try {
        const getAllTodos = await todoList.find();
        res.json(getAllTodos);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
})

module.exports = router;


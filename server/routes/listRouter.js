const router = require("express").Router();
const todoList = require("../models/listModel");

router.post("/", async (req, res) => {
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
})

module.exports = router;


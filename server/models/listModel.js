const mongoose = require("mongoose");

const todoListSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    }
});

const todoList = mongoose.model("todoList", todoListSchema);

module.exports = todoList;
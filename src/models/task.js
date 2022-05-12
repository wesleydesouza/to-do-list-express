const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    name: {type: String, required: true},
    done: {type: Boolean, default: false},
    //referencia
    checklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Checklist",
        require: true
    }
})

module.exports = mongoose.model("task", taskSchema);
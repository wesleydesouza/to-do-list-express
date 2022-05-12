const mongoose = require("mongoose");

const checkListSchema = mongoose.Schema({
    name: {type: String, required: true},
    //relacao
    tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
    }]
})

module.exports = mongoose.model("Checklist", checkListSchema);

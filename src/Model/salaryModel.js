const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
   
    department: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const SalaryModel = mongoose.model("salary", salarySchema);

module.exports = SalaryModel;
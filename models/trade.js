const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const tradeSchema = mongoose.Schema({
    sender: { type: Schema.ObjectId, required: true, ref: "User" },
    receiver: { type: Schema.ObjectId, required: true, ref: "User" },
    book: { type: Schema.ObjectId, required:true, ref:"Book"},
    status: {
        type: String,
        enum: ["PENDING","APPROVED","DECLINED"],
        default: "PENDING"
    },
    date: { type: Date, default: Date.now }
});


const Trade = mongoose.model("Trade", tradeSchema);
module.exports = Trade;
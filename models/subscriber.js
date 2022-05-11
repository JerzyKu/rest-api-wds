const mongoose = require('mongoose')

const subscribersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    subscribedToChanels: {
        type: String,
        require: true
    },
    subscribeDate: {
        type: Date,
        require:true,
        default: Date.now
    }
})

module.exports = mongoose.model('Subscriber', subscribersSchema)
const express = require('express')
const subscriber = require('../models/subscriber')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// get all
// get one 
//create one 
// update one 
// dell one

//get all 
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.send(subscribers)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get one 
router.get('/:id', getSubscriber, (req, res) => {
    res.send(res.subscriber)
})
//create one 
router.post('/', async (req, res) => {
    const sub = new Subscriber({
        name: req.body.name,
        subscribedToChanels: req.body.subscribedToChanels
    })

    try {
        const newSub = await sub.save()
        res.status(201).json(newSub)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
// update one 
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChanels != null) {
        res.subscriber.subscribedToChanels = req.body.subscribedToChanels
    }
    try {
        const newSub = await res.subscriber.save()
        res.json(newSub)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
// dell one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({message: "usunięto"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        console.log(subscriber);
        if (subscriber == null) {
            return res.status(404).json({message: "Cannot find subscriber. "})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.subscriber = subscriber
    next()
}

module.exports = router
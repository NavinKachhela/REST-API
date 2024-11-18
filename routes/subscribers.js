const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')
// Getting ALl
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
})

// Getting One
router.get('/:id', getSubscriber, (req, res) => {
    return res.send(res.subscriber);
})

// Creating One
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber);
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if(req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    try {
        updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
})

// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne()
        res.json({ message: 'Deleted Subscriber' })
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
})

async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null) {
            return res.status(404).json("Cannot find subscriber")
        }
    } catch(err) {
        res.status(500).json({ message: error.message });
    }
    res.subscriber = subscriber
    next()
}

module.exports = router;
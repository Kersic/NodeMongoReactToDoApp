const express = require('express');
const router = express.Router();
const ListRouter = require('../models/list');

router.get('/', (req, res) => {
    console.log('GET: list/');
    ListRouter.find()
        .populate('tag')
        .then(data => {res.json(data)})
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    console.log('GET: list/:id');
    ListRouter.findOne({_id: req.params.id})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    console.log(req.body);
    console.log('POST: list/');
    const list = new ListRouter({
        name: req.body.name,
        isDone: req.body.isDone,
        tag: req.body.tag,
    });
    console.log(list);
    list.save()
        .then(data => {res.json(data)})
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    console.log('DELETE: list/:id/' + req.params.id);
    ListRouter.deleteOne({_id: req.params.id})
        .then(data => {
            res.json({'status': 'success', 'data': data});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    console.log('PUT: list/:id/' + req.params.id);
    ListRouter.updateOne(
        {_id: req.params.id},
        { $set: {
                name: req.body.name,
                isDone: req.body.isDone,
                tag: req.body.tag,
            }})
        .then(() => {
            ListRouter.findOne({_id: req.params.id})
                .then(data => {
                    res.json(data);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
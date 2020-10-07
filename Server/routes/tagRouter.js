const express = require('express');
const router = express.Router();
const TagRouter = require('../models/tag');

router.get('/', (req, res) => {
    console.log('GET: tag/');
    TagRouter.find()
        .then(data => {res.json(data)})
        .catch(err => {
            console.log(err);
            res.json(err);
        })
});

router.get('/:id', (req, res) => {
    console.log('GET: tag/:id');
    TagRouter.findOne({_id: req.params.id})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

router.post('/', (req, res) => {
    console.log(req.body);
    console.log('POST: tag/');
    const tag = new TagRouter({
        text: req.body.text,
        color: req.body.color,
    });
    console.log(tag);
    tag.save()
        .then(data => {res.json(data)})
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

router.delete('/:id', (req, res) => {
    console.log('DELETE: tag/:id/' + req.params.id);
    TagRouter.deleteOne({_id: req.params.id})
        .then(data => {
            res.json({'status': 'success', 'data': data});
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

router.put('/:id', (req, res) => {
    console.log('PUT: tag/:id/' + req.params.id);
    TagRouter.updateOne(
        {_id: req.params.id},
        { $set: {
                text: req.body.text,
                color: req.body.color,
            }})
        .then(data => {
            TagRouter.findOne({_id: req.params.id})
                .then(data => {
                    res.json(data);
                })
                .catch(err => {
                    console.log(err);
                    res.json(err);
                });
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

module.exports = router;
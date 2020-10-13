const express = require('express');
const router = express.Router();
const TaskRouter = require('../models/task');

router.get('/', (req, res) => {
    console.log('GET: task/');
    TaskRouter.find()
        .populate('tag')
        .populate('list')
        .then(data => {res.json(data)})
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:listId', (req, res) => {
    console.log('GET: task/:listId');
    console.log(req.params);
    TaskRouter.find({list: req.params.listId})
        .populate('tag')
        .populate('list')
        .then(data => {res.json(data)})
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});


router.post('/', (req, res) => {
    console.log(req.body);
    console.log('POST: task/');
    const task = new TaskRouter({
        text: req.body.text,
        deadline: req.body.deadline,
        reminderDate: req.body.reminderDate,
        isDone: req.body.isDone,
        tag: req.body.tag,
        list: req.body.list,
    });
    console.log(task);
    task.save()
        .then(data => {res.json(data)})
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/isDone/:id', (req, res) => {
    console.log(req.body);
    console.log('POST: task/isDone');
    TaskRouter.updateOne(
        {_id: req.params.id},
        { $set: {
                isDone: req.body.isDone,
            }})
        .then(() => {
            TaskRouter.findOne({_id: req.params.id})
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

router.delete('/:id', (req, res) => {
    console.log('DELETE: task/:id/' + req.params.id);
    TaskRouter.deleteOne({_id: req.params.id})
        .then(data => {
            res.json({'status': 'success', 'data': data});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    console.log('PUT: task/:id/' + req.params.id);
    TaskRouter.updateOne(
        {_id: req.params.id},
        { $set: {
                text: req.body.text,
                deadline: req.body.deadline,
                reminderDate: req.body.reminderDate,
                isDone: req.body.isDone,
                tag: req.body.tag,
                list: req.body.list,
            }})
        .then(() => {
            TaskRouter.findOne({_id: req.params.id})
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
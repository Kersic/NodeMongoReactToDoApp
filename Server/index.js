const express = require('express');
const taskRoute = require('./routes/taskRouter');
const tagRoute = require('./routes/tagRouter');
const listRoute = require('./routes/listRouter');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
const port = 3001;

app.get('/', (req, res) => {
    res.json({
        'app name': 'To do list',
    });
})

app.use('/task', taskRoute);
app.use('/tag', tagRoute);
app.use('/list', listRoute);

var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 'mongodb+srv://Tadeja:feriferi09!@cluster0.bg9wo.mongodb.net/todolist?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB'));
mongoose.Promise = global.Promise;


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})
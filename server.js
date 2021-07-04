const express = require('express');
const mongoose = require('mongoose');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authorRoutes');
const bookRouter = require('./routes/bookRoutes');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

dotenv.config({ path: './config.env'});
const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con =>{
    console.log('DB connection successful')
});



app.use('/', indexRouter)
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

app.listen(process.env.PORT || 3000);

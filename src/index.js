import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';

import homePageRouters from './routes/homePageRoutes.js'



const app = express();
const port = 3000;


app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));


//Routes
app.use('/EveryOnesBlog', homePageRouters);


app.listen(port, () => {
    console.log(`Server is listening on ${port} port...`)
})
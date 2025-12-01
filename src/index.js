import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';

import homePageRouters from './routes/homePageRoutes.js';
import registrationPageRoutes from './routes/registrationPageRoutes.js';
import loginPageRoutes from './routes/loginPageRoutes.js';


const app = express();
const port = 3000;


app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));


//Routes
app.use('/EveryOnesBlog', homePageRouters);
app.use('/EveryOnesBlog', registrationPageRoutes);
app.use('/EveryOnesBlog', loginPageRoutes);


app.listen(port, () => {
    console.log(`Server is listening on ${port} port...`)
})
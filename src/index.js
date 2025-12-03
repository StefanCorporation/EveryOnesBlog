import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import homePageRoutes from './routes/homePageRoutes.js';
import registrationPageRoutes from './routes/registrationPageRoutes.js';
import loginPageRoutes from './routes/loginPageRoutes.js';
import profilePageRoutes from './routes/profilePageRoutes.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;


app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



//Routes
app.use('/EveryOnesBlog', homePageRoutes);
app.use('/EveryOnesBlog', registrationPageRoutes);
app.use('/EveryOnesBlog', loginPageRoutes);
app.use('/EveryOnesBlog', profilePageRoutes);


app.listen(port, () => {
    console.log(`Server is listening on ${port} port...`)
})
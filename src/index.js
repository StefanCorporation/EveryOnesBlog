import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';

import { fileURLToPath } from 'url';

import connectDB from "./db/connect.js";

import homePageRoutes from './routes/homePageRoutes.js';
import registrationPageRoutes from './routes/registrationPageRoutes.js';
import loginPageRoutes from './routes/loginPageRoutes.js';
import profilePageRoutes from './routes/profilePageRoutes.js';

import User from './models/User.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;


//DB connect
connectDB();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
}));




// Middleware to load current logged-in user into ALL templates
app.use(async (req, res, next) => {
    res.locals.user = null;           // default: no user
    res.locals.isAuthenticated = false;

    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);
            if (user) {
                res.locals.user = user;              // ← now available in ALL EJS files
                res.locals.isAuthenticated = true;
            }
        } catch (err) {
            console.error('Error loading user:', err);
        }
    }
    next();
});


//Routes
app.use('/EveryOnesBlog', homePageRoutes);
app.use('/EveryOnesBlog', registrationPageRoutes);
app.use('/EveryOnesBlog', loginPageRoutes);
app.use('/EveryOnesBlog', profilePageRoutes);


app.listen(port, () => {
    console.log(`Server is listening on ${port} port...`)
})
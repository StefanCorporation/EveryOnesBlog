import User from "../models/User.js";

export const getRegistrationPage = (req, res) => {
  res.render('pages/registration.ejs', { title: 'Registration', errors: {}, old: {} });
};

//REGISTRATION 
export const registration = async (req, res) => {
    const { username, firstname, lastname, email, password, confirmPassword } = req.body;

    //Confirm body check
    if (password !== confirmPassword) {
        return res.render('pages/registration.ejs', {
            title: "Registration",
            errors: { confirmPassword: 'Password do not match!!!' },
            //Preserve entered values
            old: req.body,
        });
    }


    try {
        //Check for existing user
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return res.render('pages/registration.ejs', {
                title: 'Registration',
                errors: { general: 'Username or email already taken' },
                old: req.body,
            });
        }

        // Create user (password will be hashed by pre-save hook)
        const user = new User({ 
            username, 
            firstname,
            lastname,
            email, 
            password,
         });
        await user.save();

        // ✅ AUTO-LOGIN HERE
        req.session.userId = user._id;  // Set session → user is now logged in

        res.redirect('/EveryOnesBlog'); // or '/dashboard' if you auto-login

    } catch (err) {
        res.render('pages/registration.ejs', {
        title: 'Registration',
        errors: { general: err.message },
        old: req.body,
    });
  }
};
    

// LOGIN PAGE
export const getLoginPage = (req, res) => {
  res.render('pages/login.ejs', {
    title: 'Login',
    errors: {},
    old: {},
  });
};

// LOGIN HANDLER
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('pages/login.ejs', {
      title: 'Login',
      errors: { general: 'Please enter username and password' },
      old: { username },
    });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.render('pages/login.ejs', {
        title: 'Login',
        errors: { general: 'Invalid username or password' },
        old: { username },
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.render('pages/login.ejs', {
        title: 'Login',
        errors: { general: 'Invalid username or password' },
        old: { username },
      });
    }

    // ✅ LOGIN SUCCESS
    req.session.userId = user._id;

    res.redirect('/EveryOnesBlog');

  } catch (err) {
    console.error(err);
    res.render('pages/login.ejs', {
      title: 'Login',
      errors: { general: 'Something went wrong' },
      old: { username },
    });
  }
};
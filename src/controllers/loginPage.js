export const getLoginPage = (req, res) => {
    res.render('pages/login.ejs', {'title': 'Login',})
}
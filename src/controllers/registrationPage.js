export const getRegistrationPage = (req, res) => {
    res.render('pages/registration.ejs', {'title': 'Registration',})
}
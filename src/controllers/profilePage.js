export const getProfilePage = (req, res) => {
    res.render('pages/profile.ejs', {'title': 'Profile',})
}
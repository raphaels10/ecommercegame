module.exports = (req, res, next) => {
    res.cookie('CSRF_id', "", { secure: false, httpOnly: true, expires: new Date(new Date().getTime()+ 1) })
    res.send()
}
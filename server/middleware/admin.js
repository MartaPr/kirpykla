
let admin = (req, res, next) => {
    (req.user.role === 0) ? res.send("noup") : next();
}

module.exports = { admin}
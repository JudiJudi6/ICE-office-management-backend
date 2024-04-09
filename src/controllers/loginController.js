const User = require('../database/user')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    }catch (err) {
        console.log('Error💥: ', err )
        res.status(500).json({ error: "getAllUsers error" });
    }
}
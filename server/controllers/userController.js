import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'

// Create JSON Web Token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}


const signUp = async (req, res) => {
    const { username, password } = req.body
    try {
        // Validate username and password
        if (await User.findOne({ username })) throw Error("Username already exist")
        if (!username || !password) throw Error('All fields must be filled!')
        if (!validator.isStrongPassword(password)) throw Error('Not a strong password')
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await User.create({ username, password: hash })
        res.status(200).json({ username })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ error: "Incorrect credential" })
    }
    const token = createToken(user._id)
    res.status(200).json({ username, token })
}

export { signUp, login }
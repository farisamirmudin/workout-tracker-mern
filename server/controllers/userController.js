import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'

// Create Web Token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
} 
// validate email and password
async function validateAndCreate(email, password) {
    if (await User.findOne({email})) throw Error("Email already exist")
    if (!email || !password) throw Error('All fields must be filled!')
    if (!validator.isEmail(email)) throw Error('Not a valid email')
    if (!validator.isStrongPassword(password)) throw Error('Not a strong password')
}


const signUp = async (req, res) => {
    const { email, password } = req.body
    
    try {
        
        await validateAndCreate(email, password)
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await User.create({email, password: hash})
        const token = createToken(user._id)
        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).json({message: "Incorrect credential"})
    }
    const token = createToken(user._id)
    res.status(200).json({email, token})
}

export { signUp, login }
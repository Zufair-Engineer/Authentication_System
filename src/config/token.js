import jwt from 'jsonwebtoken'

const generateToken = (user)=>{
    const token = jwt.sign(
        {id: user._id},
        `${process.env.JWT_KEY}`,
        {expiresIn: "7d"},
    )
}

export default generateToken;
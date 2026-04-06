import jwt from 'jsonwebtoken'

const createToken = (res,userId) => {
    const tokan = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"30d",
 });
 // set JWT as on Cookie
 res.cookie('jwt',tokan,{
    httpOnly:true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite:'strict',
    maxAge:30*24*60*60*1000
 })
 return tokan
}

export default createToken;
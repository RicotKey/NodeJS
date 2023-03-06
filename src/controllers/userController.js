import db from '../models/index'
import userService from '../service/userService' 
let handleLogin =async (req, res) =>{
    let email = req.body.email;
    let password = req.body.password;
   /**
    * body là truyền dữ liệu kiểu post ẩn bên dưới
    */
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Parameter missing'
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,  
        user: userData.user ? userData.user :{}
    })
}
let handleGetAllUser = async (req, res) =>{
    let id =req.query.id;
    /**
     * query là truyền dữ kiểu get trực tiếp trên url 
     */
    if(!id){
        return res.status(200).json({
            errCode: 1, 
            message: 'Parameter missing',
            users: []
        })
    }
    let users = await userService.getAllUser(id);
    console.log(users)
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users: users
    })

}

module.exports = {
    handleLogin,
    handleGetAllUser
}
import db from '../models/index'
import bcrypt from 'bcryptjs'
let handleUserLogin = async(email, password) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let userData ={};
            let isSet = await checkUseremail(email);
            if(isSet){
                let user = await db.User.findOne({
                    where: {email : email},
                    attributes: ['email','roleId','password'],
                    raw : true

                });

                if(user){
                    let checkpwd = await bcrypt.compareSync(password, user.password);
                    if(checkpwd){
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password'
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = 'Your email not found';
                }
                
            }else{
                userData.errCode = 2;
                userData.errMessage = 'Your email not found';
                
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUseremail =async (useremail) =>{
    return new Promise(async(resolve, reject)=>{
        try {
            let checkemail = await db.User.findOne({
                where: {email : useremail}
            })

            resolve(checkemail?true:false)
        } catch (error) {
            reject(error)
        }
    })
} 

module.exports={
    handleUserLogin
}
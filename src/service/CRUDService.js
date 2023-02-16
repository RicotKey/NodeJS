import bcrypt from 'bcryptjs'
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data)=>{
    return new Promise( async (resolve, reject) =>{
        try {
            let hashpassword = await hashUserPassword(data.password);
            await db.User.create(
                {
                    email: data.email,
                    password: hashpassword,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === '1'? true: false,
                    roleid: data.roleid,
                }
            )
            resolve('Create new user succeed');
        } catch (error) {
            reject(e);
        }
    }) 
}
let hashUserPassword = (password)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            let hasPassword = await bcrypt.hashSync(password, salt); 
            resolve(hasPassword);
        } catch (e) {
            reject(e)
        }
    })
}
module.exports ={
    createNewUser
}
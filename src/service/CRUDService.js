import bcrypt from 'bcryptjs'
import { raw } from 'body-parser';
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

let alluser = ()=>{
    return new Promise( async( resolve, reject) =>{
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getOneUserbyID  = (userId) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user =await db.User.findOne({
                where: {id: userId},
                raw: true
            })
            if(user){
                resolve(user)
            }
            else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}
let updateUser = (user) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            await db.User.update(
                {lastName: user.lastname,
                firstName: user.firstname,
                address: user.address},
                
                {where: {id: user.id}}
            )

            let alluser = await db.User.findAll({
                raw: true,
            });
            resolve(alluser)
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userid) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            await db.User.destroy({
                where: {id : userid},
                raw: true
            })
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}
module.exports={
    createNewUser,
    alluser,
    getOneUserbyID,
    updateUser,
    deleteUser
}
import db from '../models/index'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isSet = await checkUseremail(email);
            if (isSet) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    raw: true

                });

                if (user) {
                    let checkpwd = await bcrypt.compareSync(password, user.password);
                    if (checkpwd) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password'
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'Your email not found';
                }

            } else {
                userData.errCode = 2;
                userData.errMessage = 'Your email not found';

            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}
//Hàm kiểm tra mail tồn tại
let checkUseremail = async (useremail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkemail = await db.User.findOne({
                where: { email: useremail }
            })

            resolve(checkemail ? true : false)
        } catch (error) {
            reject(error)
        }
    })
}
//Hàm hash Pass
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hasPassword = await bcrypt.hashSync(password, salt);
            resolve(hasPassword);
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUser = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (userid === "ALL") {
                user = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userid && userid !== 'ALL') {
                user = await db.User.findOne({
                    where: { id: userid },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(user)
        } catch (error) {
            reject(error)
        }

    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let checkmail = await checkUseremail(data.email);
            if (checkmail === true) {
                resolve({
                    errCode: 1,
                    message: 'Email already exists'
                })
            } else {
                let hashpassword = await hashUserPassword(data.password);
                await db.User.create(
                    {
                        email: data.email,
                        password: hashpassword,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        phonenumber: data.phonenumber,
                        gender: data.gender,
                        roleid: data.role,
                        positionid: data.position
                    }
                )
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    message: "User already exists"
                })
            } else {
                await db.User.destroy({
                    where: { id: id },
                    raw: true
                })
                resolve({
                    errCode: 0,
                    message: "Delete user success"
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.firstName || !data.lastName || !data.address || !data.phonenumber) {
                resolve({
                    errCode: 1,
                    message: "Parameter missing"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                await db.User.update(
                    {
                        lastName: data.lastName,
                        firstName: data.firstName,
                        address: data.address,
                        phonenumber: data.phonenumber,
                        gender: data.gender,
                        roleid: data.roleid,
                        positionid: data.positionid,


                    },
                    { where: { id: data.id } }
                )
                resolve({
                    errCode: 0,
                    message: "Edit user success"
                })
            } else {
                resolve({
                    errCode: 2,
                    message: "User already exists"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllCode = async (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!type) {
                resolve({
                    errCode: 1,
                    errMessage: "Parameter missing"
                })
            } else {
                //let res = {}
                let allcodes = await db.Allcode.findAll({
                    where: { type: type }
                });
                resolve({
                    errCode: 0,
                    message: "Get allcodes success",
                    data: allcodes

                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin,
    getAllUser,
    createNewUser,
    deleteUser,
    updateUser,
    getAllCode
}
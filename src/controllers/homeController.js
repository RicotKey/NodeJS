
import db from '../models/index'
import CRUDService from '../service/CRUDService' 
let getHomPage  = async (req, res) =>{
    try {
        let data = await db.User.findAll();
        return res.render('index.ejs', {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
    
}

let getCRUD = (req, res) =>{
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) =>{
    let message= await CRUDService.createNewUser(req.body);
    console.log(message)
    let data = await CRUDService.alluser();
    return res.render('table-user.ejs', {
        data: data
    })
}

let getAllUser = async (req, res) =>{
    let data = await CRUDService.alluser();
    return res.render('table-user.ejs', {
        data: data
    })
}
let editUser = async (req, res) =>{
    let userId = req.query.id;
    if(userId){
        let user = await CRUDService.getOneUserbyID(userId)
        return res.render('edit-user.ejs',{
            user: user
        })
    }
    else{
        return res.send('Not found')
    }
    
}

let putUser =async ( req, res) => {
    let userUpdate = await CRUDService.updateUser(req.body);
    return res.render('table-user.ejs', {
       data: userUpdate
    })
}
let deleteUser = async (req, res) =>{
    let userId = req.query.id
    if(userId){
        let userDelete = await CRUDService.deleteUser(userId)
        return res.render('table-user.ejs', {
            data: userDelete
         })
    }
    else{
        return res.send('Not found')
    }
}

module.exports = {
    getHomPage,
    getCRUD,
    postCRUD,
    getAllUser,
    editUser,
    putUser,
    deleteUser
}
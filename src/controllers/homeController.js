
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
    return res.send('Hello World');
}
module.exports = {
    getHomPage,
    getCRUD,
    postCRUD
}
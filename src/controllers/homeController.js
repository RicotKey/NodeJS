
import db from '../models/index'
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

module.exports = {
    getHomPage
}
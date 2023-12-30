
const mongoose  = require('mongoose');

const url = process.env.MONGODB_URL;

const connection = async()=>{

    try {
        const response = await mongoose.connect(url);
        console.log(`mongodb connected `);
        // console.log(response);
        
    } catch (error) {
        console.log("error : ",error.message);
    }

}

module.exports = connection;




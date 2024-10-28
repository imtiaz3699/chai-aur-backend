// require('dotenv').config();

import dotenv from 'dotenv'
import connectDb from "./database/db.js";
import { app } from './app.js';
// import {ApiError} from './utils/apiErrors.js'

dotenv.config({
    path:'./.env'
})
connectDb()
.then(()=> {
    app.on('error',(err)=> {
        console.log(err,'ERRR:')
        throw err
    })
    app.listen(process.env.PORT || 8000,()=> {console.log(`Server is running at PORT ${process.env.PORT}`)})
})
.catch((err)=> {console.log(`MongoDb connection failed ${err}`)})




// import exrpress from 'express'
// const app = express();

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on('error',(err)=> {
//             console.log('ERR:',err);
//             throw err
//         })
//         app.listen(process.env.PORT,()=> {
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error('DB ERROR:',error);
//         throw error
//     }
// })();  

const mongoose = require('mongoose')
const config = require('config')
const connectdb = config.get('mongoURI')

const connectingtodb = async ()=>{
    try {

        await mongoose.connect(connectdb,{ useNewUrlParser: true })
        console.log('mongodb is connected now.........')
        
    } catch (err) {

        console.log(err.message)

        //exit the process with failure in operation
        process.exit(1)
        
    }
}

module.exports = connectingtodb
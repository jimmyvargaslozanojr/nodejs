const mongoose = require('mongoose')
const URL = 'mongodb://localhost:27017/crud'

module.exports = async () => {
    try {
        await mongoose.connect(URL)
        console.log('database connected')
    } catch (e) {
        console.log(e.message)
        console.log('Failed to connect database')
    }
}
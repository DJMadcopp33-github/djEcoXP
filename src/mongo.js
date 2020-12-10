const mongoose = require('mongoose')

const mongoConnect = null

module.exports.connectMongo = async (code) => {
  mongoConnect = await mongoose.connect(code, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  return mongoose
}

if(mongoConnect === null) {
    console.error('Please connect mongoose!')
} else {
    module.exports = mongoConnect
}
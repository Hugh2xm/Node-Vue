const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String },
    password: { type: String, select: false ,set(val) {
        //密码散列bcrypt;select表示查的时候要不要带数据
            return require('bcrypt').hashSync(val,10)
        }
    }
})

module.exports = mongoose.model('AdminUser',schema)
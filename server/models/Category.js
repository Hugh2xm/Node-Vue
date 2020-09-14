const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    parent: {
        type: mongoose.SchemaTypes.ObjectId,
        //关联
        ref: 'Category'
    }
})

module.exports = mongoose.model('Category',schema)
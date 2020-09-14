module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Catagory = require('../../models/Category')
    //CategoriesEdit
    router.post('/categories',async (req,res)=> {
        const model = await Catagory.create(req.body)
        res.send(model)
    })
    //修改分类的接口
    router.put('/categories/:id',async (req,res)=> {
        const model = await Catagory.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除分类的接口
    router.delete('/categories/:id',async (req,res)=> {
        const model = await Catagory.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    //显示分类列表
    router.get('/categories',async (req,res)=> {
        const items = await Catagory.find().populate('parent').limit()
        res.send(items)
    })
    //根据id获取数
    router.get('/categories/:id',async (req,res)=> {
        const model = await Catagory.findById(req.params.id)
        res.send(model)
    })
    app.use('/admin/api',router)
}
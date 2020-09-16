module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })
    // const req.Model = require('../../models/Category')
    //CategoriesEdit
    router.post('/',async (req,res)=> {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //修改分类的接口
    router.put('/:id',async (req,res)=> {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除分类的接口
    router.delete('/:id',async (req,res)=> {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })
    //显示分类列表
    router.get('/',async (req,res)=> {
        const queryOptions = {}
        if(req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    //根据id获取数
    router.get('/:id',async (req,res)=> {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    app.use('/admin/api/rest/:resource',async (req,res,next)=> {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)


    const multer  = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    //图片上传处理 //需要使用中间件multer
    app.post('/admin/api/upload', upload.single('file'), async (req,res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}
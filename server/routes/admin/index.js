module.exports = app => {
    const express = require('express')
    const AdminUser = require('../../models/AdminUser')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true
    })
    // const req.Model = require('../../models/Category')
    //CategoriesEdit
    //创建资源
    router.post('/',async (req,res)=> {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //修改资源
    router.put('/:id',async (req,res)=> {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除资源
    router.delete('/:id',async (req,res)=> {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })
    //资源列表
    router.get('/',async (req,res)=> {
        const queryOptions = {}
        if(req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    //资源详情
    router.get('/:id',async (req,res)=> {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')

    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)


    const multer  = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    //图片上传处理 //需要使用中间件multer
    app.post('/admin/api/upload', authMiddleware(),upload.single('file'), async (req,res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    //登录的路由
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // 1.根据用户名找用户 通过密码和用户名去数据库里面找是找不到的，因为密码进行了散列加密
        const user = await AdminUser.findOne({ username }).select('+password')
        assert(user, 422, '用户不存在')
        // 2.校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // 3.返回token 使用jsonwebtoken  secret是密钥，根据这个密钥生成这个token( 密钥是全局的属性)
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}
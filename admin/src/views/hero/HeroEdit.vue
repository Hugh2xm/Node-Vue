<template>
    <div class="about">
        <h1>{{id ? '编辑':'新建'}}英雄</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-tabs :tab-position="tabPosition" value="skills">
                <el-tab-pane label="基础信息" >
                    <el-form-item label="名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                                class="avatar-uploader"
                                :action="$http.defaults.baseURL + '/upload'"
                                :show-file-list="false"
                                :on-success="afterUpload"
                        >
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="model.categories" multiple>
                            <el-option
                                    v-for="item of categories"
                                    :label="item.name"
                                    :value="item._id"
                                    :key="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                        <!--   model.scores.difficult注意的是这里会报错不能读取difficult的属性，原因是没有定义scores   -->
                        <el-rate style="margin-top: .6rem;" :max="9" show-score v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate style="margin-top: .6rem;" :max="9" show-score v-model="model.scores.skills"></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate style="margin-top: .6rem;" :max="9" show-score v-model="model.scores.attack"></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate style="margin-top: .6rem;" :max="9" show-score v-model="model.scores.survive"></el-rate>
                    </el-form-item>
                    <el-form-item label="顺风出装">
                        <el-select v-model="model.items1" multiple>
                            <el-option
                                    v-for="item of items"
                                    :label="item.name"
                                    :value="item._id"
                                    :key="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="model.items2" multiple>
                            <el-option
                                    v-for="item of items"
                                    :label="item.name"
                                    :value="item._id"
                                    :key="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能管理" name="skills">
                    <el-button style="margin: 1.5rem 0 2rem 3rem" @click="model.skills.push({})">
                        <i class="el-icon-plus" style="margin-right: .5rem"></i>添加技能
                    </el-button>
                    <el-row type="flex" style="flex-wrap: wrap">
                        <el-col v-for="(item, index) in model.skills" :key="index">
                            <el-container>
                                <el-aside style="padding: 20px">
                                    <el-form-item label="图标">
                                        <el-upload
                                            class="avatar-uploader"
                                            :action="$http.defaults.baseURL + '/upload'"
                                            :show-file-list="false"
                                            :on-success="res => $set(item,'icon',res.url)"

                                        >
                                            <img v-if="item.icon" :src="item.icon" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                                        </el-upload>
                                    </el-form-item>
                                    <el-button size="small" type="danger"
                                               @click="model.skills.splice(index,1)"
                                    >
                                        删除
                                    </el-button>
                                </el-aside>
                                <el-main>
                                    <el-form-item label="名称">
                                        <el-input v-model="item.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="描述">
                                        <el-input type="textarea" v-model="item.description"></el-input>
                                    </el-form-item>
                                    <el-form-item label="小提示">
                                        <el-input type="textarea" v-model="item.tips"></el-input>
                                    </el-form-item>
                                </el-main>
                            </el-container>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="text-align: center; margin-top: 2rem">
                <el-button type="primary" native-type="submit" >保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "heroesEdit",
        props: {
            id: {}
        },
        data () {
            return {
                tabPosition: 'left',
                categories: [],
                items: [],
                model: {
                    name: '',
                    avatar: '',
                    scores: {
                        difficult: 0,
                        skills: 0,
                        attack: 0,
                        survive: 0
                    },
                },
            }
        },
        methods: {
            afterUpload (res) {
                this.model.avatar = res.url
            },
            // 修改和新建
            async save() {
                if (this.id) {
                    //修改
                    await this.$http.put(`rest/heroes/${this.id}`, this.model)
                } else {
                    //新建
                    await this.$http.post('rest/heroes', this.model)
                }
                this.$router.push('/heroes/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            //修改时显示的数据
            async fetch() {
                const res = await this.$http.get(`rest/heroes/${this.id}`)
                //因为原本定义中有scores这个属性，但是=res.data是覆盖的意思，所以找不到scores这个属性
                this.model = Object.assign({} ,this.model ,res.data)
            },
            //请求英雄类型
            async fetchCategories() {
                //注意的是这里拿到的是所有的分类
                const res = await this.$http.get(`rest/categories`)
                this.categories = res.data
            },
            //请求装备
            async fetchItems() {
                //注意的是这里拿到的是所有的分类
                const res = await this.$http.get(`rest/items`)
                this.items = res.data
            },

        },
        created () {
            this.fetchItems()
            this.fetchCategories()
            this.id && this.fetch()
        }
    }
</script>

<style scoped>
.avatar-uploader,
.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader,
.el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader {
    width: 5rem;
    height: 5rem;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
}
.avatar {
    width: 5rem;
    height: 5rem;
    display: block;
}
</style>
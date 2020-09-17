<template>
    <div class="about">
        <h1>{{id ? '编辑':'新建'}}文章</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <el-select v-model="model.categories" multiple>
                    <!--  label是显示在下拉菜单中的文字-->
                    <!--  value是选择下拉菜单中文字所对应的值-->
                    <el-option
                            v-for="item in categories"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="标题">
            <!--  vue element 没有组件可视化编辑 使用vue2-editor插件  -->
                <vue-editor
                        v-model="model.body"
                        useCustomImageHandler
                        @image-added="handleImageAdded"
                ></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import  { VueEditor } from 'vue2-editor'

    export default {
        name: "CategoriesEdit",
        props: {
            id: {}
        },
        components: {
            VueEditor
        },
        data () {
            return {
                model: {},
                categories: [],
            }
        },
        methods: {
            // 修改和新建
            async save() {
                if (this.id) {
                    //修改
                    await this.$http.put(`rest/articles/${this.id}`, this.model)
                } else {
                    //新建
                    await this.$http.post('rest/articles', this.model)
                }
                this.$router.push('/articles/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            //修改时显示的数据
            async fetch() {
                const res = await this.$http.get(`rest/articles/${this.id}`)
                this.model = res.data
            },
            //获取父级选项,下拉菜单
            async fetchCategories () {
                const res = await this.$http.get(`rest/categories`)
                this.categories = res.data
            },
            async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
                //提交表单数据/json数据
                let formData = new FormData();
                //接收的是二进制数据
                formData.append("file", file);
                const res = await this.$http.post('upload',formData)
                Editor.insertEmbed(cursorLocation, "image", res.data.url);
                resetUploader();
            }
        },
        created () {
            this.fetchCategories()
            this.id && this.fetch()
        }
    }
</script>

<style scoped>

</style>
<template>
    <div class="about">
        <h1>{{id ? '编辑':'新建'}}分类</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="上级分类">
                <el-select v-model="model.parent">
                    <!--  label是显示在下拉菜单中的文字-->
                    <!--  value是选择下拉菜单中文字所对应的值-->
                    <el-option
                            v-for="item in parents"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "CategoriesEdit",
        props: {
            id: {}
        },
        data () {
            return {
                model: {},
                parents: []
            }
        },
        methods: {
            // 修改和新建
            async save() {
                if (this.id) {
                    //修改
                    await this.$http.put(`rest/categories/${this.id}`, this.model)
                } else {
                    //新建
                    await this.$http.post('rest/categories', this.model)
                }
                this.$router.push('/categories/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            //修改时显示的数据
            async fetch() {
                const res = await this.$http.get(`rest/categories/${this.id}`)
                this.model = res.data
            },
            //获取父级选项,下拉菜单
            async fetchParents () {
                const res = await this.$http.get(`rest/categories`)
                this.parents = res.data
            }
        },
        created () {
            this.fetchParents()
            this.id && this.fetch()
        }
    }
</script>

<style scoped>

</style>
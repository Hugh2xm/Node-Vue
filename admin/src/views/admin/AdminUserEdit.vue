<template>
    <div class="about">
        <h1>{{id ? '编辑':'新建'}}管理员</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="用户名">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="model.password"></el-input>
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
            }
        },
        methods: {
            // 修改和新建
            async save() {
                if (this.id) {
                    //修改
                    await this.$http.put(`rest/admin_users/${this.id}`, this.model)
                } else {
                    //新建
                    await this.$http.post('rest/admin_users', this.model)
                }
                this.$router.push('/admin_users/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            //修改时显示的数据
            async fetch() {
                const res = await this.$http.get(`rest/admin_users/${this.id}`)
                this.model = res.data
            },

        },
        created () {
            this.id && this.fetch()
        }
    }
</script>

<style scoped>

</style>
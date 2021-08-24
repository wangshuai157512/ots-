<template>
    <div>
       <div class="roleSetting">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="英文名" prop="role">
                    <el-input v-model="form.role" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="enabled">
                    <el-switch v-model="form.enabled" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="可操作其他人创建数据（试题、试卷、考试活动）" prop="dataPermissions">
                    <el-switch v-model="form.dataPermissions" active-value="2" inactive-value="1"></el-switch>
                </el-form-item>
                 <el-form-item label="功能选择" prop="fpIds" class="numSelect">
                    <div class="treeBox">
                        <el-tree 
                            v-model="form.fpIds"
                            :data="coursecheckedList" 
                            :props="defaultProps" 
                            show-checkbox
                            node-key="id"
                            ref="tree"
                            highlight-current
                            @check-change="getCheckedKeys"
                            >
                        </el-tree>
                    </div>
                </el-form-item>
            </el-form>
       </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { checkEnglishName } from "@/common/verify.js"
export default {
    name:"roleSetting",
    data() {
        return {
            saveMethods : '',
            queryCourse:{
                codes:"",
                courseName:""
            },
            coursecheckedList:[], // 可选功能
            form: {
                id:'', // 权限组id
                name: '',
                role:"",
                enabled:"1", // 1-启用 0-停用
                description: '',
                fpIds:[], //权限项id
                dataPermissions: "2", // 数据操作权限 1-本人 2-本人以及其他人
                
                
            },
            rules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                role: [
                    { required: true, message: '请输入英文名', trigger: 'blur' },
                    { validator: checkEnglishName,trigger: 'blur'}
                ],
                enabled: [
                    { required: true, message: '请选择启用状态', trigger: 'change' }
                ],
                dataPermissions: [
                    { required: true, message: '请选择启用状态', trigger: 'change' }
                ],
                fpIds: [
                    { type: 'array', required: true, message: '请至少选择1个功能', trigger: 'change' }
                ]
            },
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        }
    },
    methods: {
        
        getCheckedCourse() {
            this.$api.permission.getFunctionById({pgId:this.form.pgId})
            .then(res=> {
                this.coursecheckedList=res.data.functionPoints
                // this.form.questionCategoryId=res.data.categoryId
                // this.handleCheckedCourse(this.form.questionCategoryItemCodes)
            })
        },
        getCheckedKeys() {
            this.form.fpIds = this.$refs.tree.getCheckedKeys()
            console.log(this.form.fpIds)
            // console.log(this.$refs.tree.getCheckedKeys());
        },
        ...mapMutations(['SAVE_PAGE_THIS']),
        save () {
            this.$refs['form'].validate((valid)=> {
                if(valid) {
                    this.form.fpIds = this.form.fpIds + ""
                    this.$api.permission.savePrivilegeGroup(this.form)
                    .then(res=> {
                        this.form.fpIds = []
                        console.log(res)
                        if(res.status) {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.$router.push({name:'roleData'})
                        }
                    }) 
                }else {
                   console.log('error');
                    return false; 
                }
            })
        },
        goBack() {
            this.$router.go(-1)
        }
    },
    mounted() {
        Object.assign(this.form,this.$route.query)
        this.SAVE_PAGE_THIS(this)
        this.getCheckedCourse()
        if(this.$route.query.fpIds) {
            this.$refs.tree.setCheckedKeys(this.$route.query.fpIds)
        }
        
    }
}
</script>

<style lang="less" scoped>
    /deep/ .el-input__inner{
      width: 240px!important;
      height: 36px!important;
      line-height: 36px!important;
    }
    /deep/ .el-form-item__label {
        font-size: 16px;
        font-weight: 500;
        color: #45494D;
    }
    .roleSetting {
        height: 100%;
        overflow-y: auto;
    }
    .numSelect {
        /deep/ .el-form-item__label {
            width: 100%;
            text-align: left;
        }
    }
    .treeBox {
        /deep/ .el-tree {
           display: flex;
           width: 100%;
           flex-wrap: wrap;
        }
    }
    .treeBox /deep/ .el-tree > div {
        width: 20%;
        margin-right: 13%;
        margin-bottom: 16px;
    }
</style>
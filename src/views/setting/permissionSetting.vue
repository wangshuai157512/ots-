<template>
    <div>
       <div class="permissionSetting">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label="权限组名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="description">
                    <el-input type="textarea" v-model="form.description" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="enabled">
                    <el-switch v-model="form.enabled" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                 <el-form-item label="数据选择" prop="questionCategoryItemCodes" class="numSelect">
                     <div class="courseCheckedCon">
                         <div class="courseCheckedCon-l">
                            <div class="courseChecked">
                                <div class="allSelect">选择</div>
                                <div class="searchCourse">
                                    <el-input v-model="queryCourse.courseName" placeholder="快捷搜索课程" @input="searchEvent">
                                    </el-input>
                                    <div class="searchPos">
                                        <i class="iconfont icon-sousuo"></i>
                                    </div>   
                                </div>
                            </div>
                            <el-checkbox-group v-model="form.questionCategoryItemCodes" @change="handleCheckedCourse">
                                <el-checkbox v-for="item in coursecheckedList" :key="item.code" :label="item.code">{{item.name}}</el-checkbox>
                            </el-checkbox-group> 
                         </div>
                         <div class="courseCheckedCon-r">
                             <div class="allSelect">已选</div>
                             <ul v-if="checkedCourse && checkedCourse.length>0">
                                 <li v-for="item in checkedCourse" :key="item.name"><span>{{item.name}}</span><i class="iconfont icon-shanchu" @click="delectChecked(item)"></i></li>
                             </ul>
                         </div>
                        
                     </div>
                     
                </el-form-item>
            </el-form>
       </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name:"permissionSetting",
    data() {
        return {
            saveMethods : '',
            queryCourse:{
                codes:"",
                courseName:""
            },
            coursecheckedList:[], // 可选课程
            checkedCourse:[], // 已选课程
            form: {
                name: '',
                description: '',
                enabled:"1", // 1-启用 0-停用
                questionCategoryItemCodes: [], // 课程编码
                questionCategoryId:'', //主分类id
                scopeId:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入权限组名称', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                description: [
                    { max: 20, message: '长度在不能超过20', trigger: 'blur' }
                ],
                enabled: [
                    { required: true, message: '请选择启用状态', trigger: 'change' }
                ],
                questionCategoryItemCodes: [
                    { type: 'array', required: true, message: '请至少选择一门课程', trigger: 'change' }
                ]
            },
            searchCourselen:false
        }
    },
    methods: {
        searchEvent() {
            this.clearTimer()
            if(this.queryCourse.courseName && this.queryCourse.courseName.length > 0) {
                this.timer = setTimeout(()=> {
                    this.coursecheckedList=this.searchAllCourseList.filter(item=> {
                        if(item.name.match(this.queryCourse.courseName)) {
                            return item
                        }
                    })
                },500)
            }else {
                this.coursecheckedList= this.searchAllCourseList
            }
        },
        getCheckedCourse() {
            this.$api.permission.getCheckedCourse(this.queryCourse)
            .then(res=> {
                this.coursecheckedList=res.data.items
                this.searchAllCourseList = res.data.items
                this.form.questionCategoryId=res.data.categoryId
                this.handleCheckedCourse(this.form.questionCategoryItemCodes)
            })
        },
        handleCheckedCourse(value) {
            this.checkedCourse= []
            this.coursecheckedList.forEach(item=> {
                if(value.indexOf(item.code) !== -1) {
                    this.checkedCourse.push(item) 
                }
            })
        },
        delectChecked(val) {
            this.checkedCourse = this.checkedCourse.filter(item=> {
                return item.name !== val.name
            })
            this.form.questionCategoryItemCodes = this.form.questionCategoryItemCodes.filter(item=> {
                return item !== val.code
            })
            console.log(this.form.questionCategoryItemCodes)
        },
        ...mapMutations(['SAVE_PAGE_THIS']),
        save () {
            this.$refs['form'].validate((valid)=> {
                if(valid) {
                    this.form.questionCategoryItemCodes = this.form.questionCategoryItemCodes + ""
                    this.$api.permission.saveCourseScope(this.form)
                    .then(res=> {
                        this.form.questionCategoryItemCodes = []
                        console.log(res)
                        if(res.status) {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.$router.push({name:'permissionData'})
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
        },
    },
    mounted() {
        Object.assign(this.form,this.$route.query)
        this.SAVE_PAGE_THIS(this)
        this.getCheckedCourse()
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
    /deep/ .el-checkbox {
        display: block;
        font-size: 14px;
        font-weight: 400;
        color: #45494D;
        width: 100%;
        height: 20px;
        line-height: 20px;
        margin-bottom: 8px;
        margin-top: 0;
    }
    .numSelect {
        /deep/ .el-form-item__label {
            width: 100%;
            text-align: left;
        }
    }
    .courseCheckedCon {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .courseChecked {
            color: #45494D;
            font-size: 16px;
            font-weight: 500;
            display: flex;
            justify-content: space-between;
            width: 100%;
            /deep/.el-checkbox {
                width: 100%;
            }
            .searchCourse {
                position: relative;
                /deep/ .el-input{
                    width: 240px;
                    .el-input__inner {
                        height: 32px!important;
                        line-height: 32px!important;
                        border-radius: 40px!important;
                    }
                }
                .searchPos {
                    width: 40px;
                    height: 18px;
                    line-height: 18px;
                    border-left: 1px solid #E1E6ED;
                    position: absolute;
                    right: 0;
                    top: 12px;
                    color: #C2C6CC;
                    font-size: 14px;
                    i {
                        margin-left: 10px;
                        cursor: pointer;
                    }
                }
                
                
            }
        }
    }
    .courseCheckedCon > div {
        width: 100%;
        background: #F8F9FC;
        padding: 22px 26px;
        box-sizing: border-box;
    }
    .courseCheckedCon > .courseCheckedCon-l {
        margin-right: 16px;
    } 
    .courseCheckedCon-r {
        font-size: 16px;
        font-weight: 500;
        color: #45494D;
        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            font-weight: 400;
            color: #45494D;
            height: 20px;
            line-height: 20px;
            margin-bottom: 8px;
        }
    }
    .allSelect {
        margin-bottom: 28px;
    }
    .courseCheckedCon-l /deep/ .el-checkbox-group,.courseCheckedCon-r ul {
        height: 190px;
        overflow-y: auto;
    }   
</style>
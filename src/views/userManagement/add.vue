<template>
    <div class="userAdd">
        <layout-one>
            <el-form :model="form" ref="form" label-width="80px" :inline="true" :rules="rules">
                <div>
                    <h4 class="sectionTitle">账号信息</h4>
                    <div class="sectionBox">
                        <el-form-item label="用户名" prop="name">
                            <el-input placeholder="请输入" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="用户状态" :required="true">
                            <el-switch v-model="form.form_enabled"></el-switch>
                            <span class="ml10 vm">{{ form.form_enabled ? '启用' : '停用' }}</span>
                        </el-form-item>
                    </div>
                    <div class="sectionBox">
                        <el-form-item label="密码" prop="password">
                            <el-input placeholder="请输入" v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="confirmPassword">
                            <el-input placeholder="请输入" v-model="form.confirmPassword"></el-input>
                        </el-form-item>
                    </div>
                    <div class="sectionBox">
                        <el-form-item label="照片信息">
                            <el-upload
                                action=""
                                class="avatar-uploader dbi"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload"
                                :http-request="uploadImg">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <div class="avatarTip">
                                <p class="mb10">要求：</p>
                                <p class="col_grayQ">1.支持PNG、JPG格式图片；</p>
                                <p class="col_grayQ">2.文件不能大小不能超过60KB；</p>
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <h4 class="sectionTitle">所属机构</h4>
                    <div class="sectionBox">
                        <el-form-item label="机构" prop="form_org">
                            <!-- <el-input v-model="form.organizationRoles" placeholder="请输入"></el-input> -->
                            <!-- <ots-tree :treeData="orgList" ></ots-tree> -->
                            <el-cascader
                                v-model="form.form_org"
                                placeholder="选择机构"
                                :options="orgTreeData"
                                :props="orgProp"
                                filterable
                                change-on-select
                            ></el-cascader>
                        </el-form-item>
                        <el-form-item label="角色" prop="form_roles">
                            <el-select v-model="form.form_roles" multiple placeholder="请选择">
                                <el-option 
                                    v-for="item in rolesList" 
                                    :key="item.id"
                                    :value="item.name"
                                >
                                    {{item.name}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <h4 class="sectionTitle">数据权限</h4>
                    <div class="sectionBox">
                        <el-form-item>
                            <el-radio-group v-model="form.form_courseOrScope">
                                <el-radio-button :label="1">选择数据权限组</el-radio-button>
                                <el-radio-button :label="2">自定义数据权限</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <div class="courseDataBox" v-show="form.form_courseOrScope == 1">
                            <div class="mr10 courseData-l">
                                <div class="topline">
                                    <div class="allSelect">选择</div>
                                    <div class="searchCourse">
                                        <el-input  placeholder="快捷搜索" v-model="courseScopeText"></el-input>
                                        <div class="searchPos">
                                            <i class="iconfont icon-sousuo"></i>
                                        </div>   
                                    </div>
                                </div>
                                <el-checkbox-group v-model="form.form_courseScope" @change="handleCheckedCourseScopeChange">
                                    <template v-for="item in courseScopeCheckedList">
                                        <el-checkbox v-if="item.enabled != 0" :key="item.id" :label="item">{{item.name}}</el-checkbox>
                                    </template>
                                </el-checkbox-group> 
                            </div>
                            <div class="courseData-r">
                                <div class="topline">已选</div>
                                <ul>
                                    <li v-for="item in form.form_courseScope" :key="item.id">
                                        <span>{{item.name}}</span>
                                        <i class="iconfont icon-shanchu cp" @click="deleteItem(item.id)"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="courseDataBox" v-show="form.form_courseOrScope == 2">
                            <div class="mr10 courseData-l">
                                <div class="topline">
                                    <div class="allSelect">选择</div>
                                    <div class="searchCourse">
                                        <el-input  placeholder="快捷搜索" v-model="courseText"></el-input>
                                        <div class="searchPos">
                                            <i class="iconfont icon-sousuo"></i>
                                        </div>   
                                    </div>
                                </div>
                                <el-checkbox-group v-model="form.form_course" @change="handleCheckedCourseChange">
                                    <el-checkbox v-for="item in courseCheckedList" :key="item.code" :label="item">{{item.name}}</el-checkbox>
                                </el-checkbox-group> 
                            </div>
                            <div class="courseData-r">
                                <div class="topline">已选</div>
                                <ul>
                                    <li v-for="item in form.form_course" :key="item.code">
                                        <span>{{item.name}}</span>
                                        <i class="iconfont icon-shanchu cp" @click="deleteItem(item.code)"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 class="sectionTitle">个人信息</h4>
                    <div class="sectionBox">
                        <el-form-item label="姓名" prop="realName">
                            <el-input placeholder="请输入" v-model="form.realName"></el-input>
                        </el-form-item>
                        <el-form-item label="证件号码">
                            <el-input placeholder="请输入" v-model="form.certificateCode"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="form.sex">
                                <el-radio-button :label="1" border>男</el-radio-button>
                                <el-radio-button :label="2" border>女</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div class="sectionBox">
                        <el-form-item label="出生日期">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="移动电话" prop="mobile">
                            <el-input placeholder="请输入" v-model="form.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input placeholder="请输入" v-model="form.email"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <h4 class="sectionTitle">扩展属性</h4>
                    <div class="sectionBox">
                        <!-- <el-form-item label="专业">
                            <el-input placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="分校">
                            <el-input placeholder="请输入"></el-input>
                        </el-form-item> -->
                        <el-form-item v-for="item in extList" :key="item.id" :label="item.displayName">
                            <!-- 输入框 -->
                            <el-input v-if="item.type == 'Text'" placeholder="请输入" v-model="form[item.name]"></el-input>
                            <!-- 选择框 -->
                            <el-select v-if="item.type == 'Enum'" v-model="form[item.name]" placeholder="请选择">
                                <el-option 
                                    v-for="val in item.values" 
                                    :key="val"
                                    :value="val"
                                >
                                    {{val}}
                                </el-option>
                            </el-select>
                            <!-- 多选 -->
                            <el-select v-if="item.type == 'Multi'" v-model="form[item.name]" multiple placeholder="请选择">
                                <el-option 
                                    v-for="val in item.values" 
                                    :key="val"
                                    :value="val"
                                >
                                    {{val}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </layout-one>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { getRoles, gerOrganizations, saveUser, getUserById, getUserExt } from '@/http/modules/userManagement'
import dealTreeData from '@/help/TreeData'
export default {
    name: 'userAdd',
    data () {
        const validatePass = (rule, value, callback) => {
            
            if (value && this.form.confirmPassword !== '') {
                this.$refs.form.validateField('checkPass')
            }   
            callback()
            
        }
        const validatePass2 = (rule, value, callback) => {
            if (value && value !== this.form.password) {
                callback(new Error('两次输入密码不一致'))
            } else {
                callback()
            }
        }
        const isCellPhone = (val) => {
            if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)) {
                return false;
            } else {
                return true;
            }
        }
        const checkPhone = (rule, value, callback) => {
            if (value && !isCellPhone(value)) {
                callback(new Error("请输入正确的手机号！"))
            } else {
                callback()
            }
        }
        return {
            saveMethods: 'addOrEdit',
            backMethods: 'goIndex',
            imageUrl: '',
            form: {
                // 账号信息
                name: '',
                password: '',
                confirmPassword: '',
                form_enabled: true,
                //照片先不预设 上传的时候设置。。。image ext
                // 所属机构
                form_org: '',
                form_roles: [],
                // 数据权限
                form_courseOrScope: 1, // 1为权限组2为课程
                form_courseScope: [],
                form_course: [],
                // 个人信息
                realName: '',
                certificateCode: '',
                sex: 1,
                birthday: '',
                mobile: '',
                email: '',
                // 扩展属性
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur'}
                ],
                confirmPassword: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur'}
                ],
                form_org: [
                    { required: true, message: '请选择机构', trigger: 'change'}
                ],
                form_roles: [
                    { type: 'array', required: true, message: '请选择角色', trigger: 'change'}
                ],
                realName: [
                    { required: true, message: '请输入姓名', trigger: 'blur'},
                    { max: 50, message: '姓名最大为50个字符', trigger: 'blur' }
                ],
                email: [
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                ],
                mobile: [
                    { validator: checkPhone, trigger: 'blur'}
                ]

            },
            // 角色数据
            rolesList: [],
            // 机构树数据
            orgList: [],
            // 权限组
            courseScopeList: [],
            courseList: [],
            courseScopeText: '',
            courseText: '',
            // 扩展属性
            extList: [],
            orgProp: {
                value: 'code',
                label: 'name'
            }
        }
    },
    computed: {
        orgTreeData () {
            return dealTreeData(this.orgList)
        },
        courseCheckedList () {
            // return this.courseList.filter(item => {
            //     if ()
            // })
            if (this.courseText) {
                return this.courseList.filter(item => item.name.match(this.courseText))
            } else {
                return this.courseList
            }
        },
        courseScopeCheckedList () {
            
            if (this.courseScopeText) {
                return this.courseScopeList.filter(item => item.name.match(this.courseScopeText))
            } else {
                return this.courseScopeList
            }
        }
    },
    created () {
       this.initData() 
    },
    methods: {
        ...mapMutations(['SAVE_PAGE_THIS']),
        async initData () {
            const { data: roleData } = await getRoles()
            this.rolesList = roleData.roles
            const { data: orgData} = await gerOrganizations()
            this.orgList = orgData.items
            this.organizationTypeId = orgData.organizationTypeId
            // 数据权限
            const { data: courseScopeData } = await this.$api.permission.getCourseScopeList({pageSize:100,pageNo:1})
            this.courseScopeList = courseScopeData.courseScopes
            const { data: courseData } = await this.$api.permission.getCheckedCourse()
            this.courseList = courseData.items
            this.form.questionCategoryId = courseData.categoryId
            // 扩展属性
            const { data: extData } = await getUserExt()
            this.extList = extData.searchResult
            this.extList.forEach(item => {
                
                if (item.type == 'Enum' || item.type == 'Multi') {
                    item.values = item.values.split(' ')
                }
                this.$set(this.form, item.name, '')
                
            })
            // 编辑
            if (this.$route.name === 'userEdit') {
                this.isEdit = true
                const userId = this.$route.params.id
                const params = {
                    organizationCode: "00", // 左侧机构code "00"代表全部，点击树发生改变
                    id: userId
                }
                const { data: userData } = await getUserById(params)
                
                // 初始化用户数据
                this.dealEditInfo(userData)
            }
        },
        dealEditInfo (userData) {
            this.form.id = this.$route.params.id
            Object.keys(this.form).forEach(item => {
                if (userData[item] && item != 'password') {
                    if (item.startsWith('attr') && userData[item].indexOf(',') > 0 && Array.isArray(this.form[item])) {
                            this.form[item] = userData[item].split(',')
                        
                    } else {
                        this.form[item] = userData[item]
                    }
                }
            })
            // 用户图片
            this.imageUrl = userData.userFaceImage || ''
            // 数据权限
            let courseData = userData.categoryItems
            courseData.forEach(item => {
                this.courseList.forEach(aa => {
                    if (aa.code == item.categoryItemCode) {
                        this.form.form_course.push(aa)
                    }
                })
            })
            let courseScopeData = userData.courseScopes
            courseScopeData.forEach(item => {
                this.courseScopeList.forEach(aa => {
                    if (aa.id == item.scopeId ) {
                        this.form.form_courseScope.push(aa)
                    }
                })
            })
            // 处理机构 角色
            let orgData = userData.organizationRoles[0]
            this.form.form_org = orgData.organizationCode
            orgData.roles.forEach(item => {
                this.form.form_roles.push(item.roleName)
            })
            // 启用停用
            this.form.form_enabled = userData.enabled == 1 ? true : false
            // 密码不用校验了
            this.rules.password[0].required = false 
            this.rules.confirmPassword[0].required = false
        },
        addOrEdit () {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    console.log(this.form)
                    const params = this.dealParams()
                    console.log(params)
                    // 提交接口
                    const { data } = await saveUser(params)
                    if (!JSON.parse(data.succeeded)) {
                        this.$message.error(data.errorMsg)
                    } else {
                        this.$otsPopPro({
                            content: this.isEdit ? '修改成功' :'添加成功',
                            cancelName: '返回人员管理',
                            okName: '查看'
                        }).then(() => {
                            // this.reset()
                            this.goCheck(data.id)
                        }).catch(() => {
                            this.goIndex()
                        })
                    }
                } else {
                    return false;
                }
            })
        },
        dealParams () {
            let formData = this.form
            let params = {...formData}
            for (let key in params) {
                if (key.startsWith('form_')) {
                    delete params[key]
                }
                if (key.startsWith('attr') && Array.isArray(params[key])) {
                    params[key] = params[key].join(',')
                }
            }
            // 用户状态
            params.enabled = formData.form_enabled ? 1 : 0
            // 数据权限
            let courseScopeIdList = []
            formData.form_courseScope.forEach(item => {
                courseScopeIdList.push(item.id)
            })
            params.scopeId = courseScopeIdList.join()
            let courseCodeList = []
            formData.form_course.forEach(item => {
                courseCodeList.push(item.code)
            })
            params.questionCategoryItemCodes = courseCodeList.join()
            // 机构角色
            let organizationRoles = {}
            organizationRoles.organizationRoles = []
            //--------处理数据结构---------start----------------------------
            let orgData = {}
            let orgCode = Array.isArray(formData.form_org) ? formData.form_org[formData.form_org.length - 1] : formData.form_org
            let orgInfo = this.orgList.filter(item => item.code == orgCode)[0]
            orgData.organizationName = orgInfo.name 
            orgData.organizationCode = orgInfo.code
            let roleInfo = this.rolesList.filter(item => {
                return this.form.form_roles.includes(item.name)
            })
            let roles = []
            roleInfo.forEach(item => {
                let role = {}
                role.roleId = item.id
                role.role = item.role
                role.roleName = item.name
                roles.push(role)
            })
            orgData.roles = roles
            orgData.organizationTypeId = this.organizationTypeId
            //--------处理数据结构----------end------------------------------
            organizationRoles.organizationRoles.push(orgData)
            params.organizationRoles = JSON.stringify(organizationRoles)
            // 扩展属性
            return params
        },
        reset () {
            this.form = {
                // 账号信息
                name: '',
                password: '',
                confirmPassword: '',
                form_enabled: true,
                image: '',
                ext: '',
                // 所属机构
                form_org: '',
                form_roles: [],
                // 数据权限
                // 个人信息
                realName: '',
                certificateCode: '',
                sex: '1',
                birthday: '',
                mobile: '',
                email: '',
                // 扩展属性
            }
            this.imageUrl = ''
        },
        goCheck (id) {
            this.$router.push({
                name: 'userCheck',
                params: {
                    id
                }
            })
        },
        goIndex () {
            this.$router.push({
                name: 'userManagement'
            })
        },
        beforeAvatarUpload(file) {
            const pettern = /^image/
            const isImg = pettern.test(file.type)
            const isLimit = file.size / 1024  < 60

            if (!isImg) {
            this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLimit) {
            this.$message.error('上传头像图片大小不能超过 60KB!')
            }
            return isImg && isLimit
        },
        uploadImg (data) {
            // console.log(val)
            let that = this
            let fileData = data.file
            let reader = new FileReader()
            reader.readAsDataURL(fileData)
            reader.onload = function(e) {
                // console.log(e); //查看对象
                // console.log(this.result);//要的数据 这里的this指向FileReader（）对象的实例reader
                if(this.result){
                    that.imageUrl = this.result
                    that.form.image = this.result.split(',')[1]
                    if(fileData.type){
                        that.form.ext = fileData.type.split('/')[1];
                    }
                }
                   
            }
        },
        handleCheckedCourseScopeChange (val) {
            console.log(this.form.form_courseScope)
        },
        handleCheckedCourseChange () {

        },
        deleteItem (id) {
            if (this.form.form_courseOrScope == 1) {
                this.form.form_courseScope = this.form.form_courseScope.filter(item => item.id != id)
            }
            if (this.form.form_courseOrScope == 2) {
                this.form.form_course = this.form.form_course.filter(item => item.code != id)
            }
        }
    },
    mounted () {
        this.SAVE_PAGE_THIS(this)
    },
}
</script>
<style lang="less" scoped>
    .sectionTitle {
        margin-bottom: 30px;
    }
    .sectionBox {
        margin-bottom: 15px;
    }
    .avatar-uploader /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;
    }
    .avatar-uploader /deep/ .el-upload:hover {
        border-color: #006AFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        position: absolute;
        top: 0%;
        left: 0%;
    }
    .avatar-uploader /deep/ .el-upload:hover .avatar-uploader-icon {
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 3;
    }
    .avatar /deep/{
        width: 178px;
        height: 178px;
        position: absolute;
        top: 0%;
        left: 0%;
        z-index: 2;
    }
    .courseDataBox{
        display: flex;
        >div{
            width: 100%;
            background-color: #F8F9FC;
            border-radius: 8px;
            padding: 15px;
        }
        .courseData-l {
            .topline {
                display: flex;
                justify-content: space-between;
                align-items: center;
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
                        top: 8px;
                        color: #C2C6CC;
                        font-size: 14px;
                        i {
                            margin-left: 10px;
                            cursor: pointer;
                        }
                    }
                }
            }
            /deep/ .el-checkbox-group {
                height: 300px;
                overflow-y: auto;
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
        }
        .courseData-r {
            ul {
                height: 300px;
                overflow-y: auto;
                li {
                    margin: 8px 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-right: 15px;
                }
            } 
        }
    }
    /deep/ .el-radio-button__inner {
        margin-right: 16px;
        color: #45494D!important;
        background: #F4F5F8!important;
        font-size: 13px;
        border-radius: 4px!important;
        border: 1px solid #DADDE6!important;
        width: 64px;
        height: 32px;
        line-height: 32px;
        padding: 0;
    }
    /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        background: #EBF5FF!important;
        border: 1px solid #006AFF!important;
        color: #006AFF!important;
        box-shadow:none;
    }
    /deep/ .el-radio-button__inner {
        width: auto;
        padding: 0 16px;
    }
    .avatarTip {
        padding-top: 8px;
        display: inline-block;
        vertical-align: top;
        margin-left: 20px;
        line-height: 1.8;
    }
    .dbi {
        display: inline-block;
    }
</style>

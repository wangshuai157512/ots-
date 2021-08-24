<template>
    <div class="userAdd">
        <layout-one :mainTopBtn="mainTopBtn">
            <el-form :model="form" ref="form" label-width="80px" :inline="true">
                <div>
                    <h4 class="sectionTitle">账号信息</h4>
                    <div class="sectionBox">
                        <el-form-item label="用户名">
                            <span class="info">{{form.name}}</span>
                        </el-form-item>
                        <el-form-item label="用户状态">
                            <span class="info">{{form.enabled == 1 ? '已启用' : '已停用'}}</span>
                        </el-form-item>
                    </div>
                    <div class="sectionBox">
                        <el-form-item label="照片信息">
                            <div v-if="form.userFaceImage" class="avatar">
                                <img  :src="form.userFaceImage" >
                            </div>
                            <span v-else class="info">未上传</span>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <h4 class="sectionTitle">所属机构</h4>
                    <div class="sectionBox">
                        <el-form-item label="机构">
                            <span class="info">{{form.organizationName}}</span>
                        </el-form-item>
                        <el-form-item label="角色">
                            <span class="info">
                                <span v-for="item in form.roles" :key="item" class="mr10">{{`【${item}】`}}</span>
                            </span>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <h4 class="sectionTitle">数据权限</h4>
                    <div class="sectionBox bgChange">
                        <el-form-item>
                            <span class="info" v-for="item in form.courseScopeList" :key="item.scopeId">
                                <span  class="mr10">{{`【${item.scopeName}】`}}</span>
                            </span>
                        </el-form-item>
                        <el-form-item>
                            <span class="info" v-for="item in form.courseList" :key="item.categoryItemCode">
                                <span  class="mr10">{{`${item.categoryItemName}`}}</span>
                            </span>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <h4 class="sectionTitle">个人信息</h4>
                    <div class="sectionBox">
                        <el-form-item label="姓名">
                            <span class="info">{{form.realName}}</span>
                        </el-form-item>
                        <el-form-item label="证件号码">
                            <span class="info">{{form.certificateCode}}</span>
                        </el-form-item>
                        <el-form-item label="性别">
                            <span class="info">{{form.sex == 1 ? '男' : '女'}}</span>
                        </el-form-item>
                    </div>
                    <div class="sectionBox">
                        <el-form-item label="出生日期">
                            <span class="info">{{form.birthday}}</span>
                        </el-form-item>
                        <el-form-item label="移动电话">
                            <span class="info">{{form.mobile}}</span>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <span class="info">{{form.email}}</span>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <h4 class="sectionTitle">扩展属性</h4>
                    <div class="sectionBox">
                        <!-- <el-form-item label="专业">
                            <span class="info"></span>
                        </el-form-item>
                        <el-form-item label="分校">
                            <span class="info"></span>
                        </el-form-item> -->
                        <el-form-item v-for="item in form.extAttrs" :key="item.name" :label="item.display">
                            <span class="info">{{item.value}}</span>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </layout-one>
    </div>
</template>
<script>
import { getUserById } from '@/http/modules/userManagement'
export default {
    name: 'userCheck',
    data () {
        return {
            mainTopBtn: [
                {
                    title: "编辑",
                    plain: true,
                    fn: this.editUser
                }
            ],
            form: {
                name: '',
                enabled: '',
                userFaceImage: '',
                realName: '',
                certificateCode: '',
                sex: '',
                birthday: '',
                mobile: '',
                email: '',
                roles: [],
                organizationName: '',
                // 数据权限
                courseScopeList: [],
                courseList: [],
                // 扩展属性
                extAttrs: [],
            }
        }
    },
    created () {
        this.getUserInfo()
    },
    methods: {
        async getUserInfo () {
            const userId = this.$route.params.id
            const params = {
                organizationCode: "00", // 左侧机构code "00"代表全部，点击树发生改变
                id: userId
            }
            const { data: userData } = await getUserById(params)
            
            Object.keys(this.form).forEach(item => {
                if (userData[item]) {
                    this.form[item] = userData[item]
                }
            })
            // 处理机构 角色
            let orgData = userData.organizationRoles[0]
            orgData.roles.forEach(item => {
                this.form.roles.push(item.roleName)
            })
            this.form.organizationName = orgData.organizationName
            // 数据权限
            this.form.courseScopeList = userData.courseScopes
            this.form.courseList = userData.categoryItems
        },
        editUser () {
            this.$router.push({
                name: 'userEdit',
                params: {
                    id: this.$route.params.id
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.mainCon {
    background-color: #fff;
}
.sectionTitle {
    margin-bottom: 30px;
}
.sectionBox {
    margin-bottom: 15px;
}
.bgChange {
    background-color: #F8F9FC;
    border-radius: 8px;
}
.info {
    display: inline-block;
    min-width: 200px;
    color: #45494D;
}
/deep/ .el-form-item__label {
    color: #9299A6;
}
.avatar{
    width: 116px;
    height: 152px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    img {
        max-width: 100%;
        max-height: 100%;
    }
}
</style>
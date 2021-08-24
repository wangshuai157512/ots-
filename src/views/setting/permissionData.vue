<template>
    <div>
        <ots-main-title></ots-main-title>
        <div class="permissionMain">
            <ots-tree-sider 
                ref="OtsTreeSider" 
                permissionTitle="权限组" 
                @childrenAddPermission="handleAddPermission" 
                :treeData="courseScopeList" 
                :isDisabledGroup="settingPage"
                :isDisabledAddBtn="!settingPage"
                :searchKeyworld="false">
            </ots-tree-sider>
            <div class="permissionMain-r">
                <!-- 查看 -->
                <template v-if="!settingPage">
                    <div class="noData" v-if="courseScopeList && courseScopeList.length<1">
                        暂无数据，可点击左上角“+”按钮进行添加
                    </div>
                    <div v-else>
                        <div class="permissionMain-r-title">
                            <div class="chineseTitle"><span>{{query.name}}</span><el-tag :type="query.enabled?'success':'warning'" size="mini">{{query.enabled?'已启用':'未启用'}}</el-tag></div>
                            <p class="EnglishTitle">{{query.description}}</p>
                        </div>
                        <div class="permissionMain-r-course">
                            <div class="courseTitle">已选课程</div>
                            <ul>
                                <li class="curseList" v-for="item in courseScope" :key="item.code">{{item.name}}</li>
                            </ul>
                        </div>
                    </div>
                    
                </template>
                <!-- 设置 -->
               <template v-else>
                    <router-view></router-view>
                </template>
            </div>
        </div>

    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name:"permissionData",
    components:{

    },
    data() {
        return {
           courseScopeList:[],
           courseScope:[], //已选课程
           query:{
                scopeId:"", //课程范围id
                questionCategoryItemCodes:[], // 已选课程编码
                enabled:null,// 启用状态
                name:'',
                description:'', 
           },
           settingPage:false,
        }
    },
    methods:{
        ...mapMutations(['SAVE_PAGE_THIS']),
        // 获取权限组
        getCourseScopeList() {
            this.$api.permission.getCourseScopeList({fulltext:'',pageSize:100,pageNo:1}).then(res=> {
                if(res.status === 1 && res.data.courseScopes.length > 0) {
                    this.courseScopeList = res.data.courseScopes
                    this.courseScopeList.forEach((item) => {
                        item.permissionOperateBtn = [
                            {
                                title: item.enabled? "停用" : "启用",
                                icon: item.enabled? "iconfont icon-tingyong" : "iconfont icon-kaiqi",
                                click: this.editState,
                            },
                            {
                                title: "编辑",
                                icon: "iconfont icon-bianji",
                                click: this.edited,
                            },
                            {
                                title: "删除",
                                icon: "iconfont icon-shanchu",
                                isHide:item.userNum,
                                click: this.delete,
                            },
                        ];
                    });
                    if(this.query.scopeId) {
                        this.getSelectItem(this.query.scopeId)
                    }else {
                        this.$nextTick(() => {
                            const firstNode = document.querySelector('.el-tree-node')
                            firstNode.click();
                        })
                    }
                    
                }
            })
        },
        // 获取已选课程
        getSelectItem(data) {
            if(this.$route.name !== 'permissionData') {
                this.$router.push({name:'permissionData'})
            }
            if(data.id) {
               this.query.scopeId = data.id 
            }
            this.$api.permission.getCourseScope({scopeId:this.query.scopeId}).then(res=> {
                if(res.status) {
                    let {enabled,name,description} = res.data
                    this.query.enabled = enabled
                    this.query.name = name
                    this.query.description = description
                    this.courseScope = res.data.items
                    this.treeItemactiveBgd();
                    if(this.edit === "edit") {
                        this.pushEdit()
                    }
                } 
            })
            
        },
        
        handleAddPermission() {
            if(this.settingPage) return
            this.query.scopeId = ''
            this.settingPage = true
            this.$router.push({path:'/permissionData/permissionSetting'})
        },

        operateCourseScope(operateType) {
            let queryOperateCourse = {
                scopeId:this.query.scopeId,
                operateType:operateType,
            }
            this.$api.permission.operateCourseScope(queryOperateCourse)
            .then(res=> {
                if(res.status) {
                    if(res.status) {
                        this.$message({
                            message: operateType==1?"删除成功":"修改成功",
                            type: 'success'
                        });
                        if(operateType === 1) {
                            this.query.scopeId = ""
                        }
                        this.getCourseScopeList()
                    }
                }
            })
        },

        treeItemactiveBgd() {
            let currentIndex = this.courseScopeList.findIndex(item => item.id === this.query.scopeId )
            let treeItemNodes = document.querySelectorAll('.permissionMain .el-tree .el-tree-node')
            treeItemNodes = [].slice.call(treeItemNodes)
            treeItemNodes.forEach(item => {
                item.classList.remove('is-current')
            })
            treeItemNodes[currentIndex].classList.add('is-current')
        },

        editState(data) {
            let {id,enabled} = data
            this.operateType = null
            if(enabled) {
                this.operateType = 3
            }else {
                 this.operateType = 2
            }
            this.query.scopeId = id
            this.operateCourseScope(this.operateType)
            this.treeItemactiveBgd()
        },
        edited(data) {
            let {id} = data
            this.edit = "edit"
            this.query.scopeId = id
            this.getSelectItem(this.query.scopeId)
          
            
        },
        pushEdit() {
            this.query.questionCategoryItemCodes=[]
            this.courseScope.forEach(item=> {
                this.query.questionCategoryItemCodes.push(item.code)
            })
            this.$router.push({
                path:"/permissionData/permissionSetting",
                query:this.query
            })
            this.settingPage = true
            this.treeItemactiveBgd()
            this.edit = ""
        },

        delete(data) {
            let {id,userNum} = data
            if(userNum > 0) {
                this.$message({
                    message: '此用户不能删除',
                    type: 'warning'
                });
                return
            }
            this.operateType = 1
            this.query.scopeId = id
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.operateCourseScope(this.operateType)
            }) 
        }
    },
    mounted() {
        this.getCourseScopeList()
        if(this.$route.path === '/permissionData/permissionSetting') {
            this.settingPage = true
        }
    },
    watch:{
        $route:function() {
            if (this.$route.name === 'permissionData') {
                this.getCourseScopeList()
                this.settingPage = false
            }
        }
        
    }
}
</script>

<style lang="less" scoped>
    .permissionMain {
        width: 100%;
        height: calc(100% - 60px);
        display: flex;
        .permissionMain-r {
            flex: 1;
            background: #fff;
            padding: 25px 32px;
            box-sizing: border-box;
            text-align: left;
            .noData {
                color: #45494D;
                font-size: 14px;
                margin-top: 20%;
                text-align: center;
            }
            .chineseTitle {
                color: #45494D;
                font-size: 14px;
                font-weight: 600;
                span {
                    margin-right: 8px;
                } 
            }
            .EnglishTitle {
                color: #9299A6;
                font-size: 13px;
                margin: 8px 0 32px 0;
            }
            .courseTitle {
                color: #45494D;
                font-size: 14px;
                font-weight: 600;
                margin-bottom: 16px;
            }
            .curseList {
                color: #45494D;
                font-size: 14px;
                margin-bottom: 16px;
                width: 33.33%;
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
    .permissionMain-r > div {
        height: 100%;
        overflow: hidden;
    }
    .permissionMain-r-course {
        height: 100%;
        overflow-y: auto;
        ul {
            height: calc(100% - 112px);
            overflow-y: auto;  
        }
    }
</style>
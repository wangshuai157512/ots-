<template>
    <div>
        <template v-if="isIndex">
            <ots-main-title :mainTopBtn="mainTopBtnList" :mainSearch="true" @searchFn="handleSearch"></ots-main-title>
            <div class="userTop">
                <ots-search-line title="角色" :options="searchData.role.options"  @changeOption="changeOptions" />
                <ots-search-line title="状态" :options="searchData.status.options" @changeOption="changeOptions" />
                <ots-search-line title="照片" :options="searchData.image.options" @changeOption="changeOptions"/>
                <ots-search-ext :extList="extList" @changeOption="changeOptions"/>
            </div>
            <div class="userBox">
                <ots-tree-sider
                    ref="OtsTreeSider"
                    permissionTitle="机构组"
                    :treeData="orgList"
                    :isDisabledGroup="false"
                    :isDisabledAddBtn="false"
                ></ots-tree-sider>
                <div class="userBox-r">
                    <ots-table-group
                        :tableHeader="tableHeader"
                        :tableData="tableData"
                        :tableOption="tableOption"
                        :batchOperBtn="batchOperBtn"
                        @handleSelectionChange="bachOper"
                        :pagination="pagination"
                        @changeNum="changeNum" 
                        @changePage="changePage">
                    </ots-table-group>
                </div>
            </div>
            <ots-custom-dialog :dialog.sync="subdivisionDialog" :title="form.code?'修改机构':'添加子部门'" width="40%">
                <template v-slot:content>
                    <div class="subdivisionDialog">
                        <el-form ref="form" :model="form" :rules="rules">
                            <el-form-item label="子部门名称" class="childrenName" prop="name">
                                <el-input v-model="form.name" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
                <template v-slot:footer>
                    <el-button round @click="subdivisionDialog=false">取消</el-button>
                    <el-button round type="primary" @click="addSubdivision">确定</el-button>
                </template>
            </ots-custom-dialog>
            <ots-custom-dialog :dialog.sync="exportDialog" title="导出用户">
                <template v-slot:content>
                    <div class="exportDialog">
                        <el-form ref="exportForm" :model="exportForm">
                            <el-form-item label="导出范围">
                                <el-radio-group v-model="exportForm.checkNum">
                                    <el-radio-button label=1>选中的数据</el-radio-button>
                                    <el-radio-button label=2>查询结果</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                        <div class="impExplain">
                            <span class="tipTitle"><i></i>提示：</span>
                            <div>导出范围选为选中的数据时，将导出选中的用户信息数据。导出范围选为查询结果时，将导出全部查询结果的用户信息数据，导出较慢，请耐心等待</div>
                        </div>
                    </div>
                </template>
                <template v-slot:footer>
                    <el-button round @click="exportDialog=false">取消</el-button>
                    <el-button round type="primary" @click="rightexport">确定</el-button>
                </template>
            </ots-custom-dialog>
            <ots-custom-dialog :dialog.sync="importDialog" title="人员导入">
                <template v-slot:content>
                    <div class="exportDialog">
                        <el-form ref="exportForm" :model="importForm">
                            <el-form-item label="1.模板下载">
                                <span style="color:#006AFF;" @click="$getStaticFile('人员导入数据模板.xlsx')" class="cp">
                                    <i class="el-icon-download"></i>
                                    下载人员导入数据模板
                                </span>
                            </el-form-item>
                            <el-form-item label="2.用户名相同处理方式">
                                <el-radio-group v-model="importForm.sameNameOperate">
                                    <el-radio-button label=0>不导入</el-radio-button>
                                    <el-radio-button label=1>替换已有的用户信息</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="3.导入文件" v-model="importForm.Filedata">
                                <ots-upload-file :httpRequest="handleFormData" fileType="xlsx" />
                            </el-form-item>
                            
                        </el-form>
                        <div class="impExplain">
                            <span class="tipTitle"><i></i>提示：</span>
                            <div>
                                <div>1：模板中<span class="col_red">*</span>字段为必填项</div>
                                <div>2：只能上传扩展名为<span class="col_red">.xlsx</span>的文件；</div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:footer>
                    <el-button round @click="importDialog=false">取消</el-button>
                    <el-button round type="primary" @click="rightImport">导入</el-button>
                </template>
            </ots-custom-dialog>
            <ots-custom-dialog :dialog.sync="upLoadImgDialog" title="照片上传">
                <template v-slot:content>
                    <div class="exportDialog">
                        <el-form>
                            <el-form-item label="请选择照片信息文件" v-model="upLoadImgForm.Filedata">
                                <ots-upload-file ref="importImg" :httpRequest="handleImgFormData" fileType="zip"/>
                            </el-form-item>
                        </el-form>
                        <!-- <el-progress :stroke-width="3" :percentage="5"></el-progress> -->
                        <div class="impExplain">
                            <span class="tipTitle"><i></i>提示：</span>
                            <div>
                                <div>1：只能上传扩展名为<span class="col_red">.zip</span>的文件；</div>
                                <div>2：文件大小不能超过<span class="col_red">10M</span>；</div>
                                <div>3：文件名不能是中文；</div>
                                <div>4：压缩包内不能有文件夹；</div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:footer>
                    <el-button round @click="upLoadImgDialog=false">取消</el-button>
                    <el-button round type="primary" @click="submitUploadImg">导入</el-button>
                </template>
            </ots-custom-dialog>
            <ots-custom-dialog :dialog.sync="changeOrgDialog" title="调整机构">
                <template v-slot:content>
                    <div class="exportDialog">
                        <el-form ref="changeOrgForm" :model="changeOrgForm">
                            <el-form-item label="修改范围">
                                <el-radio-group v-model="changeOrgForm.form_checkNum">
                                    <el-radio-button :label='1'>选中的数据</el-radio-button>
                                    <el-radio-button :label='2'>查询结果</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="选择机构">
                                <el-cascader
                                v-model="changeOrgForm.form_org"
                                placeholder="选择机构"
                                :options="orgList"
                                :props="orgProp"
                                filterable
                                change-on-select
                            ></el-cascader>
                            </el-form-item>
                        </el-form>
                        <div class="impExplain">
                            <span class="tipTitle"><i></i>提示：</span>
                            <div>修改范围选为选中的数据时，将调整选中的用户信息数据。修改范围选为查询结果时，将调整全部查询结果的用户信息数据</div>
                        </div>
                    </div>
                </template>
                <template v-slot:footer>
                    <el-button round @click="changeOrgDialog=false">取消</el-button>
                    <el-button round type="primary" @click="rightChangeOrg">确定</el-button>
                </template>
            </ots-custom-dialog>
        </template>
        <template v-else>
            <router-view></router-view>
        </template>
        
    </div>
</template>

<script>
import { 
    getOrgTree, 
    getLevelType, 
    saveOrg, 
    editOrg, 
    removeOrg, 
    getUserListByOrg, 
    operateUser,
    exportUser,
    changeUserOrg,
    getUserExt,
    getRoles,
    importUser,
    uploadUserImg,
    importUserImg,
} from '@/http/modules/userManagement'
import OtsTable from '@/package/OtsTable/OtsTable.vue'
import OtsSearchLine from '@/package/OtsSearchLine/OtsSearchLine.vue'
import OtsSearchExt from '@/package/OtsSearchExt/OtsSearchExt.vue'
import OtsUploadFile from '@/package/OtsUploadFile/OtsUploadFile.vue'
export default {
  components: { OtsTable, OtsSearchLine, OtsSearchExt, OtsUploadFile },
    name:"userManagement",
    data() {
        return {
            orgList:[], //机构数
            subdivisionDialog: false, //子部门
            form:{
                name:"",
                organizationTypeId:null,
                code:"",
                levelTypeId:"",
                parentCode: "",
                contacts: "",
                mobile: "",
                telephone: "",
                email: "",
                province: "",
                city: "",
                county: "",
                address: "",
                zipCode: "",
                comment: "",
            },
            rules:{
                name:[
                    {required:true,message:"请输入机构名称",trigger:"blur"},
                    { min: 1, max: 20, message: '输入范围在 1 到 20 个字符', trigger: 'blur' }
                ]
            },
            mainTopBtnList:[
                {
                    title: "导入",
                    plain: true,
                    fn: this.importUser
                },
                {
                    title:"新增",
                    fn: this.addUser
                },
            ],
             defaultProps: {
                children: 'children',
                label: 'name'
            },
            queryTable:{
                organizationTypeId:"",
                organizationCode:"",
                name:"",
                status: '2',
                roleId:"",
                pageSize:10,
                pageNo:1,
            },
            tableHeader:[
                {
                    title:"姓名",
                    prop:"realName"
                },
                {
                    title:"用户名",
                    prop:"name"
                },
                {
                    title:"角色",
                    prop:"roleName"
                },
                {
                    title:"照片",
                    prop:"imageStatus",
                    formatter: (val) => val.row.imageStatus == 1 ? '已上传' : '未上传'
                },
                {
                    title:"启用状态",
                    prop:"enabled",
                    type:"switch",
                    switchChange:this.userState
                },
                {
                    title:"操作",
                    type:"buttons",
                    width:"140",
                    btnList:[
                        {
                            title:"查看",
                            click:this.checkUser
                        },
                        {
                            title:"编辑",
                            click:this.editUser
                        },
                        {
                            title:"删除",
                            click:this.deletUser
                        },
                    ]
                }
                
            ],
            tableData: [],
            tableOption:{
                multiple:true
            },
            batchOperBtn:[
                {
                    title: "批量启用",
                    icon: "iconfont icon-kaiqi",
                    click: this.batchStart
                },
                {
                    title: "批量停用",
                    icon: "iconfont icon-tingyong",
                    click: this.batchStop
                },
                {
                    title: "导出",
                    icon: "iconfont icon-daochu",
                    click: this.exportUser
                },
                {
                    title: "调整机构",
                    icon: "iconfont icon-shezhi1",
                    click: this.setMeach
                },
                {
                    title: "批量删除",
                    icon: "iconfont icon-shanchu",
                    click: this.setDelet
                },
                {
                    title: "照片上传",
                    icon: "iconfont icon-shangchuan",
                    click: this.uploadUserImg
                },
            ],
            queryOper: {
                ids:'',
                operateType:null,
            },
            exportDialog:false,
            exportForm:{
                checkNum: 1,
            },
            queryexportForm:{
                exportIds:"",
                organizationTypeId:"1",
                organizationCode:"",
                organizationCode:"",
                name:"",
                roleId:"",
            },
            importDialog: false,
            importForm: {
                createUserType: 3,//写死了 导入密码
                sameNameOperate: 0,
                Filedata: ''
            },
            upLoadImgDialog: false,
            upLoadImgForm: {
                Filedata: ''
            },
            changeOrgDialog: false,
            changeOrgForm: {
                form_org: '',
                form_checkNum:"1",
                changeOrganizationTypeId: '1',
                changeOrganizationCode: '',
                organizationTypeId: '1',
                organizationCode: '00',
                status: 2
            },
            orgProp: {
                value: 'code',
                label: 'name'
            },
            searchData: {
                // 角色
                role: {
                    options: []
                },
                // 状态
                status: {
                    options: [
                        {
                            name: '全部',
                            attrValue: '2',
                            attr: 'status',
                        },
                        {
                            name: '已启用',
                            attrValue: '1',
                            attr: 'status',
                        },
                        {
                            name: '已停用',
                            attrValue: '0',
                            attr: 'status',
                        }
                    ]
                },
                // 照片
                image: {
                    options: [
                        {
                            name: '全部',
                            attrValue: '',
                            attr: 'imageStatus',
                        },
                        {
                            name: '已上传',
                            attrValue: '1',
                            attr: 'imageStatus',
                        },
                        {
                            name: '未上传',
                            attrValue: '0',
                            attr: 'imageStatus',
                        }
                    ]
                }
            },
            extList: [],
            pagination:{
                total:0
            }
        }
    },
    computed: {
        isIndex () {
            return this.$route.name == 'userManagement'
        }, 
        // orgTreeData () {
        //     return dealTreeData(this.orgList)
        // }
        
    },
    deactivated () {
        console.log('upddd')
    },
    methods: {
        changeOptions (val) {

            if (Array.isArray(val)) { // 扩展属性
                for (let key in this.queryTable) {
                    if (key.startsWith('attr')) {
                        delete this.queryTable[key]
                    }
                }
                for (let item of val) {
                    this.queryTable[item.attr] = item.attrValue
                }
            } else { //普通
                const { attr, attrValue} = val
                this.queryTable[attr] = attrValue
                // Object.assign(this.queryTable, {attr: attrValue})
            }
            this.getTableList()
        },
        addUser () {
            this.$router.push({
                name: 'userAdd'
            })
        },
        checkUser (row) {
            // console.dir(row)
            this.$router.push({
                name: 'userCheck',
                params: {
                    id: row.id
                }
            })
        },
        editUser (row) {
            this.$router.push({
                name: 'userEdit',
                params: {
                    id: row.id
                }
            })
        },
        async rightChangeOrg () {
            if (this.changeOrgForm.form_checkNum == 1) {
                if (!this.multiCheck()) {
                    return
                }
                this.changeOrgForm.changeIds = this.queryOper.ids
            } else {}// 选查询结果什么也不需要做
            
            if (!this.changeOrgForm.form_org) {
                this.$message.error('请选择机构')
                return
            }
            let params = {...this.changeOrgForm}
            params.changeOrganizationCode = Array.isArray(params.form_org) ? params.form_org[params.form_org.length - 1] : params.form_org
            for (let key in params) {
                if (key.startsWith('form_')) {
                    delete params[key]
                }
            }
            // 提交接口
            const { data } = await changeUserOrg(params)
            if (data.succeeded) {
                this.$message.success('修改成功')
                this.changeOrgDialog = false
                this.getTableList()
            }
        },
        addSetting (orgList) {
            orgList.forEach(item=> {
                item.permissionOperateBtn = [
                    {
                        title: "添加子部门",
                        icon: "iconfont icon-tianjia",
                        click: this.addChildren
                    },
                    {
                        title: "编辑",
                        icon: "iconfont icon-bianji",
                        isHide:item.level ===1,
                        click: this.edited
                    },
                    {
                        title: "删除",
                        icon: "iconfont icon-shanchu",
                        isHide:item.level ===1,
                        click: this.delete
                    },
                ]
                if(item.children && item.children.length > 0) {
                    this.addSetting(item.children)
                }
            })
        },
        async initData() {
            // 获取用户扩展属性
            const { data: extData } = await getUserExt()
            this.extList = extData.searchResult
            // 获取用户角色
            const { data: roleData } = await getRoles()
            let roleList = roleData.roles.map(item => {
                let obj = { attrValue: item.id, name: item.name }
                return Object.assign({ attr: 'roleId'}, obj)
            })
            roleList.unshift({
                attr: 'roleId',
                name: '全部',
                attrValue: ''
            })
            this.searchData.role.options = roleList
            
            const { data } = await getOrgTree()
            this.orgList = data.organizations
            this.addSetting(this.orgList)
            this.$nextTick(() => {
                const firstNode = document.querySelector('.el-tree-node')
                firstNode.click();
            })
        },
        async addChildren(dataTree) {
            this.form={
                name:"",
                enabled:1,
                organizationTypeId:null,
                code:"",
                levelTypeId:"",
                parentCode: "",
                contacts: "",
                mobile: "",
                telephone: "",
                email: "",
                province: "",
                city: "",
                county: "",
                address: "",
                zipCode: "",
                comment: "",
            }
            
            let {level,code,organizationTypeId} = dataTree
            const { data:{levelTypes} } = await getLevelType({level})
            if(!levelTypes || levelTypes.length<1) {
                 this.$message({
                    message: '该机构下不允许添加子机构',
                    type: 'warning'
                 });
                 return
            }else {
                this.subdivisionDialog = true
                this.form.organizationTypeId = organizationTypeId
                this.form.levelTypeId = level
                this.form.parentCode = code
            }
            setTimeout(()=>{
                this.$refs['form'].resetFields();
            })
            
            
        },
        async addSubdivision() {
            this.$refs['form'].validate( async valid=> {
                if(valid) {
                    const {data,status} = await saveOrg(this.form)
                    
                    if (data.succeeded) {
                        this.$message({
                            message:this.form.code?'修改成功':'添加成功',
                            type: 'success'
                        });
                        this.initData()
                        this.subdivisionDialog = false
                    } else {
                        this.$message.error(data.errorMsg);
                    }
                    
                }else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        async edited(dataTree) {
            let {name,enabled,level,code,organizationTypeId} = dataTree
            this.form.name = name
            this.form.enabled = enabled
            this.form.organizationTypeId = organizationTypeId
            this.form.levelTypeId = level
            this.form.parentCode = code
            this.form.code=code
            this.subdivisionDialog = true
            let queryEdit = {organizationTypeId,code}
            const {data} = await editOrg(queryEdit)
            
        },
        async delete(dataTree) {
            let {code,organizationTypeId} = dataTree
            let queryRemove = {
                organizationTypeId,
                codes:code,
                operateType:1
            }
            const {data:{succeeded,errorMsg}} = await removeOrg(queryRemove)
            if(!succeeded) {
                this.$message.error(errorMsg);
                return
            }
            this.initData()
        },
        async getTableList() {
            const {data:{users,total}} = await getUserListByOrg(this.queryTable)
            this.tableData = users
            this.pagination.total = total
        },
        getSelectItem(dataTree) {
            let {organizationTypeId,code} = dataTree
            this.queryTable.organizationTypeId = organizationTypeId
            this.queryTable.organizationCode = code
            this.getTableList()  
        },
        async userState(row) {
            
            if(row) {
               this.queryOper.ids = row.id
               this.queryOper.operateType = row.enabled ? 2 : 3 
            }
            const { data }= await operateUser(this.queryOper)
            this.getTableList() 

        },
        changeNum(num) {
            this.queryTable.pageSize=num
            this.getTableList()
        },
        changePage(p) {
            this.queryTable.pageNo=p
            this.getTableList()
        },
        deletUser(row) {
            this.$confirm('确定要删除人员吗？', '删除人员', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                if(row) {
                    this.queryOper.ids= row.id
                }
                this.queryOper.operateType = 1
                const {data}= await operateUser(this.queryOper)
                if(data.succeeded) {
                    this.getTableList() 
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }   
            })        
            
        },
        bachOper(val) {
            let idList=[]
            val.forEach(item=>{
                idList.push(item.id)
            })
            this.queryOper.ids = idList + ''
            this.queryexportForm.exportIds = idList + ''
        },
        batchStart() {
            if (this.multiCheck()) {
                this.queryOper.operateType = 2
                this.userState()
            }
        },
        batchStop() {
            if (this.multiCheck()) {
                this.queryOper.operateType = 3
                this.userState()
            }
        },
        exportUser() {
            this.exportDialog = true
        },
        setMeach() {
            this.changeOrgDialog = true
        },
        setDelet() {
            if (this.multiCheck()) {
                this.deletUser()
            }
        },
        multiCheck () {
            if (!this.queryOper.ids) {
                this.$message.error('请选择用户');
                return false
            }
            return true
        },
        async rightexport() {
            if(!this.queryexportForm.exportIds && this.exportForm.checkNum == '1') {
                this.exportDialog = false
                this.$message.error('请选择用户');
                return
            }
            if(this.exportForm.checkNum == '2') {
                this.queryexportForm.exportIds = ''
            }
            const res = await exportUser(this.queryexportForm)
            
            let url = window.URL.createObjectURL(res); 
            // 生成一个a标签
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;   
            document.body.appendChild(link);
            link.click();
            this.exportDialog = false
        },
        importUser () {
            this.importDialog = true
        },
        async rightImport () {
            if (!this.importForm.Filedata) {
                this.$message.error('请选择文件')
                return
            }
            const fd = new FormData()
            for (let item in this.importForm) {
                fd.append(item,this.importForm[item])
            }
            const { data } = await importUser(fd)
            if (data) {
                const failNum = data.failNum ? data.failNum : 0
                const successNum = data.successNum ? data.successNum : 0
                const totalNum = failNum + successNum
                let message = `应导入人员数${totalNum}，成功导入${successNum}，失败人员数${failNum}`
                this.importDialog = false
                this.$alert(message, '导入结果', {
                    confirmButtonText: failNum > 0 ? '查看错误记录' :'确定',
                    type: failNum > 0 ? 'warning' :'success'
                }).then(async () => {
                    if (failNum > 0) {
                        window.location.href = data.failMessage
                    }
                })
                this.getTableList()

            }
        },
        uploadUserImg () {
            this.upLoadImgDialog = true
        },
        handleSearch (val) {
            this.queryTable.name = val
            this.getTableList()
        },
        beforeUpload (file) {
            const isZip = file.type.indexOf('zip') > -1
            const isLimit = Math.floor(file.size / 1024 / 1024)  < 10

            if (!isZip) {
                this.$message.error('只能上传zip文件!')
            } else if (!isLimit) {
                this.$message.error('上传头像图片大小不能超过 10M!')
            }
            return isZip && isLimit
        },
        handleFormData (val) {
            
            this.importForm.Filedata = val.file
        },
        handleImgFormData (val) {
            this.upLoadImgForm.Filedata = val.file
        },
        async submitUploadImg () {
            if (!this.upLoadImgForm.Filedata) {
                this.$message.error('请选择文件')
                return
            }
            let param = {
                multiple: true,
                fileType: 4,
                fileName: this.upLoadImgForm.Filedata.name,
                Filedata: this.upLoadImgForm.Filedata
            }
            const fd = new FormData()
            for (let item in param) {
                fd.append(item, param[item])
            }
            const { data } = await uploadUserImg(fd)
            const fileId = data.result[0].id
            const { data: importResult } = await importUserImg({fileIds: fileId})
            if (importResult) {
                this.upLoadImgDialog = false
                let successCnt = importResult.importCnt - importResult.errCnt
                let message = `共有照片${importResult.importCnt}张，成功导入${successCnt}张`
                this.$alert(message, '导入结果', {
                    confirmButtonText: '确定',
                    type: 'success'
                }).then(async () => {
                    this.upLoadImgDialog = false
                    if (successCnt > 0) {
                        this.getTableList()
                    }
                })   
            }
        },
        getPath(){
            // console.log(this.$route.name);
            if (this.$route.name == 'userManagement') {
                this.getTableList()
            }
        }
    },
    async created() {
       await this.initData() 
    },
    watch: {
        '$route':'getPath'
    }
}
</script>

<style lang="less" scoped>
    .userTop {
        width: 100%;
        background: #fff;
        border-radius: 8px;
        margin-bottom: 16px;
        padding: 20px
    }
    .userBox {
        height: 100%;
        display: flex;
        .userBox-r {
            flex: 1;
            background: #fff;
            padding: 24px;
            box-sizing: border-box;
            overflow-x: hidden;
            border-radius: 8px;
        }
    }
    .subdivisionDialog,.exportDialog {
        /deep/ .el-form-item__label {
            float: none!important;
            display: block;
            text-align: left;
            padding-bottom: 8px!important;
        }
        
    }
    .exportDialog {
        /deep/ .el-radio-button__inner {
            width: auto;
            padding: 0 16px;
        }
        /deep/ .el-radio-button.block {
            display: block;
            margin-bottom: 10px;
        }
    }
    .impExplain {
        margin-top: 32px;
        color: #9299A6;
        // display: flex;
        .tipTitle {
            flex-shrink: 0;
            display: block;
            margin-bottom: 12px;
        }
        div {
            line-height: 1.8;
        }
    }
    // .searchLine {
    //     display: flex;
    //     align-items: center;
    //     margin-bottom: 24px;
    //     .searchTitle {
    //         color: #9DA0A6;
    //         margin-right: 20px;
    //     }
    //     .searchOptions {
    //         display: flex;
    //         align-items: center;
    //         .item {
    //             cursor: pointer;
    //             margin-right: 10px;
    //             padding: 4px 10px;
    //         }
    //         .item.cur{
    //             background: #EBF5FF;
    //             border-radius: 2px;
    //             color: #006AFF;
    //         }
            
    //     }
    // }
    // .searchConditions {
    //     margin-left: 50px;
    //     display: flex;
    //     .item {
    //         color: #006AFF;
    //         background: #EBF5FF;
    //         border-radius: 2px;
    //         padding: 4px 10px;
    //         margin-right: 20px;
    //         cursor: pointer;
    //     }
    // }
    .userTop .searchLine:last-child {
        margin-bottom: 0;
    }
</style>
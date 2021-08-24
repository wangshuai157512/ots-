import mainUrl from './main_url'
const baseUrlConfig = {
    'development' : '/api/app/ots/',
    // 'test' : 'http://172.16.6.130:8080/oxer',
    'production' : `${mainUrl}/app/ots/`,
}
const getBaseurl = mode => baseUrlConfig[mode];
const domainName = getBaseurl(process.env.NODE_ENV)
//


//数据权限
export const getCourseScopeList = domainName + 'CourseScope/QueryCourseScopeByConditions'
export const getCourseScope = domainName + 'CourseScope/QueryCourseScopeById'
export const getCheckedCourse = domainName + 'QuestionsManage/QuestionCategory/GetMainCategoryMainLevelItemList'
export const saveCourseScope = domainName + 'CourseScope/SaveCourseScope'
export const operateCourseScope = domainName + 'CourseScope/OperateCourseScope'

// 角色管理
export const getPrivilegeGroupsList = domainName + 'PrivilegeManage/QueryPrivilegeGroups'
export const getPrivilegeById = domainName + 'PrivilegeManage/QueryPrivilegeGroupById'
export const getFunctionById = domainName + 'PrivilegeManage/QueryFunctionPointsByPGId'
export const savePrivilegeGroup = domainName + 'PrivilegeManage/SavePrivilegeGroup'
export const privilegeGroup = domainName + 'PrivilegeManage/RemovePrivilegeGroup'


// 人员管理

// 获取机构树
export const QueryOrganizationByName = domainName + 'OrganizationManage/QueryOrganizationByName'
// 获取角色
export const GetRoles = domainName + 'OrganizationManage/GetRoles'
// 查看单个人员
export const QueryUserInfoById = domainName + 'UserInfoManage/QueryUserInfoById'
// 保存人员信息
export const SaveUserInfo = domainName + 'UserInfoManage/SaveUserInfo'
// 获取机构下的人员
export const QueryUserInfoByOrganizationCode = domainName + 'UserInfoManage/QueryUserInfoByOrganizationCode'
// 树形机构树
export const QueryOrganizationTree = domainName + 'OrganizationManage/QueryOrganizationTree'
// 查询组织机构类型
export const QueryOrganizationLevelTypes = domainName + 'OrganizationManage/QueryOrganizationLevelTypes'
// 保存组织机构
export const SaveOrganization = domainName + 'OrganizationManage/SaveOrganization'
// 查询组织机构（单条、编辑用）
export const QueryOrganizationByCode = domainName + 'OrganizationManage/QueryOrganizationByCode'
// 删除组织机构
export const RemoveOrganization = domainName + 'OrganizationManage/RemoveOrganization'
// 操作用户信息
export const OperateUserInfo = domainName + 'UserInfoManage/OperateUserInfo'
// 批量操作用户信息
export const OperateQuestionCategoryItem = domainName + 'QuestionsManage/QuestionCategory/OperateQuestionCategoryItem'
// 导出用户
export const ExportUserInfo = domainName + 'UserInfoManage/ExportUserInfo'
// 修改用户组织机构
export const ChangeUserOrganizationCode = domainName + 'UserInfoManage/ChangeUserOrganizationCode'
// 用户扩展属性
export const UserExt = domainName + 'ExtDataDefinition/UserExt'
// 导入用户
export const ImportUserInfos = domainName + 'Dts/ImportUserInfos'
// 照片上传
export const UploadUserImageImportFile = domainName + 'UserInfoManage/UploadUserImageImportFile'
// 照片导入
export const BatchImportUserImage = domainName + 'UserInfoManage/BatchImportUserImage'


// 
// 获取当前登录用户的功能权限设置
export const UserFPSettings = domainName + 'Public/UserFPSettings'

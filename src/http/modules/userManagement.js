import request from '../request'
import {
    QueryUserInfoById,
    SaveUserInfo,
    QueryUserInfoByOrganizationCode,
    GetRoles,
    QueryOrganizationByName,
    QueryOrganizationTree,
    QueryOrganizationLevelTypes,
    SaveOrganization,
    QueryOrganizationByCode,
    RemoveOrganization,
    OperateUserInfo,
    OperateQuestionCategoryItem,
    ExportUserInfo,
    UserExt,
    ChangeUserOrganizationCode,
    ImportUserInfos,
    UploadUserImageImportFile,
    BatchImportUserImage,
} from '../api'

export const saveUser = (data) => {
    return request({
        url: SaveUserInfo,
        method: 'POST',
        data
    })
}
export const getUserById = (data) => {
    return request({
        url: QueryUserInfoById,
        method: 'POST',
        data
    })
}
export const getUserListByOrg = (data) => {
    return request({
        url: QueryUserInfoByOrganizationCode,
        method: 'POST',
        data
    })  
}
export const getUserExt = () => {
    return request({
        url: UserExt,
        method: 'POST',
    })
}
// 获取机构角色信息
export const getRoles = () => {
    return request({
        url: GetRoles
    })
}
export const gerOrganizations = () => {
    return request({
        url: QueryOrganizationByName,
        method: 'POST',
        data: {
            organizationTypeId: 1,
            status: 2
        }
    })
}

export const getOrgTree = () => {
    return request({
        url: QueryOrganizationTree,
        method: 'POST',
        data: {
            organizationTypeId: 1,
            status: 2
        }
    })
}

export const getLevelType = (data) => {
    return request({
        url: QueryOrganizationLevelTypes,
        method: 'POST',
        data
    })
}

export const saveOrg = (data) => {
    return request({
        url: SaveOrganization,
        method: 'POST',
        data
    })
}

export const editOrg = (data) => {
    return request({
        url: QueryOrganizationByCode,
        method: 'POST',
        data
    })
}

export const removeOrg = (data) => {
    return request({
        url: RemoveOrganization,
        method: 'POST',
        data
    })
}

export const operateUser = (data) => {
    return request({
        url: OperateUserInfo,
        method: 'POST',
        data
    })
}

export const batchOperateUser = (data) => {
    return request({
        url: OperateQuestionCategoryItem,
        method: 'POST',
        data
    })
}

export const exportUser = (data) => {
    return request({
        url: ExportUserInfo,
        method: 'POST',
        responseType: 'blob',
        isExport: true,
        data
    })
}

// 修改用户组织机构
export const changeUserOrg = (data) => {
    return request({
        url: ChangeUserOrganizationCode,
        method: 'POST',
        data
    })
}

// 导入用户信息
export const importUser = (data) => {
    return request ({
        url: ImportUserInfos,
        method: 'POST',
        data,
        isUpload:true
    })
}

// 批量上传用户图片
export const uploadUserImg = (data) => {
    return request ({
        url: UploadUserImageImportFile,
        method: 'POST',
        data,
        isUpload: true
    })
}
// 导入用户图片
export const importUserImg = (data) => {
    return request({
        url: BatchImportUserImage,
        method: 'POST',
        data,
        isImport: true
    })
}


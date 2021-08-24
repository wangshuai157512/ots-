import * as api from '../api'
import request from '../request'


// const getTeacherList = data => {
//   return request({
//     url : api.teacherList,
//     params : data
//   })
// }

const getCourseScopeList = data => {
  return request({
    url : api.getCourseScopeList,
    method : 'POST',
    data
  })
}

const getCourseScope = data => {
  return request({
    url : api.getCourseScope,
    method : 'POST',
    data
  })
}

const getCheckedCourse = data => {
  return request({
    url : api.getCheckedCourse,
    method : 'POST',
    data
  })
}

const saveCourseScope = data => {
  return request({
    url : api.saveCourseScope,
    method : 'POST',
    data
  })
}

const operateCourseScope = data => {
  return request({
    url : api.operateCourseScope,
    method : 'POST',
    data
  })
}

const getPrivilegeGroupsList = data => {
  return request({
    url : api.getPrivilegeGroupsList,
    method : 'POST',
    data
  })
}

const getPrivilegeById = data => {
  return request({
    url : api.getPrivilegeById,
    method : 'POST',
    data
  })
}

const getFunctionById = data => {
  return request({
    url : api.getFunctionById,
    method : 'POST',
    data
  })
}

const savePrivilegeGroup = data => {
  return request({
    url : api.savePrivilegeGroup,
    method : 'POST',
    data
  })
}

const privilegeGroup = data => {
  return request({
    url : api.privilegeGroup,
    method : 'POST',
    data
  })
}


export default {
  getCourseScopeList,
  getCourseScope,
  getCheckedCourse,
  saveCourseScope,
  operateCourseScope,
  getPrivilegeGroupsList,
  getPrivilegeById,
  getFunctionById,
  savePrivilegeGroup,
  privilegeGroup,
}
import OtsUploadFile from './OtsUploadFile'
import OtsCustomDialog from './OtsCustomDialog'
import OtsMainTitle from './OtsMainTitle'
import OtsTreeSider from './OtsTreeSider'
import LayoutOne from './LayoutOne'
import OtsTree from './OtsTree'
import OtsPopPro from './OtsPopPro'
import OtsTable from './OtsTable'
import OtsPagination from './OtsPagination'
import OtsTableGroup from './OtsTableGroup'
import OtsSearchLine from './OtsSearchLine'
import OtsSearchExt from './OtsSearchExt'

const packages = [
    OtsUploadFile,
    OtsCustomDialog,
    OtsMainTitle,
    OtsTreeSider,
    LayoutOne,
    OtsTree,
    OtsPopPro,
    OtsTable,
    OtsPagination,
    OtsTableGroup,
    OtsSearchLine,
    OtsSearchExt,
]

const install = Vue => {
    Vue.use(OtsPopPro)
    packages.forEach(item => {
        Vue.component(item.name,item)
    })
}

export default install

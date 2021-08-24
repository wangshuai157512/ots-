export default {
    data() {
        return {
            showFooterPage:['permissionSetting', 'userAdd', 'userEdit', 'roleSetting'],
            timer: null
        }
    },
    methods:{
        // 禁止重复点击侧边栏
        // disabledTree(id) {
        //     // let activeId=null
        //     console.log(this.activeId,999)
        //     if(this.activeId === id) {
        //         console.log('我是false')
        //         return false
        //     }else {
        //         console.log(this.activeId,id)
        //         this.activeId = id
        //         return true
        //     }       
            
        // },

        clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
        },
       
    },
}
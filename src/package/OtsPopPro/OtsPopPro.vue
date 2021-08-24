<template>
    <div>
        <ots-custom-dialog 
            :dialog.sync="dialogVisible" 
            title="提示" 
             width="480px">
            <template v-slot:content>
                <div class="popCon">
                    <span class="col_blue f20 fb" v-html="config.content"></span>
                </div>
            </template>
            <template v-slot:footer>
                <el-button round @click="cancel" v-show="config.isNeedCancel">{{config.cancelName}}</el-button>
                <el-button round type="primary" @click="okFn">{{config.okName}}</el-button>
            </template>
        </ots-custom-dialog>
        <!-- <el-dialog
            title="提示"
            width="480px"
            top="22vh"
            :visible.sync="dialogVisible"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            :show-close="false"
        >
            <div>
                <div class="popCon">
                    <span class="col_blue f20 fb" v-html="config.content"></span>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel" v-show="config.isNeedCancel">{{config.cancelName}}</el-button>
                <el-button type="primary" @click="okFn">{{config.okName}}</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>
<script>
// this.$otsPop({
//     icon: 'message',
//     content: '哈哈哈哈哈哈',
//     cancel: () => {
//     console.log('csc')
//     },
//     success: () => {
//     console.log(123)
//     }
// })
// const iconList = {
//     warning:  require('@/assets/images/pop-warning.png'),
//     message: require('@/assets/images/pop-message.png'),
//     wlan:  require('@/assets/images/pop-wlan-error.png'),
//     camera: require('@/assets/images/pop-camera-error.png'),
// }
export default {
    name: 'OtsPopPro',
    data () {
        return {
            dialogVisible: true,
            config: {
                isNeedCancel: true,
                content: '',
                cancelName: '取消',
                okName: '确定'
            }
        }
    },
    created () {
        
    },
    mounted () {
        
    },
    methods: {
        cancel () {

            this.reject()

            this.resetConfig()

        },
        popInit (obj) {
            
            obj = obj || {}
            // this.count = obj.count ? obj.count : 1
            this.config = Object.assign(this.config, {
              ...obj
            });
            this.dialogVisible = true
            this.promise = new Promise((resolve, reject) => {
                this.reject = reject
                this.resolve = resolve
            })
            return this.promise
        },
        okFn () {

            this.resolve()

            this.resetConfig()

        },
        resetConfig () {
            this.dialogVisible = false
            this.config = {
                isNeedCancel: true,
                content: '',
                cancelName: '取消',
                okName: '确定'
            }
        }
    }
}
</script>
<style lang="less" scoped>
.popCon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}
/deep/ .el-button {
    width: auto !important;
}
</style>

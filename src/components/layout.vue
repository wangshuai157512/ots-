<template>
    <div class="layout">
        <el-container>
            <ots-head/>
        </el-container>
        <el-container class='main mainH'>
                <ots-sider/>
                <el-main>
                    <div class="mian-box">
                        <router-view class="mian-con">
                        </router-view>
                        <el-footer v-if="isShowFooter" class="footerWidth" :class="{footerW:hasScroll}">
                           <div class="myFooter">
                                <el-button size="small" round @click="goBack()">取消</el-button>
                                <el-button type="primary" size="small" round @click="save()">保存</el-button> 
                           </div> 
                        </el-footer>
                    </div>
                </el-main>
                
        </el-container>
    </div>

</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import OtsHead from '@/components/out-header.vue'
    import OtsSider from '@/components/out-sider.vue'
    export default {
        name:'layout',
        components: {
            OtsHead,
            OtsSider,
        },
        data () {
            return {
                hasScroll:false
            }
        },
        computed: {
            ...mapState(['pageThis']),
            isShowFooter()  {
                return this.showFooterPage.indexOf(this.$route.name) !== -1
            }   
        },
        methods: {
            ...mapMutations(['SAVE_PAGE_THIS']),
            
            goBack () {
                let { pageThis } = this
                if (pageThis.backMethods) {
                    pageThis[pageThis.backMethods]()
                } else{
                    pageThis && pageThis.goBack()
                }
            },
            save () {
                let { pageThis } = this
                if (pageThis.saveMethods) {
                    pageThis[pageThis.saveMethods]()
                } else{
                    pageThis && pageThis.save()
                }
            },
            getHasScroll() {
                if (!this.isShowFooter) return
                this.$nextTick(()=> {
                    let sH = document.querySelector('.mian-con').scrollHeight
                    let cH = document.querySelector('.mian-con').clientHeight
                    this.hasScroll =  sH > cH
                })
            }
        },
        mounted() {
            this.getHasScroll()
        },
        watch: {
            $route:'getHasScroll'
        }
        
    }
</script>

<style scoped lang='less'>
    .main {
        height: calc(100% - 60px);
        padding: 24px 0;
        background: #F5F7FA;
    }
    .layout {
        height: 100%;
        min-width: 1152px;
    }
    .mian-box {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .el-main {
        padding: 0;
    }
    .mian-con {
        box-sizing: border-box;
        padding: 0 24px;
        flex: 1 1;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .mian-con.full-screen {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
    }
    .el-footer {
        box-sizing: border-box;
        width: calc(100% - 48px);
        height: 72px!important;
        margin-left: 24px;
        box-shadow: 0px -8px 16px 0px rgba(0, 0, 0, 0.06);
        z-index: 5;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .footerW {
        width: calc(100% - 52px);
    }
</style>

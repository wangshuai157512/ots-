<template>
    <div>
        <div class="otsMainTitle">
            <!-- <div class="title-l">{{pageTitle}}</div> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item 
                    v-for="item in breadList" 
                    :key="item.path"
                    :to="{ path: item.path}"
                    :class="item.name === $route.name ? 'currentBread' : 'otherBread' "
                >
                    {{item.meta.title}}
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="title-r">
                <el-input v-if="mainSearch" class="search input-with-select" v-model="inputValue" placeholder="请输入搜索关键字">
                </el-input>
                <div class="iconfont icon-sousuo inputSearch" @click="handleSearch">
                    <i class="f14"></i>
                </div>
                <el-button
                    v-for="item in mainTopBtn" :key="item.title"
                    :type="item.type || 'primary'"
                    :plain="item.plain || false"
                    @click="item.fn"
                    round
                >{{item.title}}</el-button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:"OtsMainTitle",
    props: {
        mainTopBtn:{
            type:Array,
            default:()=> {

            }
        },
        mainSearch: {
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            // pageTitle:"",
            inputValue:"",
            oldInputValue: "",
            breadList: [],
        }
        
    },
    compouted: {
        
    },
    mounted() {
        // console.log(this.$route.matched)
        // this.pageTitle = this.$route.meta.title
        // this.breadList = this.$route.matched.filter(item => { return item.name !== 'Home'})
    },
    methods: {
        handleSearch () {
            if (this.inputValue == this.oldInputValue) {
                return
            }
            this.oldInputValue = this.inputValue
            this.$emit('searchFn', this.oldInputValue)
        }
    },
    watch: {
        $route: {
            handler: function(val, oldVal){
                this.breadList = this.$route.matched.filter(item => { return item.name !== 'Home'})
            },
            // 深度观察监听
            deep: true,
            immediate: true
        }
    },
}
</script>

<style lang="less" scoped>
    .otsMainTitle {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
        // .title-l {
        //     font-size: 24px;
        //     font-weight: 500;
        //     color: #2D2F33;
        // }
        .currentBread {
            font-size: 24px;
            font-weight: 500;
            color: #2D2F33;
        }
        /deep/ .otherBread {
            color: #9299A6;
        }
        .title-r {
            display: flex;
            position: relative;
            .inputSearch {
                position: absolute;
                left: 335px;
                top: 10px;
                height: 22px;
                line-height: 22px;
                cursor: pointer;
                color: #CED2D9;
                padding: 0 10px;
                border-left: 1px solid #DCDFE6 ;
            }
        }
    }
    .title-r /deep/ .el-input__inner {
        background: #FFFFFF;
        width: 380px;
        height: 40px;
        border-radius: 40px;
        margin-right: 16px;
        padding-right: 50px!important;
    }
    .el-breadcrumb {
        display: flex;
        align-items: flex-end;
    }
    .otherBread /deep/.el-breadcrumb__inner.is-link {
         color: #9299A6;
         font-weight: 400;
    }
    .el-button--primary{
        background: #006AFF;
        border-color: #006AFF;
    }
    .el-button--primary:focus, .el-button--primary:hover {
        background: #66b1ff;
        border-color: #66b1ff;
        color: #fff;
    }
    .el-button--primary.is-plain {
        color: #409EFF;
        background: #ecf5ff;
        border-color: #b3d8ff;
    }
    .otherBread /deep/.el-breadcrumb__inner.is-link:hover{
        color: #006AFF;
        cursor: pointer;
    }
    .el-button.is-plain:focus, .el-button.is-plain:hover {
        background: #ecf5ff;
        border-color: #409EFD;
        color: #006AFF;
    }
</style>
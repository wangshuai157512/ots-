<template>
    <div class="ots-pageination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'OtsPagination',
    props:{
        pagination:{
            type:Object,
            default:()=>({
                total:0
            })
        },
    },
    data() {
        return {
            
        };
    },

    mounted() {
      
    },

    methods: {
        handleSizeChange(num) {
            this.$emit('changeNum',num)
        },
        handleCurrentChange(p) {
            this.$emit('changePage',p)
        }
        
    },
};
</script>

<style lang="less" scoped>
    .ots-pageination {
        display: flex;
        justify-content: center;
        margin-top: 32px;
    }
    .el-pagination {
        /deep/ .is-in-pagination {
            .el-input__inner {
                padding: 0 3px!important;
            }
        }
        
    }
</style>
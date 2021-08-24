<template>
    <div>
        <div class="batchOperation" v-if="batchOperBtn.length>0">
            <ul>
                <li class="batchBtn" v-for="item in batchOperBtn" :key="item.title" @click="item.click()">
                    <a href="javascript:;">
                        <i :class="item.icon"></i>
                        <span>{{item.title}}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="ots-table">
            <el-table
                :data="tableData"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                    v-if="tableOption.multiple"
                    type="selection"
                    width="55"
                    >
                </el-table-column>
                <template v-for="(item,index) in tableHeader">
                    <el-table-column
                        :key="index"
                        v-if="!item.type" 
                        v-bind="setAttribute(item)"
                    >
                        <template slot-scope="scope">
                                <span class="table-text" v-html="getTableText(item,scope)">
                                </span>
                            </template>
                        </el-table-column>
                    <el-table-column
                        :key="index"
                        v-else-if="item.type==='switch'" 
                        v-bind="setAttribute(item)"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-switch 
                                v-model="scope.row[item.prop]"
                                :active-value = 1
                                :inactive-value = 0
                                @change="item.switchChange(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :key="index"
                        class="operate"
                        v-else-if="item.type==='buttons'" 
                        v-bind="setAttribute(item)"
                        align="right"
                        headerAlign="center"
                        fixed="right"
                    >
                        <template slot-scope="scope">
                            <el-button
                                v-for="(itemBtn,index) in item.btnList"
                                :key="index"
                                :type="itemBtn.type || 'text'"
                                :size="itemBtn.size || 'mini'"
                                :disabled="itemBtn.formatter?itemBtn.formatter(scope):itemBtn.disabled"
                                @click="itemBtn.click(scope.row,itemBtn)"
                                >{{itemBtn.title}}
                            </el-button>
                        </template>
                    </el-table-column>
                </template>
                
            </el-table>
        </div>
    </div>    
</template>

<script>
export default {
    name: 'OtsTable',
    props:{
        tableHeader:{
            type:Array,
            default:()=>[]
        },
        tableData:{
            type:Array,
            default:()=>[]
        },
        tableOption:{
            type:Object,
            default:()=>({})
        },
        batchOperBtn:{
            type:Array,
            default:()=>[]
        }
    },
    data() {
        return {
            
        };
    },

    mounted() {
    
    },

    methods: {
        setAttribute(item) {
            return {
                headerAlign : 'center',
                prop : item.prop,
                fixed : item.fixed,
                label : item.title,
                width : item.width || 'auto',
                align : item.align || 'center',
            }
        },
        getTableText(item,scope) {
            
            let text = (item.formatter?item.formatter(scope):scope.row[item.prop])
            return (text || text == '0')?text:'-'
        },
        handleSelectionChange(tableCol) {
            this.$emit('handleSelectionChange',tableCol)
        }
        
    },
};
</script>

<style lang="less" scoped>
    
     /deep/ .el-table__row .el-button--mini {
        font-size: 13px!important;
        min-width: auto!important;
        padding: 0!important;
    }
    .batchOperation {
        margin-bottom: 16px;
        ul {
            display: flex;
            li {
                a {
                    display: block;
                    margin-right: 24px;
                    font-size: 14px;
                    color: #6D6F73; 
                    i {
                        margin-right: 8px;
                    }
                }
                
                
            }
        }
    }
    /deep/ .el-table th>.cell {
        padding-left: 14px;
        padding-right: 14px;
    }
</style>
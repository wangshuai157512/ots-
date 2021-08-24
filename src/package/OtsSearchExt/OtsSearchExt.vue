<template>
    <div class="extBox" v-if="extList.length">
        <div class="searchLine">
            <div class="searchTitle">其它</div>
            
            <div class="searchPlugin">
                <!-- 枚举 -->
                <div class="mr40" v-if="enumList.length">
                    <el-select v-model="currentEnum" placeholder="请选择" class="extKey">
                        <el-option
                        v-for="item in enumList"
                        :key="item.name"
                        :label="item.displayName"
                        :value="item">
                        </el-option>
                    </el-select>
                    <el-select v-model="currentEnumValue" class="enumValue" @change="addEnumCondition">
                        <el-option
                        v-for="item in currentEnumData"
                        :key="item"
                        :label="item"
                        :value="item"
                        >
                        </el-option>
                    </el-select>
                </div>
                <!-- 输入框 -->
                <div class="typeBox" v-if="textList.length">
                    <el-select v-model="currentText" placeholder="请选择" class="extKey">
                        <el-option
                        v-for="item in textList"
                        :key="item.value"
                        :label="item.displayName"
                        :value="item">
                        </el-option>
                    </el-select>
                    <el-input class="textValue" v-model="currentTextValue" size="small" placeholder="请输入"></el-input>
                    <i class="iconfont icon-sousuo" @click="addTextCondition"></i>
                </div>
                
            </div>
        </div>
        <div class="searchConditions">
            <div class="item" v-for="item in conditionList" :key="item.name" @click="delCondition(item.name)">
                <span class="mr5">{{`${item.displayName}：${item.value}`}}</span><i class="el-icon-close"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'OtsSearchExt',
    props: {
        extList: {
            type: Array,
            default: []
        }
    },
    data () {
        return {
            currentEnum: '',
            currentEnumValue: '',
            currentText: '',
            currentTextValue: '',
            conditionList: [],
        }
    },
    computed: {
        enumList () {
            return this.extList.filter(item => item.type == 'Enum')
        },
        textList () {
            return this.extList.filter(item => item.type == 'Text')
        },
        currentEnumData () {
            let tempData = []
            let current = this.enumList.filter(item => item.name == this.currentEnum.name)
            if (current.length) {
                tempData = current[0].values
            }
            return tempData
        }
    },
    mounted () {
        // console.log(this.extList.length)

        // this.dealExtList()

    },
    methods: {
        dealExtList () {
            console.log(this.dataList)
        },
        addEnumCondition () {
            if (!this.currentEnum) {
                return
            }
            let obj = {
                displayName: this.currentEnum.displayName,
                name: this.currentEnum.name,
                value: this.currentEnumValue
            }
            
            let arr = this.conditionList
            let tempIndex = -1
            for( let [ index, item ] of  arr.map( ( item, index ) => [ index, item ] )  ) {
                if (item.name == obj.name) {
                    tempIndex = index
                    this.conditionList.splice(index, 1 , obj)
                    break
                }
            }
            if (tempIndex < 0) {
                this.conditionList.push(obj)
            }
        },
        addTextCondition () {
            if (!this.currentText || !this.currentTextValue) {
                return
            }

            let obj = {
                displayName: this.currentText.displayName,
                name: this.currentText.name,
                value: this.currentTextValue
            }
            
            let arr = this.conditionList
            let tempIndex = -1
            for( let [ index, item ] of  arr.map( ( item, index ) => [ index, item ] )  ) {
                if (item.name == obj.name) {
                    tempIndex = index
                    this.conditionList.splice(index, 1 , obj)
                    break
                }
            }
            if (tempIndex < 0) {
                this.conditionList.push(obj)
            }
        },
        delCondition (attrName) {
            this.conditionList.forEach((item, index) => {
                if (item.name == attrName) {
                    this.conditionList.splice(index, 1)
                }
            })
        }
    },
    watch: {
        extList: {
            handler: (val, oldVal) => {
                val.forEach(item => {
                    if (item.viewType == 'Dropdown') {
                        item.values = item.values.split(' ')
                    }
                })
            }
        },
        conditionList: {
            handler: function (val) {
                const attrList = val.map(item => {
                    return {
                        attr: item.name,
                        attrValue: item.value
                    }
                })
                this.$emit('changeOption', attrList)
            }
        }
    }
}
</script>
<style lang="less" scoped>
.extBox {
    font-size: 13px !important;
}
.searchLine {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    .searchTitle {
        color: #9DA0A6;
        margin-right: 20px;
    }
    .searchPlugin {
        display: flex;
        align-items: center;
    }
}
.searchConditions {
    margin-left: 50px;
    display: flex;
    flex-wrap: wrap;
    .item {
        flex-shrink: 0;
        color: #006AFF;
        background: #EBF5FF;
        border-radius: 2px;
        padding: 4px 10px;
        margin-right: 20px;
        cursor: pointer;
        margin-bottom: 10px;
    }
}
.extKey {
    width: 90px;
    /deep/ .el-input__inner {
        border-radius: 4px 0px 0px 4px;
    }
}
.enumValue {
    width: 200px;
    /deep/ .el-input__inner {
        border-radius: 0px 4px 4px 0px;
        border-left: none !important;
    }
}
.typeBox {
    position: relative;
    display: flex;
    align-items: center;
    .textValue.el-input{
        width: 200px;
        /deep/ .el-input__inner {
            border-radius: 0px 4px 4px 0px;
            border-left: none !important;
        }
        
    }
    .icon-sousuo {
        position: absolute;
        right: 10px;
        cursor: pointer;
        color: #CED2D9;
    }
}

/deep/ .el-input__inner {
    height: 36px;
    line-height: 36px;
}
/deep/ .el-input__inner:focus {
    border-color: #DCDFE6 !important;
}
/deep/ .el-input__icon {
    line-height: 36px;
}
</style>
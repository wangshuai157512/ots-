<template>
    <div>
        <el-tree
            :data="dealedTreeData"
            :props="defaultProps" 
            @node-click="handleNodeClick" 
            :highlight-current="true" 
            show-checkbox="true"
            >
        </el-tree>
    </div>
</template>
<script>
export default {
    name: 'OtsTree',
    props:{
        treeData: {
            type: Array,
            default: ()=> {}
        },
        permissionOperateBtn: {
            type: Array,
            default: ()=> {}
        },
        permissionTitle: {
            type: String,
            default: ""
        }
    },
    computed: {
        dealedTreeData () {
            return this.dealTreeData(this.treeData)
        }
    },
    mounted () {
        console.log(this.dealedTreeData)
    },
    data () {
        return {
            defaultProps: {
                // children: 'children',
                label: 'name'
            }
        }
    },
    methods: {
        handleNodeClick(data) {
            let {id,enabled,name,description} = data
            // this.getItemCon(id,enabled,name,description)
            console.log(data)
        },
        renderContent(h, { node, data, store }) {
            return(
            <span class='permissionList'>
                <span>
                    <span>{node.label}</span>
                </span>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        {
                            this.permissionOperateBtn.map(item=>{
                                return  <el-dropdown-item >
                                            <div onClick={() => { item.click() } }>
                                                <i class={`${item.icon}`}></i>{item.title}
                                            </div>
                                        </el-dropdown-item>
                            })
                        }
                    </el-dropdown-menu>
                </el-dropdown>
            </span>
            )
        },
        dealTreeData (arr) {
            let treeData = []
            arr.forEach(item => {
                if (!item.parentCode) {
                    treeData.push(item)
                }
            })
            function getJsonTree (data, parentCode) {

                let itemArr=[]

                for(let i=0;i<data.length;i++){	
                    let node=data[i]

                    if(node.parentCode == parentCode ){	
                        let childrens = getJsonTree(data, node.code)
                        let newNode = {...node}
                        if (childrens.length) {
                            newNode.children = childrens
                        }
                        itemArr.push(newNode);				 
                    }
                }

                return itemArr
            }
            treeData.forEach(tree => {
                tree.children = getJsonTree(arr, tree.code)
            })
            return treeData
        },
        
    }
}
</script>
<style scoped>
</style>
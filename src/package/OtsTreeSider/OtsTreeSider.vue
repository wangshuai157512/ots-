<template>
  <div class="permissionMain-l">
    <div class="permission-l-top">
      <div class="permissionTitle">
        <div>{{ permissionTitle }}</div>
        <div v-if="isDisabledAddBtn" class="iconfont icon-tianjia" @click="addPermission"></div>
      </div>
      <el-input v-if="searchKeyworld" class="searchItem" placeholder="搜索机构名称" v-model="filterText"></el-input>
    </div>
    
    <div
      class="permissionCon"
      :style="{height:silderConH + 'px'}"
      v-if="treeData && treeData.length >= 1" 
    >
      <el-tree
        ref="tree"
        :data="treeData"
        @node-click="getTreeItemCon"
        :highlight-current="true"
        :props="defaultProps"
        :filter-node-method="filterNode"
      >
      <span class="permissionList" slot-scope="{node,data}">
          <span class="silderText">
            <span :title="node.label" >{{node.label}}</span>
          </span>
              <el-dropdown v-if="!isDisabledGroup">
                <span class="el-dropdown-link">
                  <i class="iconfont icon-gengduo"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(item,index) in data.permissionOperateBtn" :key="index" class="groupBtn">
                          <div @click="item.click(data)" v-if="!item.isHide">
                            <i :class="item.icon"></i>
                            {{item.title}}
                          </div>
                      </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: "OtsTreeSider",
  props: {
    treeData: {
      type: Array,
      default: () => {},
    },
    permissionTitle: {
      type: String,
      default: "",
    },
    isDisabledGroup: {
      type: Boolean,
      default: false,
    },
    isDisabledAddBtn: {
      type: Boolean,
      default: true,
    },
    searchKeyworld: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      filterText:"",
      activePermissionId: "",
      defaultProps: {
            children: 'children',
            label: 'name'
      },
      silderConH:600
    };
  },
   watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
   },
  methods: {
    filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
    },
    addPermission() {
      this.$emit("childrenAddPermission");
    },
    getTreeItemCon(data,nodeObj,node) {
      if(node.$el.classList.contains('is-current')) return
      this.$parent.getSelectItem(data);
    },
    getH() {
      if(document.querySelector('.permissionMain-l')) {
        let boxH = document.querySelector('.permissionMain-l').offsetHeight
        let topH = document.querySelector('.permission-l-top').offsetHeight
        this.silderConH = boxH - topH - 48
      }
    },
    // renderContent(h, { node, data, store }) {
    //   return (
    //     <span class="permissionList">
    //       <span>
    //         <span>{node.label}</span>
    //       </span>
    //       { this.isDisabledGroup ? ("") : 
    //         (
    //           <el-dropdown>
    //             <span class="el-dropdown-link">
    //               <i class="iconfont icon-gengduo"></i>
    //             </span>
    //             <el-dropdown-menu slot="dropdown">
    //               {data.permissionOperateBtn.map((item) => {
    //                 return (
    //                   <el-dropdown-item class="groupBtn">
    //                     {
    //                       item.isHide?(""):
    //                       (<div onClick={ () => {item.click(data);} }>
    //                         <i class={`${item.icon}`}></i>
    //                         {item.title}
    //                       </div>)
    //                     }
    //                   </el-dropdown-item>
    //                 );
    //               })}
    //             </el-dropdown-menu>
    //           </el-dropdown>
    //         )
    //       }
    //     </span>
    //   );
    // },

  },
  mounted() {
    this.getH()
  },
  watch:{
    $route:'getH'
  }

};
</script>
<style lang="less" scoped>
.permissionMain-l {
  width: 320px;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  margin-right: 16px;
  padding: 24px;
  box-sizing: border-box;
  .permissionTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 28px;
    color: #2d2f33;
    font-size: 16px;
    font-weight: 500;
  }
  .permissionCon {
    height: calc(100% - 50px);
    overflow-y: auto;
    /deep/.el-tree-node__content {
      height: 40px;
      position: relative;
    }
    /deep/.permissionList {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      color: #45494d;
      font-size: 14px;
      font-weight: 500;
      border-radius: 2px;
      .silderText {
        display: block;
        width: 80%;   
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

      }
      .el-dropdown {
        position: absolute;
        right: 16px;
        top: 13px;
      }
    }
    a:hover,
    a:focus,
    .activePermissionItem {
      background: #ebf5ff;
      color: #006aff;
    }
  }
}
/deep/ .groupBtn {
  /deep/ .el-button {
    margin: 0 !important;
    padding: 0 !important;
    color: #45494d !important;
    font-size: 14px !important;
  }
}
.searchItem {
    /deep/ .el-input__inner {
      height: 32px!important;
      line-height: 32px!important;
      margin-bottom: 16px;
    }
}
</style>
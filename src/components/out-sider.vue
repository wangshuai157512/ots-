<template>
  <div class="sider-container">
    <el-menu default-active="1" class="el-menu-vertical-demo" :class="isCollapse?'closeSilderBox':''"  :collapse="isCollapse">
      <div @click="silderCut" class="menuBox">
        <a href="javascript:;">
          <img src="../assets/img/icon-menu.png" alt="" :class="{'shouqi': !isCollapse}" >
        </a>
      </div>
      <el-submenu :index="index + ''" :class="isCollapse?'closeSilder':''" v-for="(item,index) in silderList" :key='item.title' >
        <template slot="title">
          <img :src='getImg(item.icon)' alt="" class="silderIcon">
          <span slot="title">{{item.title}}</span> 
        </template>
        <el-menu-item-group v-for="(childrenItem) in item.children" :key="childrenItem.meta.title">
          <el-menu-item :index="childrenItem.meta.title" @click="handlechildren(childrenItem.name)">{{childrenItem.meta.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

  </div>
</template>

<script>
    import { getUserFPSettings } from '@/http/modules/commonData'
    export default {
      name:'out-sider',
      data() {
        return {
          isCollapse: true,
          imgs : require('../assets/img/agency-icon.png'),
          menuIdList: []
        }
      },
      computed:{
        silderList() {
          // return this.$router.options.routes.filter(item=> {
          //   return item.title
          // })
          return this.filterMenu(this.$router.options.routes)
        }
      },
      created () {
        this.getMenuData()
      },
      methods: {
        async getMenuData () {
          const { data } = await getUserFPSettings()
          let menuData = data.children
          // console.log(menuData)
          this.menuIdList = this.reduceMenuArray(menuData)
        },
        reduceMenuArray (arr) {
          let result = arr.reduce((acc, cur) => {
            if (cur.children && cur.children.length) {
              acc = acc.concat(this.reduceMenuArray(cur.children))
            }
            return acc.concat(cur.id)
          }, [])
          return result
        },
        getImg (icon) {
          return require(`../assets/img/${icon}`)
        },
        silderCut() {
          this.isCollapse = !this.isCollapse
        },
        handlechildren(name) {
          if (this.$route.name === name) return
          this.$router.push({name})
        },
        filterMenu (menuList) {
            return menuList.filter(item => {
                return item.title && this.getMenuId(item.id)
            }).map(item => {
                item = Object.assign({}, item)
                if (item.children) {
                    item.children = this.filterMenu(item.children)
                }
                return item
            })
        },
        getMenuId (id) {
          return this.menuIdList.includes(id)
        }
      },
      mounted() {
      
      }
    }
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 192px;
    overflow-x: hidden;
    overflow-y: auto;
  }
.el-menu-vertical:not(.el-menu--collapse) {
    width: 50px;
    // min-height: 400px;
  }
  .sider-container {
    height: 100%;
    margin-left:24px;
    // overflow: hidden;
    text-align: center;
    .el-menu {
      height: 100%;
      border-right: 0;
    }

  }
  /deep/.el-menu-item-group__title {
    padding: 0;
  }
  /deep/ .el-menu-item {
    border-left: 3px transparent solid;
    height: 40px!important;
    line-height: 40px!important;
    padding-left: 50px!important;
    text-align: left;
    min-width: none!important;
    font-size: 13px;
    color: #9299A6;
  } 
  /deep/ .el-menu-item:focus,.el-menu-item:hover,.el-menu-item.is-active {
      outline: 0;
      background-color: #ebf5ff;
      border-left: 3px #006AFF solid;
      color: #006AFF;
      font-size: 14px;
      font-weight: 600;
  }
  /deep/ .el-submenu__title {
    font-size: 16px;
    color: #3D3E40;
    padding: 0 15px 0 25px!important;
    width: 100%;
    text-align: left;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    margin:12px 0;
  }
  .closeSilder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .closeSilder /deep/ .el-submenu__title {
    text-align: center;
    margin-bottom: 12px;
    margin-top: 0;
    font-size: 13px;
    color: #9299A6;
    height: 60px;
    line-height: 60px;
    font-weight: 400;
  }
  /deep/ .el-menu--collapse>.el-menu-item span,/deep/ .el-menu--collapse>.el-submenu>.el-submenu__title span {
    height: 30px;
    line-height: 30px;
    width: auto;
    overflow: auto;
    visibility: inherit;
  }
  .closeSilder .silderIcon {
    margin-top: 5px;
  }
  .closeSilder /deep/ .el-submenu__title:hover {
     background: #F1F2F5;
  }
  .closeSilderBox {
    .menuBox {
      padding: 0 8px!important;
    }
  }
  .closeSilder {
    /deep/ .el-submenu__title{
      padding: 0 8px!important;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .menuBox {
    padding: 0 15px 0 25px!important;
    height: 52px;
    line-height: 52px;
    box-sizing: border-box;
    a {
      float: right;
      display:block;
      img.shouqi {
        transform: rotateY(180deg)
      }
    }
  }
  .closeSilderBox {
    .menuBox {
      a {
        float: none;
      }
    }
  }
  .silderIcon {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
  .closeSilder {
    .silderIcon {
      display: block;
      margin-right: 0;
    }
  }

  .el-menu--popup-right-start {
    .el-menu-item{
      padding: 0 16px!important;
    }
    .el-menu-item.is-active {
      outline: 0;
      background-color: transparent;
      border-left: 3px transparent solid;
      color: #006AFF;
      font-size: 13px;
      font-weight: 400;
    }
    .el-menu-item:focus {
      outline: 0;
      background-color: #ebf5ff;
      border-left: 3px transparent solid;
      color: #006AFF;
      font-size: 13px;
      font-weight: 400;
    }
    .el-menu-item:hover {
      outline: 0;
      background-color: #ebf5ff;
      border-left: 3px transparent solid;
      color: #006AFF;
      font-size: 13px;
      font-weight: 400;
    }
  }
  .el-menu--popup-right-start {
    .el-menu-item{
      padding: 0 16px!important;
    }
  }
    
 
  
  
</style>


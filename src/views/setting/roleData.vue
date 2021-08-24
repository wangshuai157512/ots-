<template>
  <div>
    <ots-main-title></ots-main-title>
    <div class="permissionMain">
      <ots-tree-sider
        ref="OtsTreeSider"
        permissionTitle="角色组"
        @childrenAddPermission="handleAddPermission"
        :treeData="courseScopeList"
        :isDisabledGroup="settingPage"
        :isDisabledAddBtn="!settingPage"
        :searchKeyworld="false"
      ></ots-tree-sider>
      <div class="permissionMain-r">
        <!-- 查看 -->
        <template v-if="!settingPage">
          <div
            class="noData"
            v-if="courseScopeList && courseScopeList.length < 1"
          >
            暂无数据，可点击左上角“+”按钮进行添加
          </div>
          <div v-else>
            <div class="permissionMain-r-title">
              <div class="chineseTitle">
                <span>{{ query.name }}</span
                ><el-tag
                  :type="query.enabled ? 'success' : 'warning'"
                  size="mini"
                  >{{ query.enabled ? "已启用" : "未启用" }}</el-tag
                >
              </div>
              <p class="EnglishTitle">{{ query.role }}</p>
            </div>
            <div class="permissionMain-r-course">
              <div class="courseTitle">已选功能</div>
              <div class="treeBox">
                <el-tree :data="courseScope" 
                         :props="defaultProps" 
                         ref="tree">
                </el-tree>
              </div>
            </div>
          </div>
        </template>
        <!-- 设置 -->
        <template v-else>
          <router-view></router-view>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "roleData",
  components: {},
  data() {
    return {
      courseScopeList: [],
      courseScope: [], //已选功能
      query: {
        id: "", //课程范围id
        fpIds: [], //权限项id
        enabled: null, // 启用状态
        dataPermissions: '2', // 启用状态
        name: "",
        role: "",
      },
      settingPage: false,
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  methods: {
    ...mapMutations(["SAVE_PAGE_THIS"]),
    // 获取权限组
    getCourseScopeList() {
      this.$api.permission
        .getPrivilegeGroupsList({ pageSize: 100, pageNo: 1 })
        .then((res) => {
          if (res.status === 1 && res.data.privilegeGroups.length > 0) {
            this.courseScopeList = res.data.privilegeGroups;
            this.courseScopeList.forEach((item) => {
              item.permissionOperateBtn=[
                {
                  title: item.enabled? "停用" : "启用",
                  icon: item.enabled? "iconfont icon-tingyong" : "iconfont icon-kaiqi",
                  click: this.editState,
                },
                {
                  title: "编辑",
                  icon: "iconfont icon-bianji",
                  click: this.edited,
                },
                {
                  title: "删除",
                  icon: "iconfont icon-shanchu",
                  isHide:item.userNum,
                  click: this.delete,
                },
              ];
            });
            if (this.query.id) {
              this.getSelectItem(this.query.id);
            } else {
              this.$nextTick(() => {
                const firstNode = document.querySelector(".el-tree-node");
                firstNode.click();
              });
            }
          }
        });
    },
    // 获取已选功能
    getSelectItem(data) {
      if (this.$route.name !== "roleData") {
        this.$router.push({ name: "roleData" });
      }
      if(data.id) {
          this.query.id = data.id 
      }
      this.$api.permission.getPrivilegeById({ id: this.query.id })
      .then((res) => {
        if (res.status) {
          let { enabled, name, role, dataPermissions } = res.data;
          this.query.enabled = enabled;
          this.query.name = name;
          this.query.role = role;
          this.query.dataPermissions = dataPermissions;
          this.courseScope = res.data.functionPoints;
          this.treeItemactiveBgd();
          if (this.edit === "edit") {
            this.pushEdit();
          }
        }
      });
    },
   
    handleAddPermission() {
      if (this.settingPage) return;
      this.query.id = "";
      this.settingPage = true;
      this.$router.push({ path: "/roleData/roleSetting" });
    },

    operateCourseScope(operateType) {
      let queryOperateCourse = {
        ids: this.query.id,
        operateType: operateType,
      };
      this.$api.permission.privilegeGroup(queryOperateCourse).then((res) => {
        if (res.status) {
          if (res.status) {
            this.$message({
              message: operateType == 1 ? "删除成功" : "修改成功",
              type: "success",
            });
            if (operateType === 1) {
              this.query.id = "";
            }
            this.getCourseScopeList();
          }
        }
      });
    },

    treeItemactiveBgd() {
      let currentIndex = this.courseScopeList.findIndex(
        (item) => item.id === this.query.id
      );
      let treeItemNodes = document.querySelectorAll(
        ".permissionMain .el-tree .el-tree-node"
      );
      treeItemNodes = [].slice.call(treeItemNodes);
      treeItemNodes.forEach((item) => {
        item.classList.remove("is-current");
      });
      treeItemNodes[currentIndex].classList.add("is-current");
    },

    editState(data) {
      let {id,enabled} = data
      this.operateType = null
      if(enabled) {
          this.operateType = 3
      }else {
            this.operateType = 2
      }
      this.query.id = id;
      this.operateCourseScope(this.operateType);
      this.treeItemactiveBgd();
    },
    edited(data) {
      let {id} = data 
      this.edit = "edit";
      this.query.id = id;
      this.getSelectItem(this.query.id);
    },

    getFpIds(fpIds) {
      fpIds.map(item=> {
        this.query.fpIds.push(item.id)
        if(item.children && item.children.length>0) {
          this.getFpIds(item.children)
        }
      })

    },
    pushEdit() {
      this.getFpIds(this.courseScope)
      this.$router.push({
        path: "/roleData/roleSetting",
        query: this.query,
      });
      this.settingPage = true;
      this.treeItemactiveBgd();
      this.edit = "";
      this.query.fpIds=[]
    },
    delete(data) {
      let {id} = data
      this.operateType = 1
      this.query.id = id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.operateCourseScope(this.operateType);
      });
    },
  },
  mounted() {
    this.getCourseScopeList();
    if (this.$route.path === "/roleData/roleSetting") {
      this.settingPage = true;
    }
  },
  watch: {
    $route: function () {
      if (this.$route.name === "roleData") {
        this.getCourseScopeList();
        this.settingPage = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.permissionMain {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  .permissionMain-r {
    flex: 1;
    background: #fff;
    padding: 25px 32px;
    box-sizing: border-box;
    text-align: left;
    .noData {
      color: #45494d;
      font-size: 14px;
      margin-top: 20%;
      text-align: center;
    }
    .chineseTitle {
      color: #45494d;
      font-size: 14px;
      font-weight: 600;
      span {
        margin-right: 8px;
      }
    }
    .EnglishTitle {
      color: #9299a6;
      font-size: 13px;
      margin: 8px 0 32px 0;
    }
    .courseTitle {
      color: #45494d;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    .curseList {
      color: #45494d;
      font-size: 14px;
      margin-bottom: 16px;
      width: 33.33%;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
.permissionMain-r > div {
  height: 100%;
  overflow-y: auto;
}
.treeBox {
  /deep/ .el-tree {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
}
.treeBox /deep/ .el-tree > div {
  width: 20%;
  margin-right: 13%;
  margin-bottom: 16px;
}
</style>
<template>
  <div id="app" class="themeBlue">
    <router-view/>
  </div>
</template>
<script>
export default {
    data() {
        return {
            property: 'value',
        };
    },
    mounted() {
        
    }
}
</script>

<style lang="less">
  @import './assets/style/changeColor.less';
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    font-size: 14px;
    color: #45494D;
    height: 100%;
  }
  * {
    padding: 0;
    margin: 0;  
  }
  html,body {
    background: #F5F7FA;
    height: 100%;
  }
  .fl {
      float: left;
  }

  .fr {
      float: right;
  }

  ul {
      list-style: none;
  }
  a {
      text-decoration:none
  }
  .iconfont {
      color: #006AFF;
  }
  .icon-sousuo,.icon-gengduo{
      color: #CED2D9;
  }
  ::-webkit-scrollbar{
      width:6px;
      height: 8px;
  }
  ::-webkit-scrollbar-thumb {
      border-radius:10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background:rgba(0,0,0,.2)
  }
   .clearfix:after { /*伪元素是行内元素 正常浏览器清除浮动方法*/
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }

    .clearfix {
        *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
    }
    .theme(@backColor:#006AFF,@fontColor:#fff) {
        .linkto {
            color: #006AFF;
            text-decoration: none;
            font-size: 12px;
            font-weight: 500;
        }
        .el-message {
            min-width: 80px;
            padding: 15px 30px;
        }
        .message-bule-style {
            background: #e8f1ff;
            .el-icon-info {
                color: #187aff;
            }
            .el-message__content {
                color: #187aff;
            }
        }
        .el-message-box {
            padding-bottom: 20px;
            .el-message-box__header {
                padding: 20px 20px 0px;
            }
            .el-message-box__content {
                margin-top: 22px;
                padding: 10px 20px;
                margin-bottom: 22px;
            }
        }
        .el-checkbox__input.is-checked+.el-checkbox__label {
            color: #606266;
        }
        .el-button {
        //   padding: 7px 14px!important;
        min-width: 92px!important;
        font-size: 14px!important;
        }
        .el-message-box .el-button--default:hover {
        background: #ecf5ff;
        color: #176DE6;
        border-color: #176DE6;
        }
        .el-message-box .el-button--primary:hover {
            background: #66b1ff;
            border-color: #66b1ff;
            color: #FFF;
        }
        .el-dialog {
            .el-dialog__title {
                font-weight: bold;
            }
        }
        .el-dialog.auto-scroll {
        .el-dialog__header {
            padding: 20px 20px 2px;
        }
        .el-dialog__body {
            max-height: 500px;
            overflow-y: auto;
        }
        .el-dialog__footer {
            padding:20px;
        }
        }

        .tag {
            margin-right: 8px;
            font-size: 14px;
            color: #006AFF;
            cursor: default;
        }
        .mb16 {
            margin-bottom: 16px;
        }
        
        .el-input__inner{
        padding: 8px 30px 8px 12px!important;
        border: 1px solid #DCDFE6!important;
        box-sizing: border-box;
        }
        .el-date-editor .el-input__inner {
            padding-left: 30px!important;
        }
        .el-input__inner:hover{
        border-color: #C2C4CC!important;
        }
        .el-input__inner:focus {
            border-color: #3388FF!important;
        }
        .el-form-item__label {
        padding-right: 4px;
        }
        .el-form-item {
            margin-bottom: 16px!important;
        }
        .el-radio-group {
            .el-radio {
                margin-bottom: 8px;
            }
        }
        .dialog-title {
            color: #363940;
            font-size: 14px;
            font-weight: bold;
        }

        // 侧边栏样式
        .el-menu--popup-right-start{
            min-width: 164px!important; 
            box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
        }
        // 侧边栏样式end
    }
</style>

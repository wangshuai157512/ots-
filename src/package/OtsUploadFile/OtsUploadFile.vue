<template>
    <div>
        <el-upload
            action=""
            ref="upload"
            :multiple="multiple"
            :limit="limit"
            :http-request="httpRequest"
            :show-file-list="showFileList"
            :before-upload="beforeUpload"
        >
            <template v-if="isHasSlot">
                <slot></slot>
            </template>
            <div v-else class="default-upload-container">{{getFileName}}</div>
        </el-upload>
    </div>
</template>

<script>
  export default {
    name: "OtsUploadFile",
    props: {
      multiple: {
        type: Boolean,
        default: false
      },
      limit: {
        type: Number,
        default: 1
      },
      httpRequest: {
        type: Function,
        default: () => {
        }
      },
      fileSize: {
        type: String,
        default: '2'
      },
      showFileList: {
        type: Boolean,
        default: true
      },
      onProgress :{
        type : Function,
        default :() => {}
      },
      fileType: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        name: '点击选择文件'
      }
    },
    computed: {
      isHasSlot() {
        return this.$slots.default && this.$slots.default.length
      },
      getFileName () {
        if (this.multiple) {
          let newName = this.name.replace(/点击选择文件/g,'')
          return this.name === '点击选择文件'?this.name:newName.substring(0,newName.lastIndexOf('、'))
        } else {
          return this.name
        }
      }
    },
    methods: {
      beforeUpload(file) {
        let isType = true
        if (this.fileType) {
          isType = file.name.indexOf(this.fileType) > -1
        }
        const isLimit = Math.floor(file.size / 1024 / 1024)  < 10
        
        if (!isType) {
            this.$message.error(`只能上传${this.fileType}文件!`)
        } else if (!isLimit) {
            this.$message.error('上传头像图片大小不能超过 10M!')
        }
        let isOk =  isType && isLimit

        // 上传验证
        if (isOk)  {
          this.name = file.name
        }
        this.$refs.upload.clearFiles()
        return isOk
      },
      clearFileName () {
        this.name = '点击选择文件'
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
    .default-upload-container {
        box-sizing: border-box;
        width: 280px;
        height: 40px;
        border-radius: 4px;
        border: 1px solid #DDDDDD;
        background: rgba(255, 255, 255, 0.35);
        color: #C2C4CC;
        font-size: 13px;
        line-height: 40px;
        text-align: left;
        padding-left: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>

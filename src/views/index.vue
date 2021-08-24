<template>
    <div >
        <div class="myIndex">
            <div>我是首页</div>
            <!-- <div class="guidelines">
                <div id="some-element1">第一步</div>
                <div id="some-element2">第二步</div>
            </div> -->
        </div> 
        
    </div>
</template>

<script>
// import driverStep from "@/common/driver.js"
export default {
    name:'index',
    data() {
        return {

        }
    },
    mounted() {
        // this.$driver.defineSteps(driverStep)
        // this.$driver.start()
    }
}
</script>

<style lang="less" scoped>
  .myIndex {
      height: 2000px;
      background: #fff;
  }
  .guidelines {
      #some-element2 {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
      }
  }
</style>
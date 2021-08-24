<template>
    <div class="searchLine">
        <div class="searchTitle">{{title}}</div>
        <div class="searchOptions">
            <div class="item" 
                :class="index == currentIndex ? 'cur' : ''" 
                v-for="(item, index) in options" 
                :key="index"
                @click="handleClick(index, item)"
            >{{item.name}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'OtsSearchLine',
    props: {
        title: {
            type: String,
            require: true
        },
        options: {
            type: Array,
            require: true
        }
    },
    data () {
        return {
            currentIndex: 0
        }
    },
    methods: {
        handleClick (id, item) {
            this.currentIndex = id
            this.$emit('changeOption', item)
        }
    }
}
</script>
<style lang="less" scoped>
    .searchLine {
        display: flex;
        // align-items: center;
        margin-bottom: 14px;
        .searchTitle {
            margin-top: 4px;
            flex-shrink: 0;
            color: #9DA0A6;
            margin-right: 20px;
        }
        .searchOptions {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .item {
                flex-shrink: 0;
                cursor: pointer;
                margin-right: 10px;
                padding: 4px 10px;
            }
            .item.cur{
                background: #EBF5FF;
                border-radius: 2px;
                color: #006AFF;
            }
            
        }
    }
</style>
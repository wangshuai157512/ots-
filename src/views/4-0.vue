<template>
    <div>
        跳转中。。。
    </div>
</template>
<script>
export default {
    name: '',
    created () {
        if (process.env.NODE_ENV == 'production') {
            
            const str = window.location.href
            const list = str.split('v5')
            let html = this.$route.meta.pageHtml
            const goUrl = `${list[0]}${html}`
            window.location.href = goUrl
        }
    }
}
</script>
<style scoped>
</style>
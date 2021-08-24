<template>
    <div class="layoutOne">
        <ots-main-title :mainTopBtn='mainTopBtn'></ots-main-title>
        <div class="main">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name: 'LayoutOne',
    props: ['mainTopBtn']
}
</script>
<style scoped>
.layoutOne {
    width: 100%;
    height: 100%;
}
.main {
    background-color: #fff;
    padding: 20px;
}
</style>
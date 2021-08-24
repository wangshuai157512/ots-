<template>
    <div>
        <ots-table v-bind='$attrs' v-on='$listeners'></ots-table>
        <ots-pagination v-bind='$attrs' v-on='$listeners'></ots-pagination>
    </div>
</template>
<script>
  export default {
    name: 'OtsTableGroup', 
  }
</script>

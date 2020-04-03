<template>
    <div class="alert alert-success">
        <!-- {{msg}} -->
    </div>
</template>
<script>
export default {
    props:['msg']
}
</script>
<style scoped>
.alert{
border-radius: 0px;
}

.alert-success{
background-color: green;
color: #ffffff
}
</style>
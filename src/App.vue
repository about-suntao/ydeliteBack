<template>
    <div>
        <el-config-provider :locale="locale">
            <router-view></router-view>
        </el-config-provider>
    </div>
</template>

<script setup lang="ts">
    import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

    const locale = zhCn
</script>

<style scoped lang="scss"></style>

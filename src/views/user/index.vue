<script setup lang="ts">
import { getFastGptAnswer } from '@/api'

const fastgpt = () => {
  getFastGptAnswer({ question: '你好' }).then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <div>
    <el-button>文字转语音</el-button>
    <el-button>语音转文字</el-button>
    <el-button @click="fastgpt">fastgpt</el-button>
  </div>
</template>

<style lang="less" scoped>

</style>

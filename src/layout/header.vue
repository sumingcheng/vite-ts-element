<script setup lang="ts">
import { useI18nEnhanced } from '@/hooks/useI18nEnhanced.ts'
import { getData } from '@/api'

const { t, changeLanguage, currentLocale } = useI18nEnhanced()

function switchLanguage() {
  currentLocale.value === 'en' ? changeLanguage('zh') : changeLanguage('en')
}

const language = computed(() => {
  return currentLocale.value === 'en' ? '中文' : 'English'
})

const data = ref('')

async function getDataFromAPI() {
  data.value = await getData()
  console.log(toRaw(data.value))
}
</script>

<template>
  <div>
    <el-button>{{ t('message.home') }}</el-button>
    <el-button @click="switchLanguage">
      {{ language }}
    </el-button>
    <el-button @click="getDataFromAPI">
      获取数据测试
    </el-button>
    <p>{{ data }}</p>
  </div>
</template>

<style lang="less" scoped>

</style>

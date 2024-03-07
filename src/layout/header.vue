<script setup lang="ts">
import { useI18nEnhanced } from '@/hooks/useI18nEnhanced.ts'

const { t, changeLanguage, currentLocale } = useI18nEnhanced()

function switchLanguage() {
  currentLocale.value === 'en' ? changeLanguage('zh') : changeLanguage('en')
}

const language = computed(() => {
  return currentLocale.value === 'en' ? '中文' : 'English'
})
</script>

<template>
  <div>
    <el-button>{{ t('message.home') }}</el-button>
    <el-button @click="switchLanguage">
      {{ language }}
    </el-button>
  </div>
</template>

<style lang="less" scoped>

</style>

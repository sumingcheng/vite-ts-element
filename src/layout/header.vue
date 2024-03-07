<template>
  <div>
    <el-button>{{ t('message.home') }}</el-button>
    <el-button @click="switchLanguage">{{ language }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { useI18nEnhanced } from '@/hooks/useI18nEnhanced.ts';
import { computed } from "vue";

const { t, changeLanguage, currentLocale } = useI18nEnhanced();

const switchLanguage = () => {
  currentLocale.value === 'en' ? changeLanguage('zh') : changeLanguage('en');
};

const language = computed(() => {
  return currentLocale.value === 'en' ? '中文' : 'English';
});

</script>

<style lang="less" scoped>

</style>

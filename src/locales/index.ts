import { createI18n } from 'vue-i18n';
import en from './en';
import zh from './zh';

const messages = {
  en,
  zh,
};

const i18n = createI18n({
  legacy: false,
  locale: 'zh', // 默认语言
  fallbackLocale: 'zh', // 备用语言
  messages,
});

export default i18n;

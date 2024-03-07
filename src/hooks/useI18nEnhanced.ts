import { ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';

export function useI18nEnhanced(): {
  t: (key: string) => string;
  changeLanguage: (lang: string) => void;
  currentLocale: Ref<string>;
} {
  const { t, locale } = useI18n({ useScope: 'global' });
  const currentLocale = ref(locale.value);

  const changeLanguage = (lang: string) => {
    locale.value = lang;
    currentLocale.value = lang;
  };

  return { t, changeLanguage, currentLocale };
}

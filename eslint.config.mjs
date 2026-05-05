import tsParser from '@typescript-eslint/parser';
import coreWebVitals from 'eslint-config-next/core-web-vitals';

export default coreWebVitals.map((config) => {
  if (config.languageOptions?.parser) {
    return {
      ...config,
      languageOptions: { ...config.languageOptions, parser: tsParser },
    };
  }
  return config;
});

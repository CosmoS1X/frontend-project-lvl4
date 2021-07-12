import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorIndicator = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h2>{t('errorIndicator.h2')}</h2>
      <h4>{t('errorIndicator.h4')}</h4>
    </div>
  );
};
export default ErrorIndicator;

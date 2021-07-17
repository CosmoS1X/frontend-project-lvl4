import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container my-4">
      <div className="card text-center">
        <div className="card-body">
          <h1 className="card-title">{t('errors.error404')}</h1>
          <h2 className="card-text">{t('errors.pageNotFound')}</h2>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

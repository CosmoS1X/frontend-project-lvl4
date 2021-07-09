import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CardFooter = () => {
  const { t } = useTranslation();

  return (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>{t('noAccount')}</span>
        {' '}
        <Link to="/signup">{t('registration')}</Link>
      </div>
    </div>
  );
};

export default CardFooter;

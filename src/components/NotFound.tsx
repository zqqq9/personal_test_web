import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Meta from './Meta';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Meta
        title={t('errors.pageNotFound')}
        description={t('errors.pageNotFoundDescription')}
        keywords={['404', 'not found', 'error']}
        type="website"
        image="/404-og.jpg"
      />

      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">
            {t('errors.pageNotFound')}
          </h2>
          <p className="text-gray-400 mb-8 max-w-md">
            {t('errors.pageNotFoundDescription')}
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
          >
            <Home className="h-5 w-5 mr-2" />
            {t('common.backToHome')}
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound; 
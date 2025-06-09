import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  url?: string;
}

const Meta: React.FC<MetaProps> = ({
  title = 'PersonaLens - AI-Powered Personality Test',
  description = 'Discover your true personality with our scientifically validated personality test. Get detailed insights, career guidance, and personal growth recommendations.',
  keywords = ['personality test', 'career guidance', 'personal development', 'Big Five', 'psychology'],
  image = '/og-image.jpg',
  type = 'website',
  url = 'https://personalens.ai'
}) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <Helmet>
      <html lang={currentLanguage} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Alternate Language Links */}
      <link rel="alternate" hrefLang="en" href={`${url}/en`} />
      <link rel="alternate" hrefLang="zh" href={`${url}/zh`} />
      <link rel="alternate" hrefLang="es" href={`${url}/es`} />
      <link rel="alternate" hrefLang="ja" href={`${url}/ja`} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Helmet>
  );
};

export default Meta; 
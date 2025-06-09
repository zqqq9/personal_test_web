import { useTranslation } from 'react-i18next';
import { Book, Clock, User, Tag } from 'lucide-react';
import Meta from './Meta';

interface BlogProps {
  onPostClick: (postId: string) => void;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding the Big Five Personality Traits',
    excerpt: 'Dive deep into the science behind the five major dimensions of personality: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
    author: 'Dr. Sarah Chen',
    date: '2024-03-15',
    readTime: '8 min',
    tags: ['Personality', 'Psychology', 'Big Five', 'Research'],
    image: '/blog/big-five.jpg'
  },
  {
    id: '2',
    title: 'How Personality Shapes Career Success',
    excerpt: 'Explore the crucial role of personality traits in career development and learn how to leverage your unique characteristics for professional growth.',
    author: 'Michael Rodriguez',
    date: '2024-03-12',
    readTime: '6 min',
    tags: ['Career', 'Professional Development', 'Success'],
    image: '/blog/career-success.jpg'
  },
  {
    id: '3',
    title: 'Personality Tests in Modern Recruitment',
    excerpt: 'Learn how companies use personality assessments in their hiring process and how to prepare for these evaluations in your job search.',
    author: 'Emma Thompson',
    date: '2024-03-10',
    readTime: '7 min',
    tags: ['Recruitment', 'HR', 'Job Search', 'Assessment'],
    image: '/blog/recruitment.jpg'
  }
];

const Blog: React.FC<BlogProps> = ({ onPostClick }) => {
  const { t } = useTranslation();

  const handlePostClick = (postId: string) => {
    if (onPostClick) {
      onPostClick(postId);
    }
  };

  return (
    <>
      <Meta
        title={t('blog.title')}
        description="Explore insights about personality psychology, career development, and personal growth. Learn how understanding your personality can lead to better life choices."
        keywords={[
          'personality blog',
          'psychology articles',
          'career development',
          'personal growth',
          'Big Five personality',
          'personality insights'
        ]}
        type="website"
        image="/blog/blog-og.jpg"
      />
      
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">{t('blog.title')}</h1>
          
          {/* Featured Post */}
          <div 
            className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-8 mb-12 border border-purple-400/30 cursor-pointer hover:border-purple-400/50 transition-all duration-300"
            onClick={() => handlePostClick(blogPosts[0].id)}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-64 rounded-xl overflow-hidden">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-purple-400">{blogPosts[0].date}</span>
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{blogPosts[0].title}</h2>
                <p className="text-gray-300 mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-400">
                    <User className="h-4 w-4 mr-1" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blogPosts[0].tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/10 text-white px-2 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <h2 className="text-2xl font-bold text-white mb-6">{t('blog.recentPosts')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article
                key={post.id}
                className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden hover:bg-white/15 transition-colors duration-300 cursor-pointer"
                onClick={() => handlePostClick(post.id)}
              >
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-purple-400">{post.date}</span>
                    <div className="flex items-center text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                  <p className="text-gray-300 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <button 
                      className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePostClick(post.id);
                      }}
                    >
                      {t('blog.readMore')} →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Tags Section */}
          <div className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              Popular Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map((tag) => (
                <button
                  key={tag}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm transition-colors duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog; 
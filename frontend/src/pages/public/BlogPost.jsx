import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Sparkles, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import PostsAPI from '../../api/posts.js';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PostsAPI.getPublicOne(id).then((res) => setPost(res.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="dark:bg-[#080C14] bg-gray-50 min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="dark:bg-[#080C14] bg-gray-50 min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl font-bold dark:text-white text-gray-900 mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>404</p>
          <p className="dark:text-gray-400 text-gray-500 mb-6">Post not found.</p>
          <Link to="/blog" className="text-cyan-500 font-semibold text-sm">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const readTime = Math.ceil((post.body?.split(' ').length || 0) / 200);

  return (
    <div className="dark:bg-[#080C14] bg-gray-50 min-h-screen pt-24 pb-20 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm dark:text-gray-500 text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors mb-12 group font-medium">
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags?.map((tag) => (
              <span key={tag} className="text-xs dark:bg-cyan-500/10 bg-cyan-50 dark:text-cyan-400 text-cyan-600 px-3 py-1 rounded-full font-semibold border dark:border-cyan-500/20 border-cyan-200">
                {tag}
              </span>
            ))}
            {post.ai_generated && (
              <span className="text-xs dark:bg-violet-500/10 bg-violet-50 dark:text-violet-400 text-violet-600 px-3 py-1 rounded-full font-semibold flex items-center gap-1 border dark:border-violet-500/20 border-violet-200">
                <Sparkles size={10} /> AI Generated
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900 mb-6 leading-tight tracking-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            {post.title}
          </h1>

          <div className="flex items-center gap-5 mb-10 pb-10 border-b dark:border-white/5 border-gray-200">
            <div className="flex items-center gap-2 text-sm dark:text-gray-500 text-gray-400">
              <Calendar size={13} />
              {post.published_at ? format(new Date(post.published_at), 'MMMM d, yyyy') : ''}
            </div>
            <div className="flex items-center gap-2 text-sm dark:text-gray-500 text-gray-400">
              <Clock size={13} />
              {readTime} min read
            </div>
          </div>

          {post.cover_url && (
            <img src={post.cover_url} alt={post.title} className="w-full h-64 md:h-80 object-cover rounded-2xl mb-10 shadow-2xl" />
          )}

          <div className="dark:text-gray-300 text-gray-600 leading-relaxed text-base whitespace-pre-wrap" style={{ lineHeight: '1.85' }}>
            {post.body}
          </div>

          <div className="mt-16 pt-10 border-t dark:border-white/5 border-gray-200">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-500 hover:text-cyan-400 transition-colors group">
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
              Back to all posts
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
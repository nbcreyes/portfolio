import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Sparkles } from 'lucide-react';
import PostsAPI from '../../api/posts.js';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PostsAPI.getPublicOne(id)
      .then((res) => setPost(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-950 min-h-screen pt-24 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-white dark:bg-gray-950 min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Post not found.</p>
          <Link to="/blog" className="text-indigo-500 hover:text-indigo-600">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={15} />
          Back to Blog
        </Link>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-4">
          {post.tags?.map((tag) => (
            <span key={tag} className="text-xs bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-full font-medium">
              {tag}
            </span>
          ))}
          {post.ai_generated && (
            <span className="text-xs bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
              <Sparkles size={11} />
              AI Generated
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <p className="text-sm text-gray-400 mb-8">
          {post.published_at ? format(new Date(post.published_at), 'MMMM d, yyyy') : ''}
        </p>

        {/* Cover image */}
        {post.cover_url && (
          <img
            src={post.cover_url}
            alt={post.title}
            className="w-full h-64 object-cover rounded-2xl mb-8"
          />
        )}

        {/* Body */}
        <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {post.body}
        </div>
      </div>
    </div>
  );
}
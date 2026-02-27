import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.id}`}
      className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/5 block"
    >
      <div className="flex gap-2 flex-wrap mb-3">
        {post.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-full font-medium">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <span className="text-xs text-gray-400">
          {post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : ''}
        </span>
        <span className="text-xs font-medium text-indigo-500 flex items-center gap-1 group-hover:gap-2 transition-all">
          Read more <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}
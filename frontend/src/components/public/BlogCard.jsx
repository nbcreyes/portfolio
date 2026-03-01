import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogCard({ post, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/blog/${post.id}`}
        className="group block dark:bg-white/[0.03] bg-white border dark:border-white/[0.07] border-gray-200/80 rounded-2xl p-6 hover:dark:border-cyan-500/25 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-xl dark:hover:shadow-cyan-500/5 hover:shadow-cyan-500/10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="flex gap-1.5 flex-wrap mb-4">
          {post.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs dark:bg-cyan-500/10 bg-cyan-50 dark:text-cyan-400 text-cyan-600 px-2.5 py-0.5 rounded-full font-medium border dark:border-cyan-500/20 border-cyan-200">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-semibold dark:text-white text-gray-900 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug mb-2 text-base" style={{ fontFamily: 'Clash Display, sans-serif' }}>
          {post.title}
        </h3>
        <p className="text-sm dark:text-gray-400 text-gray-500 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-5 pt-4 border-t dark:border-white/5 border-gray-100">
          <span className="text-xs dark:text-gray-600 text-gray-400 font-medium">
            {post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : ''}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-cyan-500 dark:text-cyan-400 group-hover:gap-2 transition-all duration-200">
            Read <ArrowUpRight size={13} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
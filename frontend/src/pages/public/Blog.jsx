import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BlogCard from '../../components/public/BlogCard.jsx';
import PostsAPI from '../../api/posts.js';
import { Search } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    PostsAPI.getPublished().then((res) => setPosts(res.data)).finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dark:bg-[#080C14] bg-gray-50 min-h-screen pt-24 pb-20 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-14">
          <p className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-4">Blog</p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight dark:text-white text-gray-900 mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            My <span className="gradient-text">Writing</span>
          </h1>
          <p className="dark:text-gray-400 text-gray-500 max-w-lg text-base leading-relaxed">
            Thoughts, tutorials, and things I learn along the way.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }} className="relative max-w-md mb-12">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-gray-500 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full dark:bg-white/[0.04] bg-white border dark:border-white/[0.08] border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-sm dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all"
          />
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {filtered.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
            {filtered.length === 0 && <p className="dark:text-gray-500 text-gray-400 col-span-3 text-sm">No posts found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
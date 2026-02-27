import { useEffect, useState } from 'react';
import BlogCard from '../../components/public/BlogCard.jsx';
import PostsAPI from '../../api/posts.js';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    PostsAPI.getPublished()
      .then((res) => setPosts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-2">
          Blog
        </h1>
        <div className="w-12 h-1 bg-indigo-500 rounded mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Thoughts, tutorials, and things I learn along the way.
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 mb-8 transition-colors"
        />

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
            {filtered.length === 0 && (
              <p className="text-gray-400 col-span-3">No posts found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
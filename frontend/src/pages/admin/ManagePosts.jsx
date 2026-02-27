import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Sparkles } from 'lucide-react';
import PostsAPI from '../../api/posts.js';
import toast from 'react-hot-toast';

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchPosts = () => {
    PostsAPI.getAll()
      .then((res) => setPosts(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    try {
      await PostsAPI.delete(id);
      toast.success('Post deleted.');
      fetchPosts();
    } catch {
      toast.error('Failed to delete post.');
    }
  };

  const filtered = filter === 'all'
    ? posts
    : posts.filter((p) => p.status === filter);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Posts</h1>
          <p className="text-gray-400 text-sm mt-1">{posts.length} total posts</p>
        </div>
        <Link
          to="/admin/posts/new"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'published', 'draft', 'scheduled'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
              filter === f
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-xs text-gray-500 font-medium px-6 py-3 uppercase tracking-wider">Title</th>
              <th className="text-left text-xs text-gray-500 font-medium px-6 py-3 uppercase tracking-wider">Status</th>
              <th className="text-left text-xs text-gray-500 font-medium px-6 py-3 uppercase tracking-wider">Tags</th>
              <th className="text-left text-xs text-gray-500 font-medium px-6 py-3 uppercase tracking-wider">Date</th>
              <th className="text-left text-xs text-gray-500 font-medium px-6 py-3 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-500 text-sm">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-500 text-sm">No posts found.</td></tr>
            ) : (
              filtered.map((post) => (
                <tr key={post.id} className="hover:bg-gray-800/40 transition-all">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-white">{post.title}</p>
                    {post.ai_generated && (
                      <span className="text-xs text-purple-400 flex items-center gap-1 mt-0.5">
                        <Sparkles size={10} /> AI Generated
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      post.status === 'published' ? 'bg-green-400/10 text-green-400' :
                      post.status === 'scheduled' ? 'bg-blue-400/10 text-blue-400' :
                      'bg-yellow-400/10 text-yellow-400'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {post.tags && post.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/posts/${post.id}`}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                      >
                        <Pencil size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
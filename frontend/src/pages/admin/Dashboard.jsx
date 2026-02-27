import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Calendar, MessageSquare, Plus } from 'lucide-react';
import PostsAPI from '../../api/posts.js';
import ProjectsAPI from '../../api/projects.js';
import ContactAPI from '../../api/contact.js';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      PostsAPI.getAll(),
      ProjectsAPI.getAll(),
      ContactAPI.getAll(),
    ]).then(([p, pr, c]) => {
      setPosts(p.data);
      setProjects(pr.data);
      setContacts(c.data);
    }).finally(() => setLoading(false));
  }, []);

  const published = posts.filter((p) => p.status === 'published').length;
  const drafts = posts.filter((p) => p.status === 'draft').length;
  const scheduled = posts.filter((p) => p.status === 'scheduled').length;
  const unread = contacts.filter((c) => !c.read).length;

  const stats = [
    { label: 'Total Posts', value: posts.length, icon: FileText, color: 'text-indigo-400', bg: 'bg-indigo-400/10', to: '/admin/posts' },
    { label: 'Published', value: published, icon: FileText, color: 'text-green-400', bg: 'bg-green-400/10', to: '/admin/posts' },
    { label: 'Drafts', value: drafts, icon: FileText, color: 'text-yellow-400', bg: 'bg-yellow-400/10', to: '/admin/posts' },
    { label: 'Scheduled', value: scheduled, icon: Calendar, color: 'text-blue-400', bg: 'bg-blue-400/10', to: '/admin/schedule' },
    { label: 'Projects', value: projects.length, icon: Briefcase, color: 'text-purple-400', bg: 'bg-purple-400/10', to: '/admin/projects' },
    { label: 'Unread Messages', value: unread, icon: MessageSquare, color: 'text-rose-400', bg: 'bg-rose-400/10', to: '/admin/contacts' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back. Here is your overview.</p>
        </div>
        <Link
          to="/admin/posts/new"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg, to }) => (
          <Link key={label} to={to} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all">
            <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="font-semibold text-white text-sm">Recent Posts</h2>
          <Link to="/admin/posts" className="text-xs text-indigo-400 hover:text-indigo-300">
            View all
          </Link>
        </div>
        <div className="divide-y divide-gray-800">
          {posts.slice(0, 5).map((post) => (
            <div key={post.id} className="flex items-center justify-between px-6 py-3.5">
              <div>
                <p className="text-sm font-medium text-white">{post.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                post.status === 'published' ? 'bg-green-400/10 text-green-400' :
                post.status === 'scheduled' ? 'bg-blue-400/10 text-blue-400' :
                'bg-yellow-400/10 text-yellow-400'
              }`}>
                {post.status}
              </span>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500 text-sm">
              No posts yet.{' '}
              <Link to="/admin/posts/new" className="text-indigo-400 hover:text-indigo-300">
                Create your first post
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="font-semibold text-white text-sm">Recent Messages</h2>
          <Link to="/admin/contacts" className="text-xs text-indigo-400 hover:text-indigo-300">
            View all
          </Link>
        </div>
        <div className="divide-y divide-gray-800">
          {contacts.slice(0, 3).map((c) => (
            <div key={c.id} className="flex items-start justify-between px-6 py-3.5 gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{c.name}</p>
                  {!c.read && (
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0"></span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{c.message}</p>
              </div>
              <p className="text-xs text-gray-500 shrink-0">
                {new Date(c.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
          {contacts.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500 text-sm">
              No messages yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
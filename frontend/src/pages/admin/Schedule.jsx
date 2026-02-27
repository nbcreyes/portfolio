import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Pencil } from 'lucide-react';
import PostsAPI from '../../api/posts.js';
import { format } from 'date-fns';

export default function Schedule() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PostsAPI.getAll()
      .then((res) => setPosts(res.data.filter((p) => p.status === 'scheduled')))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Schedule</h1>
          <p className="text-gray-400 text-sm mt-1">
            {posts.length} post{posts.length !== 1 ? 's' : ''} scheduled for auto-publish
          </p>
        </div>
        <Link
          to="/admin/posts/new"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
        >
          <Calendar size={16} />
          Schedule New Post
        </Link>
      </div>

      {/* Info */}
      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
        <Clock size={17} className="text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-indigo-300 font-medium">Auto-publish is active</p>
          <p className="text-xs text-indigo-400/70 mt-0.5">
            The scheduler checks every minute and automatically publishes posts when their scheduled time arrives.
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : posts.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
          <Calendar size={32} className="text-gray-700 mx-auto mb-3" />
          <p className="text-gray-400 font-medium text-sm">No scheduled posts</p>
          <p className="text-gray-600 text-xs mt-1">
            Create a post and set its status to Scheduled to auto-publish it.
          </p>
          <Link
            to="/admin/posts/new"
            className="inline-flex items-center gap-2 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
          >
            Create Scheduled Post
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts
            .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))
            .map((post) => (
              <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-5 flex items-center justify-between hover:border-gray-700 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-400/10 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{post.title}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock size={11} className="text-gray-500" />
                      <p className="text-xs text-gray-400">
                        {post.scheduled_at
                          ? format(new Date(post.scheduled_at), 'PPP p')
                          : 'No date set'}
                      </p>
                    </div>
                    <div className="flex gap-1 mt-1.5">
                      {post.tags && post.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Link
                  to={`/admin/posts/${post.id}`}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-all"
                >
                  <Pencil size={13} />
                  Edit
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
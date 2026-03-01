import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../../components/public/ProjectCard.jsx';
import ProjectsAPI from '../../api/projects.js';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    ProjectsAPI.getAll().then((res) => setProjects(res.data)).finally(() => setLoading(false));
  }, []);

  const allTags = [...new Set(projects.flatMap((p) => p.tags || []))];
  const filtered = filter === 'all' ? projects : projects.filter((p) => p.tags?.includes(filter));

  return (
    <div className="dark:bg-[#080C14] bg-gray-50 min-h-screen pt-24 pb-20 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-14">
          <p className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-4">Portfolio</p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight dark:text-white text-gray-900 mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="dark:text-gray-400 text-gray-500 max-w-lg text-base leading-relaxed">
            A collection of things I have built — from side projects to full production applications.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }} className="flex gap-2 flex-wrap mb-12">
          {['all', ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-2xl text-sm font-medium capitalize transition-all duration-200 ${
                filter === tag
                  ? 'bg-cyan-500 text-white glow-btn'
                  : 'dark:bg-white/[0.04] bg-white border dark:border-white/[0.08] border-gray-200 dark:text-gray-400 text-gray-500 hover:dark:border-cyan-500/30 hover:border-cyan-300 hover:text-cyan-500 dark:hover:text-cyan-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {filtered.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
            {filtered.length === 0 && <p className="dark:text-gray-500 text-gray-400 col-span-3 text-sm">No projects found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import ProjectCard from '../../components/public/ProjectCard.jsx';
import ProjectsAPI from '../../api/projects.js';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    ProjectsAPI.getAll()
      .then((res) => setProjects(res.data))
      .finally(() => setLoading(false));
  }, []);

  const allTags = [...new Set(projects.flatMap((p) => p.tags || []))];
  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.tags?.includes(filter));

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-2">
          Projects
        </h1>
        <div className="w-12 h-1 bg-indigo-500 rounded mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Things I have built — from side projects to full applications.
        </p>

        {/* Tag filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
                filter === tag
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {filtered.length === 0 && (
              <p className="text-gray-400 col-span-3">No projects found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all hover:shadow-lg group">
      {/* Thumbnail */}
      <div className="h-44 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center relative overflow-hidden">
        {project.cover_url ? (
          <img
            src={project.cover_url}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl font-black text-indigo-400/40 tracking-widest uppercase group-hover:scale-110 transition-transform">
            {project.name.charAt(0)}
          </span>
        )}
        {project.featured && (
          <span className="absolute top-3 right-3 text-xs bg-indigo-500 text-white px-2.5 py-1 rounded-full font-medium">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap mt-3">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github size={13} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
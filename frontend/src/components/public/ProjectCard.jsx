import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative dark:bg-white/[0.03] bg-white border dark:border-white/[0.07] border-gray-200/80 rounded-2xl overflow-hidden hover:dark:border-cyan-500/25 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-xl dark:hover:shadow-cyan-500/5 hover:shadow-cyan-500/10"
    >
      <div className="relative h-44 dark:bg-gradient-to-br dark:from-cyan-500/10 dark:to-indigo-500/10 bg-gradient-to-br from-cyan-50 to-indigo-50 overflow-hidden flex items-center justify-center">
        {project.cover_url ? (
          <img src={project.cover_url} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <span className="text-6xl font-bold gradient-text opacity-20 group-hover:opacity-40 transition-all duration-300 select-none" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            {project.name.charAt(0)}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {project.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-cyan-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            Featured
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-semibold dark:text-white text-gray-900 text-base leading-snug" style={{ fontFamily: 'Clash Display, sans-serif' }}>
          {project.name}
        </h3>
        <p className="text-sm dark:text-gray-400 text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
        <div className="flex gap-1.5 flex-wrap mt-3">
          {project.tags && project.tags.map((tag) => (
            <span key={tag} className="text-xs dark:bg-white/5 bg-gray-100 dark:text-gray-400 text-gray-500 px-2.5 py-0.5 rounded-full border dark:border-white/5 border-gray-200">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4 pt-4 border-t dark:border-white/5 border-gray-100">
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-400 transition-colors">
              <ExternalLink size={12} /> Live Demo
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-medium dark:text-gray-500 text-gray-400 hover:dark:text-white hover:text-gray-900 transition-colors">
              <Github size={12} /> Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
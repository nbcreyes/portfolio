import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Neil Benedict Reyes. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/nbcreyes" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/neil-benedict-reyes-133a07338/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Linkedin size={18} />
          </a>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <Link to="/blog" className="hover:text-gray-900 dark:hover:text-white transition-colors">Blog</Link>
          <Link to="/projects" className="hover:text-gray-900 dark:hover:text-white transition-colors">Projects</Link>
          <Link to="/admin/login" className="hover:text-gray-900 dark:hover:text-white transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
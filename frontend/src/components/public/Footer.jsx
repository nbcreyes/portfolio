import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t dark:border-white/5 border-gray-200/50 dark:bg-gray-950 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <p className="text-2xl font-bold dark:text-white text-gray-900 mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              NBR<span className="gradient-text">.</span>
            </p>
            <p className="text-sm dark:text-gray-500 text-gray-400 max-w-xs leading-relaxed">
              Full-stack developer building clean, functional, and scalable web applications.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest dark:text-gray-600 text-gray-400 mb-1">Navigation</p>
            {[
              { to: '/projects', label: 'Projects' },
              { to: '/blog', label: 'Blog' },
              { to: '/contact', label: 'Contact' },
              { to: '/admin/login', label: 'Admin' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="text-sm dark:text-gray-400 text-gray-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest dark:text-gray-600 text-gray-400 mb-1">Connect</p>
            {[
              { href: 'https://github.com/nbcreyes', icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/neil-benedict-reyes-133a07338/', icon: Linkedin, label: 'LinkedIn' },
              { href: 'mailto:neilbcreyes@gmail.com', icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t dark:border-white/5 border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs dark:text-gray-600 text-gray-400">
            &copy; {new Date().getFullYear()} Neil Benedict Reyes. All rights reserved.
          </p>
          <p className="text-xs dark:text-gray-600 text-gray-400">
            Built with React, Node.js & PostgreSQL
          </p>
        </div>
      </div>
    </footer>
  );
}
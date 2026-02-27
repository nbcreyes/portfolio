import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail, Download } from 'lucide-react';
import ProjectCard from '../../components/public/ProjectCard.jsx';
import BlogCard from '../../components/public/BlogCard.jsx';
import PostsAPI from '../../api/posts.js';
import ProjectsAPI from '../../api/projects.js';
import ContactAPI from '../../api/contact.js';
import toast from 'react-hot-toast';

const skills = [
  'React', 'Node.js', 'PostgreSQL', 'JavaScript', 'TypeScript',
  'Express', 'Tailwind CSS', 'Git', 'REST APIs', 'Docker',
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    ProjectsAPI.getFeatured().then((res) => setFeatured(res.data));
    PostsAPI.getLatest().then((res) => setLatest(res.data));
  }, []);

  const handleContact = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await ContactAPI.send(contact);
      toast.success('Message sent! I will get back to you soon.');
      setContact({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

      {/* Hero */}
      <section className="min-h-screen flex items-center pt-16">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center md:text-left">
          <span className="inline-block text-sm font-medium text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full mb-6">
            Available for work
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            Hi, I'm <br />
            <span className="text-indigo-500">Neil Benedict</span><br />Reyes.
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
            A full-stack developer who builds clean, functional, and scalable web applications. I love turning ideas into reality with code.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link
              to="/projects"
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all"
            >
              View Projects <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium px-6 py-3 rounded-xl shadow hover:scale-105 transform transition-all"
            >
              <Mail size={16} />
              Contact Me
            </Link>
          </div>
          <div className="flex items-center gap-4 mt-8 justify-center md:justify-start">
            <a href="https://github.com/nbcreyes" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/neil-benedict-reyes-133a07338/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-gradient-to-b from-gray-50 dark:from-gray-900/50 to-gray-100 dark:to-gray-950/80">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-black tracking-tight mb-2">About Me</h2>
          <div className="w-12 h-1 bg-indigo-500 rounded mb-10"></div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                I am a passionate full-stack developer with a love for building products that are both beautiful and functional. I specialize in JavaScript ecosystems — React on the frontend and Node.js on the backend.
              </p>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                When I am not coding, I enjoy writing about what I learn, contributing to open source, and exploring new technologies.
              </p>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors"
              >
                <Download size={15} />
                Download Resume
              </a>
            </div>
            <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl h-64 flex items-center justify-center shadow-lg">
              <span className="text-7xl font-black text-indigo-400/30 tracking-widest">NBR</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-black tracking-tight mb-2">Skills</h2>
          <div className="w-12 h-1 bg-indigo-500 rounded mb-10"></div>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-white/40 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-500/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-2">
            <h2 className="text-3xl font-black tracking-tight">Featured Projects</h2>
            <Link to="/projects" className="text-sm text-indigo-500 hover:text-indigo-600 font-medium flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="w-12 h-1 bg-indigo-500 rounded mb-10"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.length > 0 ? (
              featured.map((project) => (
                <div key={project.id} className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                  <ProjectCard project={project} />
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-3">No featured projects yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-2">
            <h2 className="text-3xl font-black tracking-tight">Latest Posts</h2>
            <Link to="/blog" className="text-sm text-indigo-500 hover:text-indigo-600 font-medium flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="w-12 h-1 bg-indigo-500 rounded mb-10"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {latest.length > 0 ? (
              latest.map((post) => (
                <div key={post.id} className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                  <BlogCard post={post} />
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-3">No posts yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 dark:from-gray-900/50 to-gray-100 dark:to-gray-950/80">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-black tracking-tight mb-2">Get In Touch</h2>
          <div className="w-12 h-1 bg-indigo-500 rounded mb-10"></div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                Have a project in mind or just want to say hi? Fill out the form and I will get back to you as soon as possible.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <Mail size={16} className="text-indigo-500" /> neilbcreyes@gmail.com
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <Github size={16} className="text-indigo-500" /> github.com/nbcreyes
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <Linkedin size={16} className="text-indigo-500" /> linkedin.com/in/neil-benedict-reyes-133a07338
                </div>
              </div>
            </div>
            <form onSubmit={handleContact} className="space-y-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={contact.message}
                  onChange={(e) => setContact({ ...contact, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-all shadow hover:scale-105 transform"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail, Download, ArrowUpRight, Code2, Server, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import ProjectCard from '../../components/public/ProjectCard.jsx';
import BlogCard from '../../components/public/BlogCard.jsx';
import PostsAPI from '../../api/posts.js';
import ProjectsAPI from '../../api/projects.js';
import ContactAPI from '../../api/contact.js';
import toast from 'react-hot-toast';
import { useAnimateIn } from '../../hooks/useAnimateIn.js';

const skills = [
  { name: 'React' }, { name: 'Node.js' }, { name: 'PostgreSQL' },
  { name: 'JavaScript' }, { name: 'TypeScript' }, { name: 'Express' },
  { name: 'Tailwind CSS' }, { name: 'Git' }, { name: 'REST APIs' },
  { name: 'Docker' }, { name: 'Vite' }, { name: 'Figma' },
];

const SectionWrapper = ({ children }) => {
  const { ref, isInView } = useAnimateIn();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.21, 0.45, 0.27, 0.9] }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    ProjectsAPI.getFeatured().then((res) => setFeatured(res.data)).catch(() => {});
    PostsAPI.getLatest().then((res) => setLatest(res.data)).catch(() => {});
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
    <div className="dark:bg-[#080C14] bg-gray-50 dark:text-white text-gray-900 grain overflow-hidden">

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] rounded-full opacity-10 dark:opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', transform: 'translateX(-30%)' }} />
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto px-6 py-28 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 dark:bg-cyan-500/10 bg-cyan-50 dark:border-cyan-500/20 border border-cyan-200 text-cyan-600 dark:text-cyan-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide"
              >
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                Available for opportunities
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[clamp(3rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight mb-6"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >
                <span className="block dark:text-white text-gray-900">Neil</span>
                <span className="block gradient-text">Benedict</span>
                <span className="block dark:text-white text-gray-900">Reyes.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg dark:text-gray-400 text-gray-500 leading-relaxed mb-10 max-w-md"
              >
                Full-stack developer crafting clean, scalable web applications. I bridge the gap between great design and solid engineering.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link
                  to="/projects"
                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 glow-btn"
                >
                  View My Work <ArrowRight size={16} />
                </Link>
                <a
                  href="mailto:neilbcreyes@gmail.com"
                  className="flex items-center gap-2 dark:bg-white/5 bg-white dark:border-white/10 border border-gray-200 dark:text-white text-gray-900 font-semibold px-6 py-3 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:dark:border-white/20 hover:border-gray-300 backdrop-blur-xl"
                >
                  <Mail size={16} />
                  Get In Touch
                </a>
              </motion.div>

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-center gap-3"
              >
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
                    aria-label={label}
                    className="w-10 h-10 rounded-xl dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200 flex items-center justify-center dark:text-gray-400 text-gray-500 hover:text-cyan-500 dark:hover:text-cyan-400 hover:dark:border-cyan-500/30 hover:border-cyan-300 transition-all backdrop-blur-xl"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-3xl border dark:border-cyan-500/20 border-cyan-300/40 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-4 rounded-2xl border dark:border-indigo-500/20 border-indigo-300/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                <div className="absolute inset-8 dark:bg-white/5 bg-white/80 backdrop-blur-2xl rounded-2xl border dark:border-white/10 border-gray-200 flex flex-col items-center justify-center gap-4 shadow-2xl">
                  <span className="text-5xl font-bold gradient-text" style={{ fontFamily: 'Clash Display, sans-serif' }}>NBR</span>
                  <div className="flex gap-2">
                    {[Code2, Server, Database].map((Icon, i) => (
                      <div key={i} className="w-8 h-8 dark:bg-white/5 bg-gray-100 rounded-lg flex items-center justify-center dark:text-cyan-400 text-cyan-500">
                        <Icon size={14} />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs dark:text-gray-500 text-gray-400 text-center px-4">Full-Stack Developer</p>
                </div>
                <div className="absolute -top-3 -right-3 dark:bg-cyan-500/15 bg-cyan-50 border dark:border-cyan-500/30 border-cyan-200 rounded-xl px-3 py-1.5 text-xs font-semibold dark:text-cyan-400 text-cyan-600 backdrop-blur-xl">React</div>
                <div className="absolute -bottom-3 -left-3 dark:bg-indigo-500/15 bg-indigo-50 border dark:border-indigo-500/30 border-indigo-200 rounded-xl px-3 py-1.5 text-xs font-semibold dark:text-indigo-400 text-indigo-600 backdrop-blur-xl">Node.js</div>
                <div className="absolute top-1/2 -right-6 dark:bg-white/5 bg-white border dark:border-white/10 border-gray-200 rounded-xl px-3 py-1.5 text-xs font-semibold dark:text-gray-400 text-gray-600 backdrop-blur-xl -translate-y-1/2">PostgreSQL</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="relative py-28" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionWrapper>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-4">About Me</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  Building things<br />
                  <span className="gradient-text">people love</span> to use
                </h2>
                <p className="dark:text-gray-400 text-gray-500 leading-relaxed mb-4 text-base">
                  I'm a passionate full-stack developer from the Philippines with a love for building products that are both beautiful and functional. I specialize in the JavaScript ecosystem — React on the frontend, Node.js on the backend.
                </p>
                <p className="dark:text-gray-400 text-gray-500 leading-relaxed mb-8 text-base">
                  When I'm not coding, I enjoy writing about what I learn, contributing to open source, and exploring new technologies that push the web forward.
                </p>
                <a
                  href="/resume.pdf"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-500 hover:text-cyan-400 transition-colors group"
                >
                  <Download size={15} />
                  Download Resume
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '2+', label: 'Years Experience', desc: 'Building web apps' },
                  { value: '10+', label: 'Projects Built', desc: 'Frontend & backend' },
                  { value: '5+', label: 'Technologies', desc: 'In production' },
                  { value: '100%', label: 'Commitment', desc: 'To quality code' },
                ].map(({ value, label, desc }) => (
                  <div key={label} className="dark:bg-white/[0.03] bg-white border dark:border-white/[0.07] border-gray-200 rounded-2xl p-5 hover:dark:border-cyan-500/20 hover:border-cyan-300/50 transition-all">
                    <p className="text-3xl font-bold gradient-text mb-1" style={{ fontFamily: 'Clash Display, sans-serif' }}>{value}</p>
                    <p className="text-sm font-semibold dark:text-white text-gray-900">{label}</p>
                    <p className="text-xs dark:text-gray-500 text-gray-400 mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="relative py-28 dark:bg-white/[0.015] bg-white/60" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionWrapper>
            <p className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-4">Expertise</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-12" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              My <span className="gradient-text">Tech Stack</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="dark:bg-white/[0.04] bg-white border dark:border-white/[0.08] border-gray-200 dark:text-gray-300 text-gray-600 px-4 py-2.5 rounded-2xl text-sm font-medium hover:dark:border-cyan-500/30 hover:border-cyan-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:dark:bg-cyan-500/5 hover:bg-cyan-50 transition-all duration-200 cursor-default"
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="relative py-28" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionWrapper>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-4">Portfolio</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  Featured <span className="gradient-text">Work</span>
                </h2>
              </div>
              <Link to="/projects" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-cyan-500 hover:text-cyan-400 transition-colors group">
                All projects <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {featured.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
              {featured.length === 0 && <p className="dark:text-gray-500 text-gray-400 col-span-3 text-sm">No featured projects yet.</p>}
            </div>
            <div className="md:hidden mt-8 text-center">
              <Link to="/projects" className="text-sm font-semibold text-cyan-500">View all projects →</Link>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ── LATEST POSTS ── */}
      <section className="relative py-28 dark:bg-white/[0.015] bg-white/60" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionWrapper>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-4">Blog</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  Latest <span className="gradient-text">Writing</span>
                </h2>
              </div>
              <Link to="/blog" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-cyan-500 hover:text-cyan-400 transition-colors group">
                All posts <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {latest.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
              {latest.length === 0 && <p className="dark:text-gray-500 text-gray-400 col-span-3 text-sm">No posts yet.</p>}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="relative py-28" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionWrapper>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-4">Contact</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  Let's build<br />
                  <span className="gradient-text">something great</span>
                </h2>
                <p className="dark:text-gray-400 text-gray-500 leading-relaxed mb-10 text-base">
                  Have a project in mind or just want to connect? Fill out the form and I'll get back to you as soon as possible.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'neilbcreyes@gmail.com', href: 'mailto:neilbcreyes@gmail.com' },
                    { icon: Github, label: 'GitHub', value: 'github.com/nbcreyes', href: 'https://github.com/nbcreyes' },
                    { icon: Linkedin, label: 'LinkedIn', value: 'Neil Benedict Reyes', href: 'https://www.linkedin.com/in/neil-benedict-reyes-133a07338/' },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                      <div className="w-11 h-11 dark:bg-cyan-500/10 bg-cyan-50 border dark:border-cyan-500/20 border-cyan-200 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-cyan-500 transition-colors duration-200">
                        <Icon size={17} className="text-cyan-500 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs dark:text-gray-500 text-gray-400 font-medium">{label}</p>
                        <p className="text-sm font-semibold dark:text-white text-gray-900 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <form onSubmit={handleContact} className="space-y-4">
                {[
                  { label: 'Name', key: 'name', type: 'text', placeholder: 'John Doe' },
                  { label: 'Email', key: 'email', type: 'email', placeholder: 'john@example.com' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold uppercase tracking-wider dark:text-gray-500 text-gray-400 mb-2">{label}</label>
                    <input
                      type={type}
                      required
                      value={contact[key]}
                      onChange={(e) => setContact({ ...contact, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full dark:bg-white/[0.04] bg-white border dark:border-white/[0.08] border-gray-200 rounded-2xl px-4 py-3.5 text-sm dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 dark:focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider dark:text-gray-500 text-gray-400 mb-2">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={contact.message}
                    onChange={(e) => setContact({ ...contact, message: e.target.value })}
                    placeholder="Tell me about your project or just say hi..."
                    className="w-full dark:bg-white/[0.04] bg-white border dark:border-white/[0.08] border-gray-200 rounded-2xl px-4 py-3.5 text-sm dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 dark:focus:border-cyan-500/50 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-white font-semibold py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 glow-btn text-sm tracking-wide"
                >
                  {sending ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </div>
          </SectionWrapper>
        </div>
      </section>

    </div>
  );
}
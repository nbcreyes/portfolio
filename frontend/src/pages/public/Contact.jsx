import { useState } from 'react';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactAPI from '../../api/contact.js';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await ContactAPI.send(form);
      toast.success('Message sent! I will get back to you soon.');
      setForm({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const contacts = [
    { icon: Mail, label: 'Email', value: 'neilbcreyes@gmail.com', href: 'mailto:neilbcreyes@gmail.com' },
    { icon: Github, label: 'GitHub', value: 'github.com/nbcreyes', href: 'https://github.com/nbcreyes' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Neil Benedict Reyes', href: 'https://www.linkedin.com/in/neil-benedict-reyes-133a07338/' },
    { icon: MapPin, label: 'Location', value: 'Philippines', href: null },
  ];

  return (
    <div className="dark:bg-[#080C14] bg-gray-50 min-h-screen pt-24 pb-20 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-4">Contact</p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight dark:text-white text-gray-900 mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="dark:text-gray-400 text-gray-500 max-w-lg text-base leading-relaxed">
            Have a project in mind or just want to connect? I would love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="space-y-4 mb-10">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <div key={label}>
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 dark:bg-white/[0.04] bg-white border dark:border-white/[0.08] border-gray-200 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all duration-200">
                        <Icon size={18} className="dark:text-gray-400 text-gray-500 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs dark:text-gray-600 text-gray-400 font-medium uppercase tracking-wider">{label}</p>
                        <p className="text-sm font-semibold dark:text-white text-gray-900 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">{value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 dark:bg-white/[0.04] bg-white border dark:border-white/[0.08] border-gray-200 rounded-2xl flex items-center justify-center shrink-0">
                        <Icon size={18} className="dark:text-gray-400 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-xs dark:text-gray-600 text-gray-400 font-medium uppercase tracking-wider">{label}</p>
                        <p className="text-sm font-semibold dark:text-white text-gray-900">{value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Availability card */}
            <div className="dark:bg-cyan-500/5 bg-cyan-50 border dark:border-cyan-500/20 border-cyan-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <p className="text-sm font-semibold dark:text-cyan-400 text-cyan-600">Available for work</p>
              </div>
              <p className="text-xs dark:text-cyan-400/70 text-cyan-600/70 leading-relaxed">
                Currently open to full-time positions, freelance projects, and interesting collaborations.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {[
              { label: 'Your Name', key: 'name', type: 'text', placeholder: 'John Doe' },
              { label: 'Your Email', key: 'email', type: 'email', placeholder: 'john@example.com' },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-semibold uppercase tracking-wider dark:text-gray-500 text-gray-400 mb-2">{label}</label>
                <input
                  type={type}
                  required
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full dark:bg-white/[0.04] bg-white border dark:border-white/[0.08] border-gray-200 rounded-2xl px-4 py-3.5 text-sm dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider dark:text-gray-500 text-gray-400 mb-2">Message</label>
              <textarea
                required
                rows={7}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project or just say hi..."
                className="w-full dark:bg-white/[0.04] bg-white border dark:border-white/[0.08] border-gray-200 rounded-2xl px-4 py-3.5 text-sm dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-white font-semibold py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 glow-btn text-sm tracking-wide"
            >
              {sending ? 'Sending...' : 'Send Message →'}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
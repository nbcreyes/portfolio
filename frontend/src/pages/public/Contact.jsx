import { useState } from 'react';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';
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

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-2">
          Contact
        </h1>
        <div className="w-12 h-1 bg-indigo-500 rounded mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 mb-12">
          Have a project in mind or just want to say hi? I would love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Let's talk
            </h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">neilbcreyes@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Philippines</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Github size={18} className="text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">GitHub</p>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-indigo-500 hover:text-indigo-600">
                    github.com/nbcreyes
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Linkedin size={18} className="text-indigo-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">LinkedIn</p>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-sm text-indigo-500 hover:text-indigo-600">
                    linkedin.com/in/neil-benedict-reyes-133a07338
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project or just say hi..."
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-all"
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ExternalLink, Github } from 'lucide-react';
import ProjectsAPI from '../../api/projects.js';
import toast from 'react-hot-toast';

const emptyForm = {
  name: '', description: '', body: '',
  tags: '', url: '', github_url: '',
  cover_url: '', featured: false,
};

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchProjects = () => {
    ProjectsAPI.getAll()
      .then((res) => setProjects(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setForm({ ...project, tags: project.tags ? project.tags.join(', ') : '' });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editing) {
        await ProjectsAPI.update(editing.id, payload);
        toast.success('Project updated.');
      } else {
        await ProjectsAPI.create(payload);
        toast.success('Project created.');
      }
      setShowModal(false);
      fetchProjects();
    } catch {
      toast.error('Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await ProjectsAPI.delete(id);
      toast.success('Project deleted.');
      fetchProjects();
    } catch {
      toast.error('Failed to delete project.');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">{projects.length} projects</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all">
              <div className="h-36 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center">
                {project.cover_url ? (
                  <img src={project.cover_url} alt={project.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-black text-indigo-400/40 tracking-widest uppercase">
                    {project.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-white text-sm">{project.name}</h3>
                  {project.featured && (
                    <span className="text-xs bg-indigo-400/10 text-indigo-400 px-2 py-0.5 rounded-full shrink-0">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 line-clamp-2 mb-3">{project.description}</p>
                <div className="flex gap-1 flex-wrap mb-3">
                  {project.tags && project.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                  <div className="flex gap-2">
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-all">
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-all">
                        <Github size={14} />
                      </a>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(project)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-gray-500 text-sm col-span-3">No projects yet.</p>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <h2 className="font-semibold text-white">{editing ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white text-lg leading-none">x</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {[
                { label: 'Project Name', key: 'name', required: true, placeholder: 'My Project' },
                { label: 'Description', key: 'description', placeholder: 'Short description' },
                { label: 'Tags (comma separated)', key: 'tags', placeholder: 'react, node' },
                { label: 'Live URL', key: 'url', placeholder: 'https://' },
                { label: 'GitHub URL', key: 'github_url', placeholder: 'https://github.com/...' },
                { label: 'Cover Image URL', key: 'cover_url', placeholder: 'https://' },
              ].map(({ label, key, required, placeholder }) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 mb-1.5 block">{label}</label>
                  <input
                    type="text"
                    required={required}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              ))}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                <span className="text-sm text-gray-400">Featured project</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium py-2.5 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium py-2.5 rounded-xl transition-all"
                >
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
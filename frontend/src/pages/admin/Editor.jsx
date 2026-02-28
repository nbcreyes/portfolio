import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sparkles, Save, Send, Clock } from "lucide-react";
import PostsAPI from "../../api/posts.js";
import AIAPI from "../../api/ai.js";
import toast from "react-hot-toast";

const defaultForm = {
  title: "",
  body: "",
  excerpt: "",
  status: "draft",
  tags: "",
  cover_url: "",
  scheduled_at: "",
  ai_generated: false,
};

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState(defaultForm);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiTone, setAiTone] = useState("professional");
  const [aiLength, setAiLength] = useState("medium");
  const [aiLoading, setAiLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      PostsAPI.getOne(id).then((res) => {
        const post = res.data;
        setForm({
          ...post,
          tags: post.tags ? post.tags.join(", ") : "",
          scheduled_at: post.scheduled_at
            ? new Date(
                new Date(post.scheduled_at).getTime() -
                  new Date().getTimezoneOffset() * 60000,
              )
                .toISOString()
                .slice(0, 16)
            : "",
        });
      });
    }
  }, [id]);

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return toast.error("Enter a topic first.");
    setAiLoading(true);
    try {
      const res = await AIAPI.generateDraft({
        topic: aiPrompt,
        tone: aiTone,
        length: aiLength,
      });
      setForm((prev) => ({
        ...prev,
        title: res.data.title,
        body: res.data.body,
        excerpt: res.data.excerpt,
        tags: res.data.tags ? res.data.tags.join(", ") : "",
        ai_generated: true,
      }));
      toast.success("AI draft generated.");
    } catch {
      toast.error("AI generation failed. Check your Groq API key.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSave = async (status = form.status) => {
    if (!form.title.trim()) return toast.error("Title is required.");
    setSaving(true);
    try {
      const payload = {
        ...form,
        status,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        scheduled_at: form.scheduled_at
          ? new Date(form.scheduled_at).toISOString()
          : null,
      };
      if (isEditing) {
        await PostsAPI.update(id, payload);
        toast.success("Post updated.");
      } else {
        await PostsAPI.create(payload);
        toast.success("Post created.");
      }
      navigate("/admin/posts");
    } catch {
      toast.error("Failed to save post.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">
          {isEditing ? "Edit Post" : "New Post"}
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(form.status)}
            disabled={saving}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
          >
            <Save size={15} />
            Save
          </button>
          <button
            onClick={() => handleSave("published")}
            disabled={saving}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
          >
            <Send size={15} />
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Editor */}
        <div className="col-span-2 space-y-4">
          <input
            type="text"
            placeholder="Post title..."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 text-white text-xl font-semibold placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <textarea
            placeholder="Write your post content here..."
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            rows={20}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 text-white text-sm leading-relaxed placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          />
          <textarea
            placeholder="Short excerpt / summary..."
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-5 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* AI Generator */}
          <div className="bg-gray-900 border border-indigo-500/30 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-800 flex items-center gap-2">
              <Sparkles size={15} className="text-indigo-400" />
              <span className="text-sm font-semibold text-white">
                AI Draft Generator
              </span>
            </div>
            <div className="p-4 space-y-3">
              <textarea
                placeholder="e.g. How to build a REST API with Node.js"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Tone
                  </label>
                  <select
                    value={aiTone}
                    onChange={(e) => setAiTone(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="technical">Technical</option>
                    <option value="funny">Funny</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Length
                  </label>
                  <select
                    value={aiLength}
                    onChange={(e) => setAiLength(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleAIGenerate}
                disabled={aiLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={14} />
                {aiLoading ? "Generating..." : "Generate Draft"}
              </button>
            </div>
          </div>

          {/* Post Settings */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-800">
              <span className="text-sm font-semibold text-white">
                Post Settings
              </span>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="react, node, tutorial"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={form.cover_url}
                  onChange={(e) =>
                    setForm({ ...form, cover_url: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none"
                />
              </div>
              {form.status === "scheduled" && (
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1.5">
                    <Clock size={11} /> Schedule Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    value={form.scheduled_at}
                    onChange={(e) =>
                      setForm({ ...form, scheduled_at: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

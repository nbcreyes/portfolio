import { useEffect, useState } from 'react';
import { Trash2, MailOpen, Mail, Send } from 'lucide-react';
import ContactAPI from '../../api/contact.js';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [sending, setSending] = useState(false);

  const fetchContacts = () => {
    ContactAPI.getAll()
      .then((res) => setContacts(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleOpen = async (contact) => {
    setSelected(contact);
    setReplyMessage('');
    if (!contact.read) {
      try {
        await ContactAPI.markRead(contact.id);
        setContacts((prev) =>
          prev.map((c) => c.id === contact.id ? { ...c, read: true } : c)
        );
      } catch {
        // silently fail
      }
    }
  };

  const handleReply = async () => {
    if (!replyMessage.trim()) return toast.error('Write a reply first.');
    setSending(true);
    try {
      await ContactAPI.reply(selected.id, { replyMessage });
      toast.success(`Reply sent to ${selected.email}`);
      setReplyMessage('');
    } catch {
      toast.error('Failed to send reply.');
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await ContactAPI.delete(id);
      toast.success('Message deleted.');
      if (selected?.id === id) setSelected(null);
      fetchContacts();
    } catch {
      toast.error('Failed to delete message.');
    }
  };

  const unread = contacts.filter((c) => !c.read).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-gray-400 text-sm mt-1">
          {contacts.length} total — {unread} unread
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* List */}
        <div className="col-span-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          {loading ? (
            <p className="text-gray-500 text-sm p-6">Loading...</p>
          ) : contacts.length === 0 ? (
            <p className="text-gray-500 text-sm p-6">No messages yet.</p>
          ) : (
            <div className="divide-y divide-gray-800">
              {contacts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleOpen(c)}
                  className={`w-full text-left px-4 py-3.5 hover:bg-gray-800 transition-all ${
                    selected?.id === c.id ? 'bg-gray-800' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {!c.read
                        ? <Mail size={13} className="text-indigo-400 shrink-0 mt-0.5" />
                        : <MailOpen size={13} className="text-gray-600 shrink-0 mt-0.5" />
                      }
                      <p className={`text-sm font-medium truncate ${c.read ? 'text-gray-400' : 'text-white'}`}>
                        {c.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 shrink-0">
                      {format(new Date(c.created_at), 'MMM d')}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5 pl-5">{c.message}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail + Reply */}
        <div className="col-span-2 flex flex-col gap-4">
          {selected ? (
            <>
              {/* Message */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white">{selected.name}</h2>
                    <p className="text-sm text-indigo-400 mt-0.5">{selected.email}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(selected.created_at), 'PPP p')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="flex items-center gap-2 text-sm bg-gray-800 hover:bg-red-500/20 text-gray-400 hover:text-red-400 px-3 py-2 rounded-lg transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="bg-gray-800 rounded-xl p-5">
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>
              </div>

              {/* Reply Box */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Send size={14} className="text-indigo-400" />
                  Reply to {selected.name}
                </h3>
                <textarea
                  rows={5}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder={`Write your reply to ${selected.name}...`}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none transition-colors mb-3"
                />
                <button
                  onClick={handleReply}
                  disabled={sending}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
                >
                  <Send size={14} />
                  {sending ? 'Sending...' : `Send Reply to ${selected.email}`}
                </button>
              </div>
            </>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl h-full flex items-center justify-center text-center p-12">
              <div>
                <MailOpen size={32} className="text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Select a message to read and reply</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
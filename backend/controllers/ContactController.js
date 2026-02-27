import ContactModel from '../models/ContactModel.js';
import EmailService from '../services/EmailService.js';

const ContactController = {
  // Public — visitor sends a message
  async send(req, res) {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      const contact = await ContactModel.create({ name, email, message });

      // Send email notification to you
      try {
        await EmailService.sendContactNotification({ name, email, message });
      } catch (emailErr) {
        console.error('Email notification failed:', emailErr.message);
      }

      res.status(201).json({ message: 'Message sent successfully.', contact });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Admin — view all messages
  async getAll(req, res) {
    try {
      const contacts = await ContactModel.findAll();
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async markRead(req, res) {
    try {
      const contact = await ContactModel.markRead(req.params.id);
      res.json(contact);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await ContactModel.delete(req.params.id);
      res.json({ message: 'Message deleted.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Admin — reply to a visitor
  async reply(req, res) {
    try {
      const { replyMessage } = req.body;
      if (!replyMessage) {
        return res.status(400).json({ error: 'Reply message is required.' });
      }

      const contact = await ContactModel.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ error: 'Message not found.' });
      }

      await EmailService.sendReply({
        to: contact.email,
        name: contact.name,
        replyMessage,
      });

      // Mark as read after replying
      await ContactModel.markRead(req.params.id);

      res.json({ message: 'Reply sent successfully.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default ContactController;
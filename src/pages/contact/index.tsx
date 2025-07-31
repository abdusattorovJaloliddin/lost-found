import React, { useState } from 'react';

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Xabar yuborildi!\n\nIsm: ${name}\nEmail: ${email}\nXabar: ${message}`);
    setName('');
    setEmail('');
    setMessage('');
  };
  return (
    <div className="max-w-xl mx-auto p-6 mt-21 border shadow-md rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Biz bilan bog‘laning</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Ismingiz"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email manzilingiz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />
        <textarea
          placeholder="Xabaringizni yozing..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border p-3 rounded min-h-[120px]"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Yuborish
        </button>
      </form>
    </div>
  );
}

export default ContactPage;

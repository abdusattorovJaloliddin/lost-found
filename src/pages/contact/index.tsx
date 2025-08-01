import { useState } from 'react';

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
    <div className="flex justify-center px-4 sm:px-6 md:px-8 py-35">
      <div className="w-full max-w-screen-sm md:max-w-lg lg:max-w-xl bg-white border shadow-md rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-800">
          Biz bilan bog‘laning
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Ismingiz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <input
            type="email"
            placeholder="Email manzilingiz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <textarea
            placeholder="Xabaringizni yozing..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium text-lg px-4 py-3 rounded hover:bg-blue-700 transition w-full"
          >
            Yuborish
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;

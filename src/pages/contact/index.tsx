import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error('Iltimos, to‘g‘ri email kiriting!');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success('Xabar yuborildi!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex justify-center px-4 sm:px-6 md:px-8 py-20 bg-gray-50 min-h-screen">
      <div className="w-full max-w-screen-sm md:max-w-lg lg:max-w-xl bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-700 shadow-md rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
          Biz bilan bog‘laning
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Ismingiz"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email manzilingiz"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          >
            <option value="">Mavzuni tanlang</option>
            <option value="taklif">Taklif</option>
            <option value="shikoyat">Shikoyat</option>
            <option value="savol">Savol</option>
          </select>

          <textarea
            name="message"
            placeholder="Xabaringizni yozing..."
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded min-h-[120px] bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white font-medium text-lg px-4 py-3 rounded hover:bg-blue-700 transition w-full disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Yuborilmoqda...' : 'Yuborish'}
          </button>
        </form>

        <div className="mt-10 space-y-2 text-gray-700 dark:text-gray-300 text-center">
          <p><strong>Email:</strong> support@example.com</p>
          <p><strong>Telefon:</strong> +998 90 123 45 67</p>
          <p><strong>Manzil:</strong> Toshkent shahri, IT Park</p>
        </div>

        <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
          <p><strong>Ish vaqti:</strong> Dushanba–Juma, 9:00 – 18:00</p>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default ContactPage;

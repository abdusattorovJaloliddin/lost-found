import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddItemPage() {
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    location: '',
    date: '',
    status: '',
    islost: true,
    description: '',
  });
  const navigate = useNavigate();
  
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;

  const val =
    type === 'checkbox' && e.target instanceof HTMLInputElement
      ? e.target.checked
      : value;

  setFormData((prev) => ({
    ...prev,
    [name]: val,
  }));
};
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://6889fb974c55d5c739547780.mockapi.io/api/v1/items',
        formData
      );
      navigate('/home');
    } catch (err) {
      console.error('Qo‘shishda xatolik:', err);
      alert('Buyum qo‘shishda xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.');
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">Buyum qo‘shish</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Buyum nomi"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={handleFileChange}
          />
          {formData.avatar?.startsWith("data:image") && (
            <img
              src={formData.avatar}
              alt="Tanlangan rasm"
              className="w-32 h-32 object-cover rounded"
            />
          )}
          <input
            type="text"
            name="location"
            placeholder="Topilgan/yo‘qolgan joy"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-blue-500"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-blue-500"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Buyum haqida qisqacha"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-blue-500"
            value={formData.description}
            onChange={handleChange}
          />
          <select
            name="status"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-blue-500"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Statusni tanlang</option>
            <option value="topilgan">Topilgan</option>
            <option value="yo‘qolgan">Yo‘qolgan</option>
          </select>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="islost"
              checked={formData.islost}
              onChange={handleChange}
              className="accent-blue-600"
            />
            Yo‘qolgan (agar belgilanmasa, topilgan deb saqlanadi)
          </label>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg transition"
          >
            Saqlash
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItemPage;

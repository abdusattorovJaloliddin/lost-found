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
  const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("https://6889fb974c55d5c739547780.mockapi.io/api/v1/items", formData);
      navigate('/home');
    } catch (err) {
      console.error("Qo‘shishda xatolik:", err);
      alert("Buyum qo‘shishda xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.");
    }
  };
  return (
    <div className="container mx-auto px-4 py-15">
      <h2 className="text-2xl font-bold mb-6">Buyum qo‘shish</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          name="name"
          placeholder="Buyum nomi"
          className="w-full border p-2 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setFormData(prev => ({
                  ...prev,
                  avatar: reader.result as string, 
                }));
              };
              reader.readAsDataURL(file); 
            }
          }}
        />
        {formData.avatar && (
          <img src={formData.avatar} alt="Tanlangan rasm" className="w-32 h-32 object-cover" />
        )}
        <input
          type="text"
          name="location"
          placeholder="Topilgan/yo‘qolgan joy"
          className="w-full border p-2 rounded"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="w-full border p-2 rounded"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Buyum haqida qisqacha"
          className="w-full border p-2 rounded"
          value={formData.description}
          onChange={handleChange}
        />
        <select
          name="status"
          className="w-full border p-2 rounded"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="">Statusni tanlang</option>
          <option value="topilgan">Topilgan</option>
          <option value="yo‘qolgan">Yo‘qolgan</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="islost"
            checked={formData.islost}
            onChange={handleChange}
          />
          Yo‘qolgan (agar belgilanmasa, topilgan deb saqlanadi)
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all"
        >
          Saqlash
        </button>
      </form>
    </div>
  );
}

export default AddItemPage;

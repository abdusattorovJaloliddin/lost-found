import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete, MdEdit } from "react-icons/md";

type ItemType = {
  avatar: string;
  id: string;
  name: string;
  islost: boolean;
  description: string;
  date: string;
  location: string;
  status: string;
};

const HomePage = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editItem, setEditItem] = useState<ItemType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAvatar, setEditAvatar] = useState("");

  useEffect(() => {
    if (editItem) {
      setEditName(editItem.name);
      setEditDescription(editItem.description);
      setEditAvatar(editItem.avatar);
    }
  }, [editItem]);
  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get("https://6889fb974c55d5c739547780.mockapi.io/api/v1/items");
      const fixedData = res.data.map((item: any) => ({
        ...item,
        islost: item.islost ?? false,
      }));
      setItems(fixedData);
    };
    fetchItems();
  }, []);
  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Haqiqatan ham o‘chirmoqchimisiz?");
    if (!confirm) return;
    try {
      await axios.delete(`https://6889fb974c55d5c739547780.mockapi.io/api/v1/items/${id}`);
      setItems(items.filter(item => item.id !== id));
      toast.success("Topilma o‘chirildi");
    } catch (err) {
      toast.error("O‘chirishda xatolik yuz berdi");
    }
  };
  const handleEdit = (item: ItemType) => {
    setEditItem(item);
    setModalOpen(true);
  };
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;

    const updatedItem = {
      ...editItem,
      name: editName,
      description: editDescription,
      avatar: editAvatar
    };

    try {
      await axios.put(
        `https://6889fb974c55d5c739547780.mockapi.io/api/v1/items/${editItem.id}`,
        updatedItem
      );
      setItems(prev => prev.map(i => (i.id === editItem.id ? updatedItem : i)));
      setModalOpen(false);
      toast.success("Tahrirlandi");
    } catch {
      toast.error("Tahrirlashda xatolik");
    }
  };
  const handleStatusChange = async (id: string) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, status: "Topshirildi" } : item
    );
    setItems(updated);
    toast.success("Holat: Topshirildi");
    await axios.put(`https://6889fb974c55d5c739547780.mockapi.io/api/v1/items/${id}`, {
      status: "Topshirildi"
    });
  };
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesStatus = true;
    switch (filterStatus) {
      case "yo‘qolgan":
        matchesStatus = item.islost === true && item.status !== "Topshirildi";
        break;
      case "topilgan":
        matchesStatus = item.islost === false && item.status !== "Topshirildi";
        break;
      case "topshirildi":
        matchesStatus = item.status === "Topshirildi";
        break;
      case "all":
      default:
        matchesStatus = true;
        break;
    }
    return matchesSearch && matchesStatus;
  });
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mt-15">Lost & Found Board</h1>
      <div className="flex gap-4 mb-4">
        <input
          className="border px-4 py-2 rounded w-1/2"
          placeholder="Qidirish..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="all">Hammasi</option>
          <option value="yo‘qolgan">Faqat yo‘qolganlar</option>
          <option value="topilgan">Faqat topilganlar</option>
          <option value="topshirildi">Faqat topshirilganlar</option>
        </select>
      </div>
      <div className="p-4 bg-blue-50 rounded">
        <article className="text-lg font-medium text-gray-800">
          Xush kelibsiz! Bu platforma orqali siz topilgan yoki yo‘qolgan buyumlaringizni topishingiz mumkin.
        </article>
      </div>
      <div className="grid gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4 flex-1">
              {item.avatar && item.avatar.startsWith("data:image") && (
                <img src={item.avatar} alt="Rasm" className="..." />
              )}
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Holat:</span>{" "}
                  <span
                    className={`font-semibold ${item.status === "Topshirildi"
                      ? "text-green-600"
                      : "text-yellow-600"
                      }`}
                  >
                    {item.status}
                  </span>
                </p>
                {item.status !== "Topshirildi" ? (
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Yo‘qotilganmi:</span>{" "}
                    {item.islost ? "Ha" : "Yo‘q"}
                  </p>
                ) : null}

                <p className="text-sm text-gray-500">
                  <span className="font-medium">Topilgan joyi:</span> {item.location}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Sana:</span> {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-400">ID: {item.id}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap justify-end sm:justify-normal">
              <button
                onClick={() => handleEdit(item)}
                className="flex items-center gap-1 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium px-3 py-1 rounded transition"
              >
                <MdEdit /> Tahrirlash
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex items-center gap-1 border border-red-600 text-red-600 hover:bg-red-50 font-medium px-3 py-1 rounded transition"
              >
                <MdDelete /> O‘chirish
              </button>

              {item.status !== "Topshirildi" && (
                <button
                  onClick={() => handleStatusChange(item.id)}
                  className="bg-green-600 text-white font-medium px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Topshirildi
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {modalOpen && editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Buyumni tahrirlash</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="block mb-1 text-sm font-medium">Nomi:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm font-medium">Tavsif:</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Rasm (URL):</label>
                <input
                  type="text"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
                <div className="mt-2">
                  <img src={editAvatar} alt="Yangi rasm" className="h-24 object-cover rounded" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Bekor qilish
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
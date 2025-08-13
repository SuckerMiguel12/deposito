import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/items")
      .then(res => setItems(res.data))
      .catch(console.error);
  }, []);

  const addItem = () => {
    if (!name.trim()) return;
    axios.post("http://localhost:3000/items", { name })
      .then(res => {
        setItems([...items, res.data]);
        setName("");
      })
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-white p-8 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">Controle de Estoque</h1>
        <p className="mt-2 text-lg opacity-80">Gerencie seus itens com estilo!</p>
      </header>

      <section className="max-w-xl mx-auto bg-white bg-opacity-20 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Nome do item"
            className="flex-grow input input-bordered bg-white bg-opacity-70 text-black placeholder-gray-600"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button
            onClick={addItem}
            className="btn btn-primary bg-pink-600 hover:bg-pink-700 border-none text-white font-semibold shadow-lg"
          >
            Adicionar
          </button>
        </div>

        <ul className="space-y-3 max-h-64 overflow-y-auto">
          {items.length === 0 && <p className="text-center opacity-70">Nenhum item cadastrado ainda.</p>}
          {items.map(item => (
            <li
              key={item.id}
              className="bg-white bg-opacity-30 rounded-lg p-3 shadow-md flex items-center justify-between"
            >
              <span className="font-medium text-black">{item.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

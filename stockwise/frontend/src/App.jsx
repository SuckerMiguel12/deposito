import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: '', quantidade: 0, preco: 0 });

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    const res = await axios.get('http://localhost:3001/api/produtos');
    setProdutos(res.data);
  };

  const salvarProduto = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/api/produtos', form);
    setForm({ nome: '', quantidade: 0, preco: 0 });
    carregarProdutos();
  };

  const excluirProduto = async (id) => {
    await axios.delete(`http://localhost:3001/api/produtos/${id}`);
    carregarProdutos();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Controle de Estoque</h1>

      <form onSubmit={salvarProduto} className="mb-6 space-y-2">
        <input className="border p-2 w-full" placeholder="Nome" value={form.nome}
               onChange={e => setForm({ ...form, nome: e.target.value })} required />
        <input className="border p-2 w-full" type="number" placeholder="Quantidade"
               value={form.quantidade} onChange={e => setForm({ ...form, quantidade: parseInt(e.target.value) })} />
        <input className="border p-2 w-full" type="number" placeholder="Preço"
               value={form.preco} onChange={e => setForm({ ...form, preco: parseFloat(e.target.value) })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Qtd</th>
            <th className="p-2 border">Preço</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td className="p-2 border">{p.nome}</td>
              <td className="p-2 border">{p.quantidade}</td>
              <td className="p-2 border">R$ {p.preco.toFixed(2)}</td>
              <td className="p-2 border">
                <button onClick={() => excluirProduto(p.id)} className="bg-red-500 text-white px-3 py-1 rounded">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Table from "./components/Table";
import AddNewData from "./components/AddNewData";
import EditData from "./components/EditData";

export default function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("my-stocks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("my-stocks", JSON.stringify(items));
  }, [items]);

  const handleAdd = (item) => setItems(prev => [item, ...prev]);

  const handleDelete = (id) => {
    setItems(prev => prev.filter(it => it.id !== id));
  };

  const handleUpdate = (id, next) => {
    setItems(prev => prev.map(it => (it.id === id ? { ...it, ...next } : it)));
  };
  return (
    <Routes>
      
      <Route path="/" element={<Table items={items} onDelete={handleDelete} />} />
      <Route path="/add" element={<AddNewData onAdd={handleAdd} />} />
      <Route path="/edit/:id" element={<EditData items={items} onUpdate={handleUpdate} />} />
    </Routes>

  );
}
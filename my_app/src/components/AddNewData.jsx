import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddNewData.css";

export default function AddNewData({ onAdd }) {
  const [form, setForm] = useState({
    stock: "", date: "", type: "BUY",
    shares: "", price: "", fee: "", portfolio: ""
  });
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

 const onSubmit = (e) => {
  e.preventDefault();
  if (!form.stock || !form.date) return alert("กรอก Stock/Date ด้วยนะ");

onAdd({
  id: crypto.randomUUID(),           // 👈 ไอดีไว้หาแถวที่จะลบ
  ...form,
  shares: form.shares ? parseFloat(form.shares) : 0,
  price:  form.price  ? parseFloat(form.price)  : 0,
  buyPrice: form.buyPrice ? parseFloat(form.buyPrice) : 0,
  fee:    form.fee    ? parseFloat(form.fee)    : 0,
});

  navigate("/"); 
};

  return (
    <>
        <h1>Add Stock</h1>
        <form onSubmit={onSubmit} style={{ padding: 20, display: "grid", gap: 8 }}>
        <input name="stock" placeholder="Stock" onChange={onChange} />
        <input name="date" type="datetime-local" onChange={onChange} />
        <select name="type" value={form.type} onChange={onChange}>
            <option>BUY</option>
            <option>SELL</option>
        </select>
        <input name="shares" type="number" step="any" placeholder="Shares" onChange={onChange} />
        <input name="price" type="number" step="any" placeholder="Price" onChange={onChange} />
        <input  name="buyPrice" type="number" step="any" placeholder="ราคาที่ซื้อ (Buy Price)" onChange={onChange}
/>
        <input name="fee" type="number" step="any" placeholder="Fee" onChange={onChange} />
        <input name="portfolio" placeholder="Portfolio" onChange={onChange} />
        <button type="submit">บันทึก</button>
        <button type="button" onClick={() => navigate("/")}>
            Back
        </button>

        </form>
    </>
  );
}
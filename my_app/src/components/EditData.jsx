import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditData.css"; // ใช้สไตล์เดียวกับ add ได้เลย

export default function EditData({ items, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const current = useMemo(() => items.find(it => it.id === id), [items, id]);

  const [form, setForm] = useState(() => current || {
    stock: "", date: "", type: "BUY", shares: "", price: "", fee: "", portfolio: ""
  });

  useEffect(() => {
    if (current) setForm(current);
  }, [current]);

  if (!current) {
    return (
      <div className="form-wrap">
        <div className="form-card">
          <p>ไม่พบรายการที่จะแก้ไข</p>
          <button className="btn primary" onClick={() => navigate("/")}>กลับหน้าหลัก</button>
        </div>
      </div>
    );
  }

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.stock || !form.date) return alert("กรอก Stock/Date ด้วยนะ");

    onUpdate(id, {
      stock: form.stock,
      date: form.date,
      type: form.type,
      shares: form.shares ? parseFloat(form.shares) : 0,
      price:  form.price  ? parseFloat(form.price)  : 0,
      buyPrice: form.buyPrice ? parseFloat(form.buyPrice) : 0,
      fee:    form.fee    ? parseFloat(form.fee)    : 0,
      portfolio: form.portfolio,
    });

    navigate("/");
  };

  return (
    <div className="form-wrap">
      <form onSubmit={onSubmit} className="form-card">
        <h2 style={{ marginBottom: "12px" }}>Edit Data</h2>

        <input name="stock" placeholder="Stock" value={form.stock} onChange={onChange} />
        <input name="date" type="datetime-local" value={form.date} onChange={onChange} />
        <select name="type" value={form.type} onChange={onChange}>
          <option>BUY</option>
          <option>SELL</option>
        </select>

        <input name="shares" type="number" step="any" placeholder="Shares" value={form.shares} onChange={onChange} />
        <input name="price"  type="number" step="any" placeholder="Price"  value={form.price}  onChange={onChange} />
        <input  name="buyPrice" type="number" step="any" placeholder="ราคาที่ซื้อ (Buy Price)" value={form.buyPrice} onChange={onChange}
/>
        <input name="fee"    type="number" step="any" placeholder="Fee"    value={form.fee}    onChange={onChange} />
        <input name="portfolio" placeholder="Portfolio" value={form.portfolio} onChange={onChange} />

        <div className="actions">
          <button type="button" style={{ marginLeft: "auto" }} className="btn ghost" onClick={() => navigate("/")}>ยกเลิก</button>
          <button type="submit" style={{ marginLeft: "auto" }} className="btn primary">บันทึกการแก้ไข</button>
        </div>
      </form>
    </div>
  );
}
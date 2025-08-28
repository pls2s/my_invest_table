import { useNavigate } from "react-router-dom";
import "./Table.css";

export default function Table({ items, onDelete }) {
  const navigate = useNavigate();

  const confirmDelete = (id) => {
    if (confirm("ลบรายการนี้ใช่ไหม?")) onDelete(id);
  };

  return (
    <div className="table-container">
      <h2 className="table-title">My Investment Table</h2>

      <table>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Transaction Date</th>
            <th>Type</th>
            <th>Shares</th>
            <th>Price</th>
            <th>Buy Price</th>
            <th>Fee</th>
            <th>Portfolio</th>
            <th className="right">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r.id}>
              <td>{r.stock}</td>
              <td>{new Date(r.date).toLocaleString()}</td>
              <td>{r.type}</td>
              <td>{r.shares}</td>
              <td>{r.price}</td>
              <td>{r.buyPrice}</td>
              <td>{r.fee}</td>
              <td>{r.portfolio}</td>
              <td className="right">
                <button className="btn-edit" onClick={() => navigate(`/edit/${r.id}`)}>Edit</button>
                <button className="btn-delete" onClick={() => confirmDelete(r.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={8} style={{ textAlign: "center", padding: 16, color: "#64748b" }}>
                ยังไม่มีข้อมูล กดปุ่ม ADD เพื่อเพิ่มรายการ
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="add-con">
        <button className="add" onClick={() => navigate("/add")}>ADD</button>
      </div>
    </div>
  );
}
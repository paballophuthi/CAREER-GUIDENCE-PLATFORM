import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase.js"; // ? ensure this path matches your structure

const AdminDashboard = () => {
  const [institutionData, setInstitutionData] = useState({
    name: "",
    email: "",
    address: "",
    contact: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [institutions, setInstitutions] = useState([]);

  // ?? Listen for changes in Firestore in real time
  useEffect(() => {
    const q = query(collection(db, "institutions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setInstitutions(data);
    });

    return () => unsubscribe(); // cleanup listener when component unmounts
  }, []);

  // ?? Handle Add Institution
  const handleAddInstitution = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "institutions"), {
        ...institutionData,
        createdAt: new Date(),
        status: "active"
      });
      setMessage("? Institution added successfully!");
      setInstitutionData({ name: "", email: "", address: "", contact: "" });
    } catch (error) {
      setMessage("? Error adding institution: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-white mb-4">Admin Dashboard</h2>

      {message && (
        <div
          className={`alert ${
            message.includes("Error") ? "alert-danger" : "alert-success"
          }`}
        >
          {message}
        </div>
      )}

      {/* ================= ADD INSTITUTION FORM ================= */}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card card-dark shadow">
            <div className="card-header bg-gradient text-white">
              <h5>Add Institution</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleAddInstitution}>
                <div className="mb-3">
                  <label className="form-label text-white">Institution Name</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={institutionData.name}
                    onChange={(e) =>
                      setInstitutionData({ ...institutionData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Email</label>
                  <input
                    type="email"
                    className="form-control bg-dark text-white border-secondary"
                    value={institutionData.email}
                    onChange={(e) =>
                      setInstitutionData({ ...institutionData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Address</label>
                  <textarea
                    className="form-control bg-dark text-white border-secondary"
                    value={institutionData.address}
                    onChange={(e) =>
                      setInstitutionData({ ...institutionData, address: e.target.value })
                    }
                    rows="2"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Contact Number</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={institutionData.contact}
                    onChange={(e) =>
                      setInstitutionData({ ...institutionData, contact: e.target.value })
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-gradient w-100"
                  disabled={loading}
                >
                  {loading ? "Adding Institution..." : "Add Institution"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ================= INSTITUTIONS TABLE ================= */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card card-dark shadow">
            <div className="card-header bg-gradient text-white">
              <h5>Registered Institutions</h5>
            </div>
            <div className="card-body">
              {institutions.length === 0 ? (
                <p className="text-c7c9d3 text-center">No institutions found.</p>
              ) : (
                <table className="table table-dark table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Contact</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {institutions.map((inst) => (
                      <tr key={inst.id}>
                        <td>{inst.name}</td>
                        <td>{inst.email}</td>
                        <td>{inst.address}</td>
                        <td>{inst.contact}</td>
                        <td>
                          <span className="badge bg-success">{inst.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase"

const CompanyDashboard = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    qualifications: "",
    experience: "",
    deadline: ""
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handlePostJob = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await addDoc(collection(db, "jobs"), {
        ...jobData,
        companyId: "current_company_id",
        createdAt: new Date(),
        status: "active"
      })
      setMessage("Job posted successfully!")
      setJobData({ title: "", description: "", qualifications: "", experience: "", deadline: "" })
    } catch (error) {
      setMessage("Error posting job: " + error.message)
    }
    setLoading(false)
  }

  return (
    <div className="container mt-4">
      <h2 className="text-white mb-4">Company Dashboard</h2>
      
      {message && (
        <div className={`alert ${message.includes("Error") ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card card-dark shadow">
            <div className="card-header bg-gradient text-white">
              <h5>Post New Job Opportunity</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handlePostJob}>
                <div className="mb-3">
                  <label className="form-label text-white">Job Title</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={jobData.title}
                    onChange={(e) => setJobData({...jobData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Job Description</label>
                  <textarea
                    className="form-control bg-dark text-white border-secondary"
                    value={jobData.description}
                    onChange={(e) => setJobData({...jobData, description: e.target.value})}
                    rows="3"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Qualifications</label>
                  <textarea
                    className="form-control bg-dark text-white border-secondary"
                    value={jobData.qualifications}
                    onChange={(e) => setJobData({...jobData, qualifications: e.target.value})}
                    rows="3"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Experience Required</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={jobData.experience}
                    onChange={(e) => setJobData({...jobData, experience: e.target.value})}
                    placeholder="e.g., 2+ years"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Application Deadline</label>
                  <input
                    type="date"
                    className="form-control bg-dark text-white border-secondary"
                    value={jobData.deadline}
                    onChange={(e) => setJobData({...jobData, deadline: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-gradient w-100" disabled={loading}>
                  {loading ? "Posting Job..." : "Post Job"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard

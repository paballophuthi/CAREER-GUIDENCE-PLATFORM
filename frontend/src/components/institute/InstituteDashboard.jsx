import React, { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase"

const InstituteDashboard = () => {
  const [courseData, setCourseData] = useState({
    name: "",
    faculty: "",
    duration: "",
    requirements: "",
    seats: ""
  })
  const [facultyData, setFacultyData] = useState({
    name: "",
    description: ""
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleAddCourse = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await addDoc(collection(db, "courses"), {
        ...courseData,
        institutionId: "current_institute_id",
        createdAt: new Date(),
        status: "active"
      })
      setMessage("Course added successfully!")
      setCourseData({ name: "", faculty: "", duration: "", requirements: "", seats: "" })
    } catch (error) {
      setMessage("Error adding course: " + error.message)
    }
    setLoading(false)
  }

  const handleAddFaculty = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await addDoc(collection(db, "faculties"), {
        ...facultyData,
        institutionId: "current_institute_id",
        createdAt: new Date()
      })
      setMessage("Faculty added successfully!")
      setFacultyData({ name: "", description: "" })
    } catch (error) {
      setMessage("Error adding faculty: " + error.message)
    }
    setLoading(false)
  }

  return (
    <div className="container mt-4">
      <h2 className="text-white mb-4">Institute Dashboard</h2>
      
      {message && (
        <div className={`alert ${message.includes("Error") ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card card-dark shadow">
            <div className="card-header bg-gradient text-white">
              <h5>Add New Course</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleAddCourse}>
                <div className="mb-3">
                  <label className="form-label text-white">Course Name</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={courseData.name}
                    onChange={(e) => setCourseData({...courseData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Faculty</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={courseData.faculty}
                    onChange={(e) => setCourseData({...courseData, faculty: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Duration</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={courseData.duration}
                    onChange={(e) => setCourseData({...courseData, duration: e.target.value})}
                    placeholder="e.g., 4 years"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Requirements</label>
                  <textarea
                    className="form-control bg-dark text-white border-secondary"
                    value={courseData.requirements}
                    onChange={(e) => setCourseData({...courseData, requirements: e.target.value})}
                    rows="3"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Available Seats</label>
                  <input
                    type="number"
                    className="form-control bg-dark text-white border-secondary"
                    value={courseData.seats}
                    onChange={(e) => setCourseData({...courseData, seats: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-gradient w-100" disabled={loading}>
                  {loading ? "Adding Course..." : "Add Course"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card card-dark shadow">
            <div className="card-header bg-gradient text-white">
              <h5>Add Faculty</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleAddFaculty}>
                <div className="mb-3">
                  <label className="form-label text-white">Faculty Name</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={facultyData.name}
                    onChange={(e) => setFacultyData({...facultyData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Description</label>
                  <textarea
                    className="form-control bg-dark text-white border-secondary"
                    value={facultyData.description}
                    onChange={(e) => setFacultyData({...facultyData, description: e.target.value})}
                    rows="3"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-gradient w-100" disabled={loading}>
                  {loading ? "Adding Faculty..." : "Add Faculty"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstituteDashboard

import React, { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "../../firebase"

const StudentDashboard = () => {
  const [courseData, setCourseData] = useState({
    courseName: "",
    institution: "",
    applicationDate: "",
    status: "pending"
  })
  const [transcriptFile, setTranscriptFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleCourseApplication = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await addDoc(collection(db, "applications"), {
        ...courseData,
        studentId: "current_user_id", // Will be replaced with actual user ID
        createdAt: new Date()
      })
      setMessage("Course application submitted successfully!")
      setCourseData({ courseName: "", institution: "", applicationDate: "", status: "pending" })
    } catch (error) {
      setMessage("Error submitting application: " + error.message)
    }
    setLoading(false)
  }

  const handleTranscriptUpload = async (e) => {
    e.preventDefault()
    if (!transcriptFile) {
      setMessage("Please select a file to upload")
      return
    }

    setLoading(true)
    try {
      const fileRef = ref(storage, `transcripts/${transcriptFile.name}`)
      await uploadBytes(fileRef, transcriptFile)
      const downloadURL = await getDownloadURL(fileRef)
      
      // Save transcript URL to Firestore
      await addDoc(collection(db, "transcripts"), {
        studentId: "current_user_id",
        transcriptURL: downloadURL,
        fileName: transcriptFile.name,
        uploadDate: new Date()
      })
      setMessage("Transcript uploaded successfully!")
      setTranscriptFile(null)
    } catch (error) {
      setMessage("Error uploading transcript: " + error.message)
    }
    setLoading(false)
  }

  return (
    <div className="container mt-4">
      <h2 className="text-white mb-4">Student Dashboard</h2>
      
      {message && (
        <div className={`alert ${message.includes("Error") ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card card-dark shadow">
            <div className="card-header bg-gradient text-white">
              <h5>Apply for Course</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleCourseApplication}>
                <div className="mb-3">
                  <label className="form-label text-white">Course Name</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={courseData.courseName}
                    onChange={(e) => setCourseData({...courseData, courseName: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Institution</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    value={courseData.institution}
                    onChange={(e) => setCourseData({...courseData, institution: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Application Date</label>
                  <input
                    type="date"
                    className="form-control bg-dark text-white border-secondary"
                    value={courseData.applicationDate}
                    onChange={(e) => setCourseData({...courseData, applicationDate: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-gradient w-100" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card card-dark shadow">
            <div className="card-header bg-gradient text-white">
              <h5>Upload Transcript</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleTranscriptUpload}>
                <div className="mb-3">
                  <label className="form-label text-white">Select Transcript File</label>
                  <input
                    type="file"
                    className="form-control bg-dark text-white border-secondary"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setTranscriptFile(e.target.files[0])}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-gradient w-100" disabled={loading}>
                  {loading ? "Uploading..." : "Upload Transcript"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-dark shadow">
        <div className="card-header bg-gradient text-white">
          <h5>Job Alerts</h5>
        </div>
        <div className="card-body">
          <p className="text-c7c9d3">No new job alerts at the moment.</p>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard

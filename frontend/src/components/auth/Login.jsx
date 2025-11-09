import React, { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../../firebase"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Get user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        
        // Redirect based on role
        switch (userData.role) {
          case "student":
            navigate("/student-dashboard")
            break
          case "institute":
            navigate("/institute-dashboard")
            break
          case "company":
            navigate("/company-dashboard")
            break
          case "admin":
            navigate("/admin-dashboard")
            break
          default:
            setError("Unknown user role")
        }
      } else {
        setError("User data not found")
      }
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card card-dark shadow">
            <div className="card-header bg-gradient text-white text-center">
              <h4>Login to Career Guidance Platform</h4>
            </div>
            <div className="card-body p-4">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label text-white">Email</label>
                  <input
                    type="email"
                    className="form-control bg-dark text-white border-secondary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Password</label>
                  <input
                    type="password"
                    className="form-control bg-dark text-white border-secondary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-gradient w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
              <div className="text-center mt-3">
                <a href="/register" className="text-c7c9d3">Don't have an account? Register</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

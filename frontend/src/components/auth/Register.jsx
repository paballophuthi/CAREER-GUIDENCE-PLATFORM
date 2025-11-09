import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../../firebase"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("student")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: role,
        createdAt: new Date(),
        uid: user.uid
      })

      // Redirect to login page
      navigate("/login")
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
              <h4>Register for Career Guidance Platform</h4>
            </div>
            <div className="card-body p-4">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleRegister}>
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
                <div className="mb-3">
                  <label className="form-label text-white">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control bg-dark text-white border-secondary"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Role</label>
                  <select
                    className="form-select bg-dark text-white border-secondary"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="institute">Institute</option>
                    <option value="company">Company</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-gradient w-100"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Register"}
                </button>
              </form>
              <div className="text-center mt-3">
                <a href="/login" className="text-c7c9d3">Already have an account? Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

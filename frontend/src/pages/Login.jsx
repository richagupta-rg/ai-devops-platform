import { motion } from "framer-motion"
import { FaCode } from "react-icons/fa"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

import API from "../services/api"

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {

      const response = await API.post("/login", formData)

      localStorage.setItem(
        "token",
        response.data.access_token
      )

      toast.success("Login successful 🚀")

      setTimeout(() => {
        navigate("/dashboard")
      }, 1500)

    } catch (error) {

      toast.error(
        error.response?.data?.detail || "Login failed"
      )
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center overflow-hidden relative">

      <Toaster position="top-right" />

      {/* Background */}
      <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-10 w-[400px] relative z-10"
      >

        {/* Logo */}
        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-3 rounded-2xl">
            <FaCode className="text-white text-2xl" />
          </div>

          <h1 className="text-white text-3xl font-bold">
            AI DevOps
          </h1>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-white text-2xl font-semibold">
            Welcome Back
          </h2>

          <p className="text-gray-400 mt-2">
            Login to continue your analysis journey
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={handleLogin}
        >

          {/* Username */}
          <div>
            <label className="text-gray-300 text-sm">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-xl bg-[#111827] border border-white/10 text-white outline-none focus:border-cyan-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-xl bg-[#111827] border border-white/10 text-white outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
          >
            Login
          </motion.button>

        </form>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?

          <Link
            to="/signup"
            className="text-cyan-400 ml-2 hover:underline"
          >
            Signup
          </Link>
        </p>

      </motion.div>
    </div>
  )
}

export default Login
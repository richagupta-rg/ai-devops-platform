import { useState } from "react"
import Editor from "@monaco-editor/react"
import { ClipLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import {
  FaChartBar,
  FaCode,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa"

import API from "../services/api"

function Dashboard() {
  const navigate = useNavigate()

  const [code, setCode] = useState("")

  const [result, setResult] = useState(null)

  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {

    try {

      setLoading(true)

      const token = localStorage.getItem("token")

      const response = await API.post(
        `/analyze?code=${encodeURIComponent(code)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setResult(response.data.result)

    } catch (error) {

      console.log(error)

      alert("Analysis failed")

    } finally {

      setLoading(false)
    }
  }

  const handleLogout = () => {

    localStorage.removeItem("token")

    window.location.href = "/"
  }

  const chartData = [
  { name: "A1", complexity: 4 },
  { name: "A2", complexity: 7 },
  { name: "A3", complexity: 3 },
  { name: "A4", complexity: 10 },
  { name: "A5", complexity: 6 },
]



  return (
    <div className="min-h-screen bg-[#0B1120] flex text-white">

      {/* Sidebar */}
      <div className="w-64 bg-white/5 border-r border-white/10 p-6 flex flex-col">

        <h1 className="text-3xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          AI DevOps
        </h1>

        <div className="space-y-4">

          <button className="flex items-center gap-3 w-full bg-gradient-to-r from-purple-600 to-cyan-500 p-3 rounded-xl">
            <FaChartBar />
            Dashboard
          </button>

          <button className="flex items-center gap-3 w-full hover:bg-white/10 p-3 rounded-xl transition">
            <FaCode />
            Analyze
          </button>

          <button
            onClick={() => navigate("/history")}
            className="flex items-center gap-3 w-full hover:bg-white/10 p-3 rounded-xl transition"
          >
            <FaHistory />
            History
          </button>

        </div>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 hover:bg-red-500/10 w-full p-3 rounded-xl transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <h2 className="text-4xl font-bold">
              Welcome Back 👋
            </h2>

            <p className="text-gray-400 mt-2">
              Analyze and improve your code quality
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
            <p className="text-sm text-gray-400">
              AI Analyzer Active
            </p>

            <p className="font-semibold text-green-400">
              Online
            </p>
          </div>

        </div>

        {/* Analyze Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 shadow-xl">

          <h3 className="text-2xl font-semibold mb-6">
            Analyze Your Code
          </h3>

          <div className="overflow-hidden rounded-2xl border border-white/10">

            <div className="overflow-hidden rounded-2xl border border-white/10">

              <Editor
                height="400px"
                defaultLanguage="python"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 16,
                  padding: {
                    top: 20,
                  },
                  scrollBeyondLastLine: false,
                  roundedSelection: true,
                  automaticLayout: true,
                }}
              />

            </div>

          </div>

          <button
  onClick={handleAnalyze}
  disabled={loading}
  className="mt-6 bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-3 disabled:opacity-70"
>

  {loading ? (
    <>
      <ClipLoader
        color="#ffffff"
        size={20}
      />
      Analyzing AI Patterns...
    </>
  ) : (
    "Analyze Code"
  )}

</button>
        </div>

        {/* Result Cards */}
        {result && (

          <div className="grid grid-cols-4 gap-6">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-gray-400">
                Lines of Code
              </p>

              <h3 className="text-4xl font-bold mt-3">
                {result.lines_of_code}
              </h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-gray-400">
                Functions
              </p>

              <h3 className="text-4xl font-bold mt-3">
                {result.number_of_functions}
              </h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-gray-400">
                Complexity
              </p>

              <h3 className="text-4xl font-bold mt-3">
                {result.complexity_score}
              </h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-gray-400">
                Quality
              </p>

              <h3 className="text-4xl font-bold mt-3 text-green-400">
                {result.quality}
              </h3>
            </div>

          </div>
        )}

        {/* Analytics Chart */}
<div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8">

  <h3 className="text-2xl font-bold mb-6">
    Complexity Analytics 📈
  </h3>

  <div className="h-[350px]">

    <ResponsiveContainer width="100%" height="100%">

      <LineChart data={chartData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="complexity"
          stroke="#06B6D4"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

</div>


      </div>

    </div>
  )
}




export default Dashboard
import { useEffect, useState } from "react"
import API from "../services/api"
import { FaHistory } from "react-icons/fa"

function History() {

  const [history, setHistory] = useState([])

  const fetchHistory = async () => {

    try {

      const token = localStorage.getItem("token")

      const response = await API.get("/my-analyses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setHistory(response.data)

    } catch (error) {

      console.log(error)
      alert("Failed to fetch history")
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (

    <div className="min-h-screen bg-[#0B1120] text-white p-10">

      <div className="flex items-center gap-4 mb-10">
        <FaHistory className="text-4xl text-cyan-400" />

        <div>
          <h1 className="text-4xl font-bold">
            Analysis History
          </h1>

          <p className="text-gray-400 mt-2">
            Your previous AI code analyses
          </p>
        </div>
      </div>

      <div className="grid gap-6">

        {history.map((item) => (

          <div
            key={item.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >

            <div className="flex justify-between mb-4">

              <div>
                <p className="text-gray-400 text-sm">
                  Analysis ID
                </p>

                <h2 className="text-xl font-bold">
                  #{item.id}
                </h2>
              </div>

              <div className="text-right">
                <p className="text-gray-400 text-sm">
                  Quality
                </p>

                <h2 className="text-green-400 text-xl font-bold">
                  {item.result.quality}
                </h2>
              </div>

            </div>

            <pre className="bg-[#111827] p-4 rounded-xl overflow-auto text-sm text-cyan-300">
{item.code}
            </pre>

            <div className="grid grid-cols-3 gap-4 mt-6">

              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-gray-400 text-sm">
                  Lines
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  {item.result.lines_of_code}
                </h3>
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-gray-400 text-sm">
                  Functions
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  {item.result.number_of_functions}
                </h3>
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-gray-400 text-sm">
                  Complexity
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  {item.result.complexity_score}
                </h3>
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default History
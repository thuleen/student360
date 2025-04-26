import { A, useNavigate } from '@solidjs/router';
import { createSignal, onMount } from 'solid-js'
import { remult } from "remult"
import { getUser } from "~/auth.js"

export default function Student() {

  const [authenticated, setAuthenticated] = createSignal(false)
  const navigate = useNavigate()

  onMount(async () => {
    remult.user = await getUser()
    if (remult.authenticated()) setAuthenticated(true)
    else navigate("/login")
  })

  return (
    <main class="container mx-auto px-3 pt-21">
      {/* Actions: Search + Upload */}
      <div class="p-6 flex flex-col md:flex-row md:items-center md:space-x-1">
        {/* Search Form */}
        <form class="flex flex-1 gap-2">
          <input
            type="text"
            placeholder="Search student..."
            class="flex-grow px-4 py-2 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <button
            type="submit"
            class="cursor-pointer h-10 px-4 text-sm bg-gray-700 text-white rounded-md hover:bg-gray-400 transition flex items-center justify-center"
          >
            Search
          </button>
        </form>
      </div>
      {/* Content below: student table or list goes here */}
    </main>
  )
}
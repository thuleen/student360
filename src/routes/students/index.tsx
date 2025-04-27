import { createSignal, createResource } from "solid-js";
import { remult } from "remult";
import { Student } from "~/shared/Student"; // adjust import if needed
import { useNavigate } from "@solidjs/router";

export default function StudentsPage() {
  const [search, setSearch] = createSignal("");
  const [searchTerm, setSearchTerm] = createSignal("");
  const navigate = useNavigate(); // get navigate function from solid-start

  const studentRepo = remult.repo(Student);

  const [students] = createResource(searchTerm, async (term) => {
    if (!term.trim()) return [];
    return await studentRepo.find({
      where: {
        fullName: { $contains: term }
      },
      limit: 20,
    });
  });

  function handleSearchSubmit(e: Event) {
    e.preventDefault();
    setSearchTerm(search());
  }

  // Navigate to student details page on click
  function handleStudentClick(studentId: string) {
    navigate(`/students/${studentId}`); // dynamic route
  }

  return (
    <main class="container mx-auto px-3 pt-21">
      <div class="mx-auto">
        {/* Search Form */}
        <form class="flex gap-2 mb-6" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search student..."
            class="flex-grow px-4 py-2 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={search()}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
          <button
            type="submit"
            class="cursor-pointer h-10 px-4 text-sm bg-gray-700 text-white rounded-md hover:bg-gray-400 transition flex items-center justify-center"
          >
            Search
          </button>
        </form>

        {/* Students List */}
        <div>
          {students.loading && <div>Searching...</div>}
          {students.error && <div>Error loading students: {students.error.message}</div>}

          <ul class="space-y-2">
            {students()?.length === 0 && searchTerm() && (
              <li class="text-gray-500">No students found</li>
            )}
            {students()?.map((student) => (
              <li
                key={student.id}
                class="p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                onClick={() => handleStudentClick(student.id)} // clickable student item
              >
                <div class="font-semibold">{student.fullName}</div>
                <div class="text-sm text-gray-600">{student.schoolName}</div>
                <div class="text-sm text-gray-600">{student.dateOfBirth}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

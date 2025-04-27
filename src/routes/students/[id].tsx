
import { onMount } from 'solid-js';
import { createStore } from 'solid-js/store'
import { useParams, A } from "@solidjs/router";
import { repo } from "remult";
import { Student } from "~/shared/Student";

const studentRepo = repo(Student);

export default function StudentDetailPage() {

  const [student, setStudent] = createStore<Student>()

  const params = useParams();
  const studentId = params.id;

  onMount(() => studentRepo.findOne({ where: { id: studentId } }).then(setStudent))

  const formatDate = (date: Date | string) => {
    if (date instanceof Date) {
      return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY for Malaysia
    }
    return date; // If it's already a string, return it as is
  };

  if (!student) {
    return (
      <main class="container mx-auto px-3 pt-21">
        <div class="mx-auto">
          <A href="/" class="text-blue-600 hover:underline">Back home</A>
        </div>
      </main>
    )
  }

  return (
    <main class="container mx-auto px-3 pt-21">
      <div class="mx-auto">
        <h2 class="text-2xl font-semibold">{student.fullName}</h2>
        <div class="mt-4">
          <p><strong>Date of Birth:</strong> {formatDate(student.dateOfBirth)}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p><strong>Nationality:</strong> {student.nationality}</p>
          <p><strong>Race:</strong> {student.race}</p>
          <p><strong>Religion:</strong> {student.religion}</p>
          <p><strong>Address:</strong> {student.address}</p>
          <p><strong>Phone Number:</strong> {student.phoneNumber}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>School:</strong> {student.schoolName}</p>
          <p><strong>Grade Level:</strong> {student.gradeLevel}</p>
        </div>
      </div>
      <hr class="border-t border-gray-200 mt-9 mx-4 mb-9" />
      <A href="/students" class="text-blue-600 hover:underline">Back and search another...</A>
    </main>
  );
}

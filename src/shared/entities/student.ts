// src/shared/Student.ts

import { Entity, Fields } from 'remult'

@Entity('students', {
  allowApiCrud: true,
})
export class Student {
  @Fields.uuid()
  id = "";

  @Fields.string()
  fullName = "";

  @Fields.dateOnly()
  dateOfBirth = new Date(); // Malaysian schools track DOB

  @Fields.string()
  gender = ""; // "Male" | "Female" (could be enum if you want)

  @Fields.string()
  nationality = "Malaysian"; // default to Malaysian

  @Fields.string()
  identificationNumber = ""; // IC number (NRIC) or passport

  @Fields.string({ nullable: true })
  race?: string; // Malay, Chinese, Indian, Others (optional)

  @Fields.string({ nullable: true })
  religion?: string; // Islam, Christianity, Buddhism, Hinduism, etc.

  @Fields.string({ nullable: true })
  address?: string;

  @Fields.string({ nullable: true })
  phoneNumber?: string; // parents' contact sometimes used

  @Fields.string({ nullable: true })
  email?: string;

  @Fields.string({ nullable: true })
  schoolName?: string;

  @Fields.string({ nullable: true })
  gradeLevel?: string; // e.g., "Form 5", "Standard 6", "Year 11"

  @Fields.createdAt()
  createdAt?: Date;

  @Fields.updatedAt()
  updatedAt?: Date;
}
// src/shared/Student.ts

import { Entity, Fields } from 'remult'

@Entity('students', {
  allowApiCrud: true,
})
export class Student {
  @Fields.cuid()
  id = ''

  @Fields.string()
  name = ''

  @Fields.boolean()
  completed = false

  @Fields.createdAt()
  createdAt?: Date
}
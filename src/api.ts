// src/api.ts

import { remultSolidStart } from 'remult/remult-solid-start'
import { Student } from '~/shared/Student'

export const api = remultSolidStart({
  entities: [Student]
})
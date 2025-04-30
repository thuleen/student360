// src/api.ts

import { remultSolidStart } from 'remult/remult-solid-start'
import { Student } from '~/shared/entities/student'

export const api = remultSolidStart({
  entities: [Student],
  admin: true,
})
import * as z from "zod"

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name cannot exceed 50 characters")
  .regex(
    // \p{L} = Any letter in any language
    // \s = Spaces
    // \-'\., = Hyphens, apostrophes, periods, commas
    // /u = Required flag to turn on Unicode support
    /^[\p{L}\s\-'’\.,]+$/u,
    "Name can only contain letters, spaces, and basic punctuation"
  )

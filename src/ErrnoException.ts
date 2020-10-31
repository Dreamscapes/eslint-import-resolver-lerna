/** Copied over from @types/node because it's not possible to import this type directly 🤦‍♂️ */
interface ErrnoException extends Error {
  errno?: number
  code?: string
  path?: string
  syscall?: string
  stack?: string
}

export {
  ErrnoException,
}

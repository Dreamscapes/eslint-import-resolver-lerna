/** Outcome of the package resolution attempt */
interface Outcome {
  /** Did we find the package we are looking for? */
  found: boolean
  /** If we found it, this will be an absolute path to where that package is located */
  path: string | null
}

export {
  Outcome,
}

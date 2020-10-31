import type { ErrnoException } from './ErrnoException'

function isErrnoException(err: unknown): err is ErrnoException {
  return Object.keys(err as Record<string, unknown>).includes('code')
}

function cjsresolve(filepath: string): string | null {
  try {
    return require.resolve(filepath)
  } catch (err: unknown) {
    if (isErrnoException(err) && err.code === 'MODULE_NOT_FOUND') {
      return null
    }

    throw err
  }
}

export {
  cjsresolve,
}

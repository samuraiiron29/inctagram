'use client'
export function readFilesAsDataURLs(files: FileList): Promise<string[]> {
  return Promise.all(
    Array.from(files).map(
      f =>
        new Promise<string>((res, rej) => {
          const r = new FileReader()
          r.onload = () => (typeof r.result === 'string' ? res(r.result) : rej('bad result'))
          r.onerror = rej
          r.readAsDataURL(f)
        })
    )
  )
}

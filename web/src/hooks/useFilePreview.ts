import { useEffect, useState } from 'react'

export default function useFilePreview(file: any) {
  const [imageSource, setImageSource] = useState<any>(null)

  useEffect(() => {
    if (file && file[0]) {
      const preview = URL.createObjectURL(file[0])

      if (preview !== imageSource) {
        setImageSource(preview)
      }
    }
  }, [file])

  return [imageSource, setImageSource]
}

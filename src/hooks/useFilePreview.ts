"use client"

import { useEffect, useState } from "react";

export default function useFilePreview(file: any) {
  const [imgSrc, setImgSrc] = useState<any>(null);

  useEffect(() => {
    if (file && file[0]) {
      const newUrl = URL.createObjectURL(file[0]);

      if (newUrl !== imgSrc) {
        setImgSrc(newUrl);
      }

      return 
    }

    setImgSrc("https://cdn.discordapp.com/attachments/1013165623188148234/1101890072065888406/user.png")
  }, [file]);

  return [imgSrc, setImgSrc]
}

'use client'

import { useEffect } from 'react'

export default function PaperGrain() {
  useEffect(() => {
    const SIZE = 256
    const canvas = document.createElement('canvas')
    canvas.width = SIZE
    canvas.height = SIZE
    const ctx = canvas.getContext('2d')!
    const imageData = ctx.createImageData(SIZE, SIZE)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.floor(Math.random() * 255)
      data[i] = v; data[i + 1] = v; data[i + 2] = v; data[i + 3] = 255
    }
    ctx.putImageData(imageData, 0, 0)

    const overlay = document.createElement('div')
    overlay.id = 'paper-grain-overlay'
    overlay.style.cssText = `
      position:fixed;top:0;left:0;width:100vw;height:100vh;
      pointer-events:none;z-index:-1;opacity:0.06;
      mix-blend-mode:multiply;
      background-image:url(${canvas.toDataURL()});
      background-repeat:repeat;
    `
    document.body.appendChild(overlay)
    return () => { overlay.remove() }
  }, [])

  return null
}

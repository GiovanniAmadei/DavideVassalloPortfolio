'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode
  tag?: keyof JSX.IntrinsicElements
}

export default function Reveal({ children, className = '', style, tag: Tag = 'div', ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('active') },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`reveal ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  )
}

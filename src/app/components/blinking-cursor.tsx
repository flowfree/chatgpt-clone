'use client'

import { useEffect, useState } from 'react'

export function BlinkingCursor({
  className = ''
}: {
  className?: string
}) {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowCursor((prevShowCursor) => !prevShowCursor)
    }, 500)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <span className={`${className} inline-block`}>
      {showCursor ? `_ ` : ` `}
    </span>
  )
}

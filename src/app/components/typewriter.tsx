'use client'

import { useState, useEffect } from 'react'

export function TypeWriter({ 
  text, 
  speed = 50,
  initialDelay = 1000,
  runIndefinitely = true
}: { 
  text: string, 
  speed?: number
  initialDelay?: number
  runIndefinitely?: boolean
}) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [blinkingCursor, setBlinkingCursor] = useState(false)
  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    setDisplayText('')
    const timer = setTimeout(() => {
      setCurrentIndex(0)
    }, initialDelay)

    return () => clearTimeout(timer)
  }, [text])

  useEffect(() => {
    setShowCursor(true)

    if (currentIndex === null) {
      return
    }

    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex === null ? prevIndex : prevIndex+1)
      } else if (runIndefinitely) {
        setBlinkingCursor(true)
        clearTimeout(timer)
      } else {
        setShowCursor(false)
        clearTimeout(timer)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [currentIndex])

  useEffect(() => {
    if (showCursor && blinkingCursor) {
      const timer = setInterval(() => {
        setShowCursor(c => !c)
      }, 500)
      
      return () => clearInterval(timer)
    }
  }, [blinkingCursor])

  return (
    <span>
      {displayText}
      {showCursor && <span>{` _`}</span>}
    </span>  
  )
}

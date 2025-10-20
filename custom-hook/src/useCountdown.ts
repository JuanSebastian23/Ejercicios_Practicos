import { useState, useEffect, useRef } from 'react'

interface UseCountdownReturn {
  seconds: number
  isRunning: boolean
  start: () => void
  pause: () => void
  reset: () => void
  setTime: (seconds: number) => void
}

export const useCountdown = (initialSeconds: number = 60): UseCountdownReturn => {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, seconds])

  const start = () => {
    if (seconds > 0) {
      setIsRunning(true)
    }
  }

  const pause = () => {
    setIsRunning(false)
  }

  const reset = () => {
    setIsRunning(false)
    setSeconds(initialSeconds)
  }

  const setTime = (newSeconds: number) => {
    setIsRunning(false)
    setSeconds(newSeconds)
  }

  return { seconds, isRunning, start, pause, reset, setTime }
}

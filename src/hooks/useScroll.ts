import React from 'react'

export const useScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isAnimation, setIsAnimation] = React.useState(false)

  const targetRef = React.useRef<HTMLDivElement>(null)

  const scrollToTop = React.useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const animeScroll = React.useCallback(() => {
    const windowHeight = window.innerHeight * 0.85
    const sectionTop = targetRef.current?.getBoundingClientRect().top

    if (sectionTop) {
      const isSectionVisible = sectionTop - windowHeight < 0

      if (isSectionVisible) {
        setIsAnimation(true)
      }
    }
  }, [])

  const toggleVisibility = React.useCallback(() => {
    if (window.scrollY > 500) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [])

  const handleScroll = React.useCallback(() => {
    animeScroll()
    toggleVisibility()
  }, [animeScroll, toggleVisibility])

  React.useEffect(() => {
    animeScroll()

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [animeScroll, handleScroll])

  return { isVisible, scrollToTop, isAnimation, targetRef }
}

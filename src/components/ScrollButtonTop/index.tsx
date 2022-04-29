import React from 'react'
import { RiArrowUpLine } from 'react-icons/ri'

import { useScrollToTop } from '~/hooks/useScroll'

import styles from './styles.module.scss'

export const ScrollButtonTop = () => {
  const { isVisible, scrollToTop } = useScrollToTop()

  return (
    <button
      type="button"
      className={`${styles.buttonContainer} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
    >
      <RiArrowUpLine size={28} color="#fff" />
    </button>
  )
}

import React from 'react'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'

import styles from './styles.module.scss'

interface ToggleButtonProps {
  isExpanded: boolean
  onClick: () => void
}

export const ToggleButton = ({ isExpanded, onClick }: ToggleButtonProps) => {
  return (
    <div className={styles.toggleButtonContainer}>
      {isExpanded ? (
        <button type="button" onClick={onClick}>
          Show Less
          <RiArrowUpSLine />
        </button>
      ) : (
        <button type="button" onClick={onClick}>
          Show More
          <RiArrowDownSLine />
        </button>
      )}
    </div>
  )
}

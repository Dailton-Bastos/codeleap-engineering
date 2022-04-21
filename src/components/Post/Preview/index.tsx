import React from 'react'

import { ToggleButton } from '../ToggleButton'
import styles from './styles.module.scss'

interface PreviewProps {
  children: string
}

const DEFAULT_HEIGHT = 65

export const Preview = ({ children }: PreviewProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [isOverflow, setIsOverflow] = React.useState(false)

  const [heightCurrent, setHeightCurrent] = React.useState(DEFAULT_HEIGHT)
  const [heightMax, setHeightMax] = React.useState(DEFAULT_HEIGHT)
  const [heightMin, setHeightMin] = React.useState(DEFAULT_HEIGHT)

  const text = children

  const refText = React.useRef<HTMLDivElement>(null)

  const handleExpanded = React.useCallback(() => {
    setHeightCurrent(isExpanded ? heightMin : heightMax)
    setIsExpanded((prev) => !prev)
  }, [isExpanded, heightMin, heightMax])

  React.useEffect(() => {
    const heightClient = refText.current?.clientHeight || DEFAULT_HEIGHT
    const scrollClient = refText.current?.scrollHeight || DEFAULT_HEIGHT

    if (heightClient !== scrollClient) {
      setIsOverflow(true)
      setHeightMax(scrollClient)
      setHeightMin(heightClient)
      setHeightCurrent(heightClient)
    }
  }, [text])

  return (
    <div className={styles.previewContainer}>
      <div
        ref={refText}
        style={{ height: `${heightCurrent}px` }}
        className={`${styles.previewContent} ${
          !isExpanded && isOverflow ? styles.isOverflow : ''
        }`}
      >
        <p>{text}</p>
      </div>

      {isOverflow && (
        <ToggleButton isExpanded={isExpanded} onClick={handleExpanded} />
      )}
    </div>
  )
}

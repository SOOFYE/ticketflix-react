import React from 'react'

import { RotatingLines } from 'react-loader-spinner'

function RotateSpinner() {
  return (
    <RotatingLines
  strokeColor="yellow"
  strokeWidth="5"
  animationDuration="0.75"
  width="40"
  visible={true}
/>
  )
}

export default RotateSpinner
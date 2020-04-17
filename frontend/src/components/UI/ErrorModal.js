import React from 'react'

import Modal from './Modal'
import Button from './Button'

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      show={!!props.error}
      clear={props.onClear}
    >
      <p className="text-sm font-medium">{props.error}</p>
    </Modal>
  )
}

export default ErrorModal

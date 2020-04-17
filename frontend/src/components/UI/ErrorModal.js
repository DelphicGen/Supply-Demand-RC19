import React from 'react'
import { Warning } from '@material-ui/icons'
import Modal from './Modal'

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      show={!!props.error}
      clear={props.onClear}>
      <div className="flex flex-row items-center">
        <Warning className="text-gray-100 mr-3 md:mr-4 lg:mr-5" style={{ fontSize: 40 }} />
        <p className="text-xs md:text-sm font-medium">{props.error}</p>
      </div>
    </Modal>
  )
}

export default ErrorModal

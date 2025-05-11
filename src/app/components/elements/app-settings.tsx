import { useState } from 'react'

import IconSetting from '@/assets/icons/icon-setting'

import { Button } from '../ui/button'
import Modal from '../ui/modal'

export default function AppSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button
        variant="outline"
        size="xsicon"
        onClick={() => setIsModalOpen(true)}
      >
        <IconSetting />
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modal Title"
      >
        <p>This is the modal content.</p>
      </Modal>
    </div>
  )
}

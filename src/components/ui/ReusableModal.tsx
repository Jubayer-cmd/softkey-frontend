import { Modal } from 'antd';
import React from 'react';

// Define the props interface
interface ReusableModalProps {
  title: string;
  open: boolean;
  onCancel: () => void;
  children: React.ReactNode;
}

const ReusableModal: React.FC<ReusableModalProps> = (props) => {
  const { title, open, onCancel, children } = props;

  return (
    <Modal title={title} open={open} onCancel={onCancel}>
      {children}
    </Modal>
  );
};

export default ReusableModal;

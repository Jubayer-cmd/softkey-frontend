import { Modal } from 'antd';
import React from 'react';

// Define the props interface
interface ReusableModalProps {
  title: string;
  open: boolean;
  onCancel: () => void;
  onOk?: () => void; // Make onOk optional
  okText?: string; // Optional custom text for the "OK" button
  children: React.ReactNode;
}

const ReusableModal: React.FC<ReusableModalProps> = (props) => {
  const { title, open, onCancel, onOk, okText, children } = props;

  return (
    <Modal
      title={title}
      open={open} // Use 'visible' instead of 'open'
      onOk={onOk} // Conditionally assign the 'onOk' callback
      onCancel={onCancel}
      okText={okText} // Use the custom 'okText' if provided
      okButtonProps={{
        style: onOk ? {} : { display: 'none' }, // Hide the button if onOk is not provided
      }}
    >
      {children}
    </Modal>
  );
};

export default ReusableModal;

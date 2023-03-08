import React from 'react'
import { Modal } from "antd";

interface EModalProps {
    title?: string;
    children?: React.ReactNode;
    open: boolean;
    confirmLoading?: boolean;
    onOk?: (i: any) => void;
    onCancel?: () => void;
  }

export const EModal: React.FC<EModalProps> = ({title, children, open, confirmLoading, onOk, onCancel}) => {
    return <Modal
        title={title}
        open={open}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
    >
        { children }
    </Modal>
}
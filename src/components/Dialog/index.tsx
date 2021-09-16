import React from 'react';
import { Modal } from 'antd';

interface PropsType {
    visible: boolean;
    title?: string;
    onCancel(): void;
    children?: React.ReactNode;
    width?: number;
}

function Dialog(props: PropsType) {
    const { title, visible, onCancel, children, width } = props;
    return (
        <Modal
            title={title}
            visible={visible}
            footer={null}
            onCancel={() => onCancel()}
            width={width || 480}
        >
            {children}
        </Modal>
    );
}

export default Dialog;

import React from 'react';
import { Modal, Button } from 'antd';
import { ButtonBox, Content, Message } from './style-components';
interface PropsType {
    visible: boolean;
    onCancel(): void;
    onConfirm(): void;
    message: string;
}

function Dialog(props: PropsType) {
    const { visible, onCancel, message, onConfirm } = props;
    return (
        <Modal
            title=""
            visible={visible}
            footer={null}
            closable={false}
            onCancel={() => onCancel()}
            width={400}
        >
            <div>
                <Content>
                    <Message>{message}</Message>
                </Content>
                <ButtonBox>
                    <Button type="primary" onClick={onConfirm} danger>
                        确认
                    </Button>
                    <Button onClick={() => onCancel()}>取消</Button>
                </ButtonBox>
            </div>
        </Modal>
    );
}

export default Dialog;

import React from 'react';
import { Modal, Button } from 'antd';
import { ButtonBox, Content, Message, Title, IconBox } from './style-components';
import Icon from '@ant-design/icons';
import { ReactComponent as IconQuery } from '../../images/icon/icon_label_query.svg';
import './reset.less';
interface PropsType {
    visible: boolean;
    title: string;
    onCancel(): void;
    onConfirm(): void;
    message: string;
}

function Dialog(props: PropsType) {
    const { visible, onCancel, message, onConfirm, title } = props;
    return (
        <Modal
            // title={title}
            visible={visible}
            footer={null}
            closable={false}
            onCancel={() => onCancel()}
            width={400}
        >
            <div>
                <Content>
                    <IconBox>
                        <Icon
                            className="queryLogo"
                            component={IconQuery}
                            style={{ fontSize: '20px' }}
                        ></Icon>
                    </IconBox>
                    <Title>{title}</Title>
                </Content>
                <Message>{message}</Message>
                <ButtonBox>
                    <Button style={{ marginRight: 12 }} onClick={() => onCancel()}>
                        取消
                    </Button>
                    <Button type="primary" onClick={onConfirm} danger>
                        确认
                    </Button>
                </ButtonBox>
            </div>
        </Modal>
    );
}

export default Dialog;

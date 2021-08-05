import React from 'react';
import { Content, Label } from './style-components';
import { Select } from 'antd';
import './reset.less';
import Icon from '@ant-design/icons';
import { ReactComponent as IconArrow } from '../../images/icon/icon_arrow_down.svg';
interface PropsType {
    label: string;
    option: Array<OptionsType>;
    value?: string;
    onChange(v: any): void;
    style?: { [key: string]: any };
}

interface OptionsType {
    value: string;
    text: string;
}

function LabelSelect(props: PropsType) {
    const { label, option, value = 'all', onChange, style = {} } = props;
    return (
        <div id="labelSelect">
            <Content style={style}>
                <Label>{label}</Label>
                <Select
                    defaultValue={value}
                    onChange={onChange}
                    suffixIcon={
                        <Icon
                            component={IconArrow}
                            style={{ fontSize: '20px', color: '#36435c' }}
                        ></Icon>
                    }
                >
                    {option.map((item) => {
                        return (
                            <Select.Option key={item.value} value={item.value}>
                                {item.text}
                            </Select.Option>
                        );
                    })}
                </Select>
            </Content>
        </div>
    );
}
export default LabelSelect;

import styled from 'styled-components';
import { CheckBoxInnerStyleType } from '../const';

export const Item = styled.div`
    background: rgb(255, 255, 255);
    border-radius: 0px;
    height: 36px;
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 8px;
    &:hover {
        background: rgb(243, 246, 250);
    }
`;

export const Name = styled.div`
    color: rgb(54, 67, 92);
    font-family: PingFangSC-Regular;
    font-size: 14px;
    margin-left: 12px;
`;

export const Icon = styled.div`
    height: 24px;
    width: 24px;
    background: orange;
    margin-left: 8px;
`;

export const CheckBox = styled.div<CheckBoxInnerStyleType>`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    margin-right: 8px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum', 'tnum';
    position: relative;
    /* top: 0.2em; */
    line-height: 1;
    white-space: nowrap;
    outline: none;
    cursor: pointer;
    &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid red;
        border-radius: 2px;
        visibility: hidden;
        -webkit-animation: antCheckboxEffect 0.36s ease-in-out;
        animation: antCheckboxEffect 0.36s ease-in-out;
        -webkit-animation-fill-mode: backwards;
        animation-fill-mode: backwards;
        content: '';
        display: ${(props) => (props.checked ? 'inline' : 'none')};
    }
`;

export const CheckBoxInner = styled.div<CheckBoxInnerStyleType>`
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 16px;
    height: 16px;
    direction: ltr;
    background-color: ${(props) => (props.checked ? 'rgb(0, 128, 255)' : '#fff')};
    border: ${(props) => (props.checked ? '1px solid rgb(0, 128, 255)' : '1px solid #d9d9d9')};
    border-radius: 2px;
    border-collapse: separate;
    transition: all 0.3s;
    &::after {
        position: absolute;
        top: 50%;
        left: 22%;
        display: table;
        width: 5.71428571px;
        height: 9.14285714px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: ${(props) =>
            props.checked
                ? 'rotate(45deg) scale(1) translate(-50%, -50%)'
                : 'rotate(45deg) scale(0) translate(-50%, -50%)'};
        opacity: ${(props) => (props.checked ? '1' : '0')};

        transition: ${(props) =>
            props.checked
                ? 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s'
                : 'all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s'};

        content: ' ';
    }
`;

export const DeleteIcon = styled.div`
    height: 20px;
    width: 20px;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
`;

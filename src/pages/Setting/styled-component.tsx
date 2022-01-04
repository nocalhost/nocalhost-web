import styled from 'styled-components';
import step1active from '../../images/bg_left_select.svg';
import step1normal from '../../images/bg_left_unselect.svg';
import step2active from '../../images/bg_right_select.svg';
import step2normal from '../../images/bg_right_unselect.svg';

export const SettingWrap = styled.div`
    display: flex;
    min-height: 604px;
    background: #ffffff;

    .menu {
        width: 200px;
        border-right: 1px solid #dae1e8;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        font-weight: 600;
        color: #36435c;

        .title {
            padding: 16px 0 16px 20px;
        }

        &-list {
            font-size: 14px;

            &-item {
                height: 40px;
                padding: 0 20px;
                display: flex;
                align-items: center;
                cursor: pointer;

                &.active,
                &:hover {
                    color: #0066ff;
                    border-right: 2px solid #0066ff;
                    background: #f3f6fa;
                }
            }
        }
    }

    .content {
        flex: 1;
        padding: 0 20px;

        .title {
            padding: 16px 0;
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            font-weight: 600;
            color: #36435c;
        }
    }
`;

interface IThirdAccount {
    status: string;
}

interface IConfigService {
    step: number;
}

export const ThirdAccountWrap = styled.div<IThirdAccount>`
    display: flex;
    padding: 30px 20px;
    border: 1px solid #dae1e8;
    border-radius: 4px;
    justify-content: space-between;
    align-items: center;

    .left {
        display: flex;
        align-items: center;

        .logo {
            width: 40px;
            height: 40px;
        }

        .content {
            .sub-title {
                color: #202d40;
                display: flex;
                align-items: center;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                font-size: 16px;

                .status {
                    height: 18px;
                    padding: 0 4px;
                    display: flex;
                    align-items: center;
                    margin-left: 8px;
                    font-size: 12px;
                    color: #ffffff;
                    border-radius: 2px;
                    background: ${(props) =>
                        props.status === 'unallocated' ? '#ffac52' : '#4ac285'};
                }
            }

            .desc {
                margin-top: 10px;
                font-size: 12px;
                color: #79879c;
            }
        }
    }

    .btn-box {
        display: flex;
        align-items: center;

        .popup-btn {
            display: flex;
            align-items: center;
        }

        svg {
            &:hover {
                path {
                    fill: #faad14;
                }
            }
        }
    }
`;

export const ConfigServiceWrap = styled.div<IConfigService>`
    display: block;
    overflow: hidden;

    .desc {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        font-weight: normal;
        color: #79879c;
    }

    .progress {
        height: 68px;
        margin-top: 20px;
        display: flex;
        align-items: center;

        .step {
            height: 68px;
            width: 50%;
            padding: 14px;
            flex-basis: 50%;
            display: flex;
            position: relative;
            background-size: cover;

            &::after {
                content: '';
                width: 0;
                height: 0;
                display: block;
                position: absolute;
                top: 100%;
                left: 50%;
                border: 10px solid transparent;
                border-bottom: 10px solid #f9fbfd;
                transform: translate(-10px, -10px);
            }

            &:nth-child(1) {
                background: url(${(props) => (props.step === 1 ? step1active : step1normal)})
                    no-repeat;
                position: absolute;
                z-index: 10;

                &::after {
                    visibility: ${(props) => (props.step === 1 ? 'visible' : 'hidden')};
                }
            }

            &:nth-child(2) {
                width: 314px;
                position: absolute;
                padding-left: 40px;
                padding-right: 0;
                left: 50%;
                background: url(${(props) => (props.step === 2 ? step2active : step2normal)})
                    no-repeat;

                &::after {
                    visibility: ${(props) => (props.step === 2 ? 'visible' : 'hidden')};
                }
            }

            .icon {
                height: 24px;
                width: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgb(239, 244, 249);
                border: 2px solid rgb(255, 255, 255);
                box-shadow: 0px 3px 8px 0px rgba(54, 67, 92, 0.2);
                border-radius: 50%;
                font-family: PingFangSC-Semibold;
                font-size: 12px;
                font-weight: 600;
                color: #b6c2cd;

                &.active {
                    background: rgb(0, 128, 255);
                    border: 2px solid rgb(255, 255, 255);
                    box-shadow: 0px 3px 8px 0px rgba(0, 128, 255, 0.3);
                    color: #ffffff;
                }
            }

            .content {
                margin-left: 6px;

                .title {
                    color: rgb(32, 45, 64);
                    font-family: PingFangSC-Semibold;
                    font-size: 16px;
                    font-weight: 600;
                }

                .desc {
                    color: rgb(121, 135, 156);
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                }
            }
        }
    }

    .form-wrap {
        margin-top: 10px;
        padding: 20px 10px;
        background: #f9fbfd;
        font-size: 14px;

        .member-rule {
            padding: 20px 10px 20px 0;
            position: relative;
            min-height: 184px;
            border-radius: 4px;
            border: 1px solid rgb(218, 225, 232);

            .rule-label {
                position: absolute;
                background: #f9fbfd;
                top: 0;
                left: 0;
                transform: translate(10px, -50%);
                font-family: PingFangSC-Semibold;
                font-size: 14px;
                font-weight: 600;
            }

            .rule-tip {
                padding: 0 10px;
                font-size: 12px;
                color: #79879c;
            }
        }

        .advance {
            &-setting {
                margin-top: 20px;
            }

            &-label {
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                cursor: pointer;
            }
        }

        .ant-form-item-label {
            padding-left: 10px;
        }
    }

    .btn-box {
        margin-top: 24px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .ant-form-item-control-input {
        box-shadow: none;
    }
`;

export const PopupWrap = styled.ul`
    .list-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 106px;
        height: 32px;
        cursor: pointer;

        &:hover {
            background: #f3f6fa;
        }

        font-family: PingFangSC-Regular;
        font-size: 14px;
        font-weight: normal;

        &.modify {
            color: rgb(32, 45, 64);
        }

        &.del {
            color: #ff3f3f;
        }
    }
`;

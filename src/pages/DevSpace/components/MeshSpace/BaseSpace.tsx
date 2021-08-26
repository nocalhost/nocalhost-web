import React, { useEffect, useState, useRef } from 'react';

import styled from 'styled-components';
import { Tooltip } from 'antd';

import { useTranslation } from 'react-i18next';

import Icon from '@ant-design/icons';
import { ReactComponent as IconCluster } from '../../../../images/icon/icon_cluster.svg';
import { ReactComponent as IconSpace } from '../../../../images/icon/icon_normal_devspace.svg';
import IconWorkLoad from '../../../../images/icon/image_normal_applicationService.svg';
import IconBlueWorkLoad from '../../../../images/icon/image_active_blue_applicationService.svg';
import IconGreenWorkLoad from '../../../../images/icon/image_active_green_applicationService.svg';
import ImageEmpty from '../../../../images/icon/image_empty_space.svg';
import { ReactComponent as ImageComputerUp } from '../../../../images/mesh-icon/image_computerUp.svg';
import { ReactComponent as ImageComputerDown } from '../../../../images/mesh-icon/image_computerDown.svg';
import { ReactComponent as IconExplain } from '../../../../images/icon/icon_label_explain.svg';
import { ReactComponent as IconDeployment } from '../../../../images/icon//icon_deployments.svg';
import { ReactComponent as IconDaemonset } from '../../../../images/icon/icon_daemonset.svg';
import { ReactComponent as IconJob } from '../../../../images/icon/icon_jobs.svg';
import { ReactComponent as IconCronjob } from '../../../../images/icon/icon_cronjob.svg';
import { ReactComponent as IconStatefulSet } from '../../../../images/icon/icon_statefulsets.svg';
import { ReactComponent as WayLine } from '../../../../images/mesh-icon/way1.svg';
import { ReactComponent as BlueArrow } from '../../../../images/mesh-icon/arrow.svg';
import { ReactComponent as IconTracingHeader } from '../../../../images/icon/icon_normal_tracingHeaders.svg';
import { ReactComponent as IconActiveTracingHeader } from '../../../../images/icon/icon_active_tracingHeaders.svg';
import WayLeftDown from '../../../../images/mesh-icon/way_leftDown.svg';
import WayLeftUp from '../../../../images/mesh-icon/way_leftUp.svg';
import WayRightDown from '../../../../images/mesh-icon/way_rightDown.svg';
import WayRightUp from '../../../../images/mesh-icon/way_rightUp.svg';
import wayOrLine from '../../../../images/mesh-icon/way4.svg';
import CommonIcon from '../../../../components/CommonIcon';
import { ContentStyleProps, SpaceIconStyleProps } from './type';
import { ReactComponent as IconPath } from '../../../../images/mesh-icon/icon_path.svg';
import {
    windowAnimationStartHandle,
    windowAnimationEndHandle,
    removeWindowAnimationEndHandle,
} from './windowAnimationHandle';

const ICON_MAP: {
    [index: string]: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
            title?: string | undefined;
        }
    >;
} = {
    Deployment: IconDeployment,
    DaemontSet: IconDaemonset,
    Job: IconJob,
    CronJob: IconCronjob,
    StatefulSet: IconStatefulSet,
};

// eslint-disable-next-line no-undef
const SpaceIcon = styled.div<SpaceIconStyleProps>`
    g {
        stroke: ${(props) =>
            props.end ? '#0080ff' : props.selectEnd ? '#12a75c' : 'rgb(121, 135, 156);'};
    }
`;

// eslint-disable-next-line no-undef
const SelectIcon = styled.div<{ end: boolean }>`
    g {
        stroke: ${(props) => (props.end ? '#12a75c' : 'rgb(121, 135, 156);')};
    }
`;

// eslint-disable-next-line no-undef
const WayLeft = styled.div<{ wayLeftWidth: number }>`
    width: ${(props) => props.wayLeftWidth}px;
    transform: translateX(-${(props) => props.wayLeftWidth}px);
    /* height: 40px; */
    position: absolute;
    height: 40px;
    top: 0;
    left: 50%;
    display: flex;
    .wayLeftDown {
        background-image: url(${WayLeftDown});
        width: 25px;
        height: 40px;
    }
    .wayOrLine {
        background-image: url(${wayOrLine});
        width: ${(props) => props.wayLeftWidth - 50}px;
        position: relative;
        top: 15px;
        height: 10px;
    }
    .wayLeftUp {
        background-image: url(${WayLeftUp});
        width: 25px;
        height: 40px;
    }
`;
// eslint-disable-next-line no-undef
const WayRight = styled.div<{ wayRightWidth: number }>`
    width: ${(props) => props.wayRightWidth}px;
    transform: translateX(${(props) => props.wayRightWidth}px);
    /* height: 40px; */
    position: absolute;
    height: 40px;
    top: 0;
    /* bottom: -40px; */
    right: 50%;
    display: flex;
    .wayRightDown {
        background-image: url(${WayRightDown});
        width: 25px;
        height: 40px;
    }
    .wayOrLine {
        background-image: url(${wayOrLine});
        width: ${(props) => props.wayRightWidth - 50}px;
        position: relative;
        top: 15px;
        height: 10px;
    }
    .wayRightUp {
        background-image: url(${WayRightUp});
        width: 25px;
        height: 40px;
    }
`;

// eslint-disable-next-line no-undef
const ContentWrap = styled.div<ContentStyleProps>`
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
        height: 102px;
        display: flex;
        /* justify-content: center; */
        flex-direction: column;
        position: relative;
        align-items: center;
        .computerUp {
            position: relative;
            z-index: 0;
        }
        .computerDown {
            position: relative;
            z-index: 2;
        }
        &::after {
            opacity: ${(props) => (props.hiddenIcon ? 0 : 1)};
            content: '';
            background: linear-gradient(
                -90deg,
                rgba(22, 118, 238, 0) 0%,
                rgb(22, 118, 238) 50%,
                rgba(22, 118, 238, 0) 100%
            );
            width: 50px;
            height: 1px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 11px;
            z-index: 3;
            animation: width-an 2s 0s 1 linear;
            animation-iteration-count: infinite;
        }
        .wayLine {
            position: absolute;
            bottom: -80px;
            left: 50%;
            transform: translateX(-50%);
        }
        .blueArrow {
            position: absolute;
            z-index: 2;
            top: 18px;
            animation: run-to-bottom 2s 0.1s 1 linear, run-to-top 2s 3.5s 1 linear;
            animation-fill-mode: forwards;
        }
        .secondBlueArrow {
            position: absolute;
            z-index: 2;
            top: 18px;
            // cubic-bezier(0.68, -0.03, 0.95, 0.11),
            animation: blue-to-bottom 2s 0.1s 1 linear,
                blue-cubic-left 0.5s 2.6s 1 cubic-bezier(0.65, -0.08, 1, 0.14),
                blue-cubic-bottom 0.5s 2.6s 1 linear, blue-line-left 2s 3.1s 1 linear,
                blue-cubic-last-bottom 0.5s 5.1s 1 cubic-bezier(0.72, -0.03, 1, 0.5),
                blue-cubic-last-left 0.5s 5.1s 1 linear,
                back-cubic-last-left 0.5s 6.6s 1 cubic-bezier(0.72, -0.03, 1, 0.5),
                back-blue-cubic-last-bottom 0.5s 6.6s 1 linear, back-blue-line-left 2s 7.1s 1 linear,
                back-blue-cubic-bottom 0.5s 9.1s 1 cubic-bezier(0.66, 0.06, 0.89, 0.34),
                back-blue-cubic-left 0.5s 9.1s 1 linear, back-blue-to-bottom 2s 9.7s 1 linear;
            animation-fill-mode: forwards;
            // cubic-bezier(.51,0,1,.14)
        }
        .threeBlueArrow {
            g {
                fill: #12a75c;
            }
            position: absolute;
            z-index: 2;
            top: 18px;
            animation: blue-to-bottom 2s 0.1s 1 linear,
                green-cubic-right 0.5s 2.6s 1 cubic-bezier(0.65, -0.08, 1, 0.14),
                green-cubic-bottom 0.5s 2.6s 1 linear, green-line-left 2.5s 3.1s 1 linear,
                green-cubic-last-bottom 0.5s 5.6s 1 cubic-bezier(0.72, -0.03, 1, 0.5),
                green-cubic-last-right 0.5s 5.6s 1 linear, green-last-line-left 0.5s 7.1s 1 linear,
                back-green-last-line-left 0.5s 8.6s 1 linear,
                back-green-cubic-last-right 0.5s 10.1s 1 cubic-bezier(0.72, -0.03, 1, 0.5),
                back-green-cubic-last-bottom 0.5s 10.1s 1 linear,
                back-green-line-left 2.5s 10.6s 1 linear, back-green-cubic-right 0.5s 13.1s 1 linear,
                back-green-cubic-bottom 0.5s 13.1s 1 cubic-bezier(0.66, 0.06, 0.89, 0.34),
                back-blue-to-bottom 2s 14.2s 1 linear;
            animation-fill-mode: forwards;
        }
    }

    @keyframes width-an {
        0% {
            width: 50px;
        }
        50% {
            width: 104px;
        }
        100% {
            width: 50px;
        }
    }

    @keyframes run-to-bottom {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(160px);
        }
    }

    @keyframes run-to-top {
        0% {
            transform: translateY(160px) rotate(180deg);
        }
        100% {
            transform: translateY(0) rotate(180deg);
        }
    }

    @keyframes green-cubic-right {
        0% {
            transform: translateX(4px) rotate(0deg);
        }
        100% {
            transform: translateX(36px) rotate(-90deg);
        }
    }
    @keyframes back-green-cubic-right {
        0% {
            transform: translateX(36px) rotate(90deg);
        }
        50% {
            transform: translateX(14px) rotate(135deg);
        }
        100% {
            transform: translateX(4px) rotate(180deg);
        }
    }

    @keyframes green-cubic-bottom {
        0% {
            top: 243px;
        }
        100% {
            top: 269px;
        }
    }

    @keyframes back-green-cubic-bottom {
        0% {
            top: 269px;
        }
        100% {
            top: 243px;
        }
    }

    @keyframes green-line-left {
        0% {
            transform: translateX(36px) rotate(-90deg);
        }
        100% {
            transform: translateX(${(props) => props.wayRightWidth + 22}px) rotate(-90deg);
        }
    }
    @keyframes back-green-line-left {
        0% {
            transform: translateX(${(props) => props.wayRightWidth + 22}px) rotate(90deg);
        }
        100% {
            transform: translateX(36px) rotate(90deg);
        }
    }

    @keyframes green-cubic-last-bottom {
        0% {
            top: 269px;
        }
        100% {
            top: 300px;
        }
    }
    @keyframes back-green-cubic-last-bottom {
        100% {
            top: 269px;
        }
        0% {
            top: 300px;
        }
    }

    @keyframes green-cubic-last-right {
        0% {
            transform: translateX(${(props) => props.wayRightWidth + 22}px) rotate(-90deg);
        }
        50% {
            transform: translateX(${(props) => props.wayRightWidth + 40}px) rotate(-80deg);
        }
        100% {
            transform: translateX(${(props) => props.wayRightWidth + 46}px) rotate(0deg);
        }
    }

    @keyframes back-green-cubic-last-right {
        0% {
            transform: translateX(${(props) => props.wayRightWidth + 46}px) rotate(180deg);
        }
        100% {
            transform: translateX(${(props) => props.wayRightWidth + 22}px) rotate(90deg);
        }
    }

    @keyframes green-last-line-left {
        // 300 + 32 + 32 - 4
        0% {
            top: ${(props) => props.selectBoxHeight / 2 + 32 + 40 + 300 - 15}px;
            transform: translateX(
                    ${(props) => props.wayRightWidth + 22 - props.selectBoxWidth / 2 + 5 - 12}px
                )
                rotate(90deg);
        }
        100% {
            top: ${(props) => props.selectBoxHeight / 2 + 32 + 40 + 300 - 15}px;
            transform: translateX(
                    ${(props) =>
                        props.wayRightWidth + 22 - props.selectBoxWidth / 2 - 40 + 4 - 16}px
                )
                rotate(90deg);
        }
    }

    @keyframes back-green-last-line-left {
        0% {
            top: ${(props) => props.selectBoxHeight / 2 + 32 + 40 + 300 - 15}px;
            transform: translateX(
                    ${(props) =>
                        props.wayRightWidth + 22 - props.selectBoxWidth / 2 - 40 + 4 - 12}px
                )
                rotate(-90deg);
        }
        // 300 + 32 + 32 - 4
        100% {
            top: ${(props) => props.selectBoxHeight / 2 + 32 + 40 + 300 - 15}px;
            transform: translateX(
                    ${(props) =>
                        props.wayRightWidth + 22 - props.selectBoxWidth / 2 + 10 + 9 - 14}px
                )
                rotate(-90deg);
        }
    }

    @keyframes blue-to-bottom {
        0% {
            top: 18px;
        }
        100% {
            top: 188px;
        }
    }

    @keyframes back-blue-to-bottom {
        0% {
            top: 187px;
            transform: translateX(0px) rotate(180deg);
        }
        100% {
            top: 18px;
            transform: translateX(0px) rotate(180deg);
        }
    }

    @keyframes blue-cubic-bottom {
        0% {
            top: 244px;
        }
        100% {
            top: 269px;
        }
    }

    @keyframes back-blue-cubic-bottom {
        0% {
            top: 269px;
        }
        100% {
            top: 226px;
        }
    }

    @keyframes blue-cubic-left {
        0% {
            transform: translateX(-4px) rotate(0deg);
        }
        100% {
            transform: translateX(-36px) rotate(90deg);
        }
    }

    @keyframes back-blue-cubic-left {
        0% {
            transform: translateX(-36px) rotate(270deg);
        }
        50% {
            transform: translateX(-10px) rotate(225deg);
        }
        100% {
            transform: translateX(-2px) rotate(180deg);
        }
    }

    @keyframes blue-line-left {
        0% {
            transform: translateX(-36px) rotate(90deg);
        }
        100% {
            transform: translateX(-${(props) => props.wayLeftWidth + 20}px) rotate(90deg);
        }
    }
    @keyframes back-blue-line-left {
        0% {
            transform: translateX(-${(props) => props.wayLeftWidth + 20}px) rotate(270deg);
        }
        100% {
            transform: translateX(-36px) rotate(270deg);
        }
    }

    @keyframes blue-cubic-last-bottom {
        0% {
            top: 269px;
        }
        100% {
            top: 300px;
        }
    }
    @keyframes back-blue-cubic-last-bottom {
        0% {
            top: 300px;
        }
        100% {
            top: 269px;
        }
    }
    @keyframes blue-cubic-last-left {
        0% {
            transform: translateX(-${(props) => props.wayLeftWidth + 20}px) rotate(90deg);
        }
        50% {
            transform: translateX(-${(props) => props.wayLeftWidth + 33}px) rotate(70deg);
        }
        100% {
            transform: translateX(-${(props) => props.wayLeftWidth + 46}px) rotate(0deg);
        }
    }

    @keyframes back-cubic-last-left {
        0% {
            transform: translateX(-${(props) => props.wayLeftWidth + 46}px) rotate(180deg);
        }
        100% {
            transform: translateX(-${(props) => props.wayLeftWidth + 20}px) rotate(270deg);
        }
    }

    .wayLineBoth {
        height: 40px;
        position: relative;
        width: 100%;
        flex-shrink: 0;
    }
    .content {
        background: #eff4f9;
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 16px 24px;
        .wayOrLineD {
            position: absolute;
            right: ${(props) => props.selectBoxWidth + 31}px;
            width: 40px;
            height: 10px;
            background-image: url(${wayOrLine});
            top: ${(props) => props.selectBoxHeight / 2 + 40 + 32 + 40}px;
            transform: translateY(-10px);
            z-index: 1;
        }

        .mainZheLeft {
            position: absolute;
            top: 40px;
            left: ${(props) => props.workLoadWidth / 2 - 40}px;
            width: 80px;
            height: 16px;
            background: rgb(239, 244, 249);
            z-index: 3;
        }
        .mainZheRight {
            position: absolute;
            top: 40px;
            right: ${(props) => props.selectBoxWidth / 2 - 40}px;
            width: 80px;
            height: 16px;
            background: rgb(239, 244, 249);
            z-index: 3;
        }
        .serviceZhe {
            position: absolute;
            height: ${(props) => props.selectBoxHeight / 2 + 40 + 32 + 40 + 10}px;
            width: 15px;
            top: 114px;
            right: ${(props) => props.selectBoxWidth + 57 + 32 - 17}px;
            z-index: 3;
            background: rgb(239, 244, 249);
        }
        .selectedZhe {
            position: absolute;
            height: ${(props) => props.selectBoxHeight / 2 + 40 + 32 + 40 + 10}px;
            width: 15px;
            top: 114px;
            right: ${(props) => props.selectBoxWidth - 5 + 21}px;
            z-index: 3;
            background: rgb(239, 244, 249);
        }
        .icon-wrap {
            display: flex;
            align-items: center;

            span {
                margin-left: 10px;
                color: rgb(54, 67, 92);
                font-family: PingFangSC-Semibold;
                font-size: 16px;
                font-weight: 600;
            }
        }

        .tracing-header {
            position: relative;
            z-index: 3;
            margin-top: 16px;
            height: 82px;
            padding: 16px;
            background: rgb(239, 244, 249);
            border-radius: 4px;
            box-shadow: inset -1px -1px 0 0 rgba(40, 47, 55, 0.05),
                inset 1px 1px 0 0 rgba(255, 255, 255, 0.75),
                -10px -10px 12px 0 rgba(255, 255, 255, 0.6), 12px 12px 12px 0 rgba(40, 47, 55, 0.05);

            .content {
                display: flex;
                justify-content: center;
                align-items: center;
                background: #ffffff;
                padding: 10px 24px;
                .desc {
                    background: rgb(239, 244, 249);
                    border-radius: 4px;
                    height: 30px;
                    padding: 0 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: rgb(121, 135, 156);
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    font-weight: normal;
                }
            }
        }

        .main {
            position: relative;
            z-index: 0;
            margin-top: 16px;
            background: rgb(239, 244, 249);
            border-radius: 4px;
            height: 100%;
            // box-shadow: inset -1px -1px 0 0 rgba(40, 47, 55, 0.05),
            //     inset 1px 1px 0 0 rgba(255, 255, 255, 0.75),
            //     -10px -10px 12px 0 rgba(255, 255, 255, 0.6), 12px 12px 12px 0 rgba(40, 47, 55, 0.05);
            .wrap {
                display: flex;
                flex: 1;
                height: calc(100% - 16px);
            }
            .title {
                height: 40px;
                display: flex;
                align-items: center;
                min-height: 40px;
                .title-info {
                    display: flex;
                    flex-direction: column;

                    span {
                        margin-left: 8px;
                        color: rgb(54, 67, 92);
                        font-family: PingFangSC-Semibold;
                        font-size: 14px;
                        font-weight: 600;

                        &:nth-child(2) {
                            color: rgb(121, 135, 156);
                            font-family: PingFangSC-Regular;
                            font-size: 12px;
                            font-weight: normal;
                        }
                    }
                }
            }
            .workload-container,
            .selected-workload-container {
                flex: 2;
                display: flex;
                padding: 14px 16px;
                flex-direction: column;
                .service-box {
                    border-radius: 4px;
                    position: relative;
                    .arrowShadow {
                        position: absolute;
                        right: 0px;
                        top: 0px;
                        width: 20px;
                        height: 100%;
                        z-index: 2;
                    }
                }

                .service-box,
                .selected-box {
                    padding: 12px 20px;
                    margin-top: 16px;
                    background: #ffffff;
                    display: flex;
                    flex-wrap: wrap;
                    align-content: flex-start;
                    justify-content: space-between;
                    border-radius: 4px;

                    .workload-item {
                        margin-bottom: 12px;
                        height: 60px;

                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        .icon-box {
                            position: relative;

                            .tip-icon {
                                position: absolute;
                                top: 4px;
                                left: calc(100% - 2px);
                                background: rgb(182, 194, 205);
                                border-radius: 9.14px;
                                height: 16px;
                                width: 16px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                        }
                    }

                    .workload-info {
                        width: 110px;
                        margin-top: 4px;
                        padding: 0 8px;
                        background: rgb(221, 230, 239);
                        border-radius: 12px;
                        height: 22px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;

                        .name {
                            flex: 1;
                            margin-left: 6px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            word-break: keep-all;
                        }
                    }
                }

                .service-box,
                .selected-box {
                    flex: 2;

                    .empty-box {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        span {
                            margin-top: 8px;
                            display: inline-block;
                            width: 118px;
                            color: rgb(121, 135, 156);
                            font-family: PingFangSC-Regular;
                            font-size: 12px;
                            font-weight: normal;
                            text-align: center;
                        }
                    }
                }

                .selected-box {
                    flex: 1;
                }
            }

            .workload-container {
                background: rgb(239, 244, 249);
                border-radius: 4px;
                box-shadow: inset -1px -1px 0px 0px rgba(40, 47, 55, 0.05),
                    inset 1px 1px 0px 0px rgba(255, 255, 255, 0.75),
                    -10px -10px 12px 0px rgba(255, 255, 255, 0.6),
                    12px 12px 12px 0px rgba(40, 47, 55, 0.05);
            }

            .selected-workload-container {
                flex: 1;
                margin-left: 40px;
                background: rgb(239, 244, 249);
                border-radius: 4px;
                box-shadow: inset -1px -1px 0px 0px rgba(40, 47, 55, 0.05),
                    inset 1px 1px 0px 0px rgba(255, 255, 255, 0.75),
                    -10px -10px 12px 0px rgba(255, 255, 255, 0.6),
                    12px 12px 12px 0px rgba(40, 47, 55, 0.05);
            }
        }
    }
`;

interface IProps {
    clusterName: string;
    currentSpace: any;
    appList: any;
    selectedAppList: any;
    currentStep: number;
    headerInfo: HeaderInfo | undefined;
    shareSpace: any;
}

interface HeaderInfo {
    key: string;
    value: string;
}

const BaseSpace = ({
    clusterName,
    currentSpace,
    appList,
    selectedAppList,
    currentStep,
    headerInfo,
    shareSpace,
}: IProps) => {
    const { t } = useTranslation();
    const firstBlueArrow = useRef<SVGSVGElement>(null);
    const timer = useRef<number | null>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const workLoadRef = useRef<HTMLDivElement>(null);
    const selectBoxRef = useRef<HTMLDivElement>(null);
    const secondBlueArrow = useRef<SVGSVGElement>(null);
    const threeBlueArrow = useRef<SVGSVGElement>(null);
    const wayOrLineRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const [showBlueArrayIndex, setShowBlueArrayIndex] = useState(0);
    const [animationEnd, setAnimationEnd] = useState(false);
    const [wayLeftWidth, setWayLeftWidth] = useState(0);
    const [wayRightWidth, setWayRightWidth] = useState(0);
    const [selectBoxWidth, setSelectBoxWidth] = useState(0);
    const [selectBoxHeight, setSelectBoxHeight] = useState(0);
    const [wayOrLineOffsetTop, setWayOrLineOffsetTop] = useState(0);
    const [workLoadWidth, setWorkLoadWidth] = useState(0);
    const [selectAnimationEnd, setSelectAnimationEnd] = useState(false);
    const [selectAnimationSpaceEnd, setSelectAnimationSpaceEnd] = useState(false);
    const [greenCluster, setGreenCluster] = useState(false);
    useEffect(() => {
        if (currentSpace && appList.length > 0) {
            if (currentStep === 0) {
                setShowBlueArrayIndex(1);
            } else {
                setShowBlueArrayIndex(2);
            }
        } else {
            setShowBlueArrayIndex(0);
        }
    }, [currentSpace, clusterName, appList]);
    const firstAnimationHandle = () => {
        windowAnimationEndHandle(firstBlueArrow?.current, function (...args: any) {
            if (args[0]?.animationName === 'run-to-bottom') {
                setAnimationEnd(true);
            }
            if (args[0]?.animationName === 'run-to-top') {
                timer.current && clearTimeout(timer.current);
                timer.current = null;
                setShowBlueArrayIndex(0);
                timer.current = window.setTimeout(() => {
                    setShowBlueArrayIndex(1);
                }, 500);
            }
        });
        windowAnimationStartHandle(firstBlueArrow?.current, function (...args: any) {
            if (args[0]?.animationName === 'run-to-top') {
                setAnimationEnd(false);
            }
        });
    };
    const secondAnimationHandle = () => {
        windowAnimationEndHandle(secondBlueArrow?.current, function (...args: any) {
            if (args[0]?.animationName === 'blue-cubic-last-left') {
                setAnimationEnd(true);
            }

            if (args[0]?.animationName === 'back-blue-to-bottom') {
                timer.current && clearTimeout(timer.current);
                timer.current = null;
                if (headerInfo) {
                    setShowBlueArrayIndex(3);
                } else {
                    setShowBlueArrayIndex(0);
                    timer.current = window.setTimeout(() => {
                        setShowBlueArrayIndex(2);
                    }, 500);
                }
            }
        });
        windowAnimationStartHandle(secondBlueArrow?.current, function (...args: any) {
            if (args[0]?.animationName === 'back-cubic-last-left') {
                setAnimationEnd(false);
            }
        });
    };
    const threeAnimationHandle = () => {
        windowAnimationEndHandle(threeBlueArrow?.current, function (...args: any) {
            if (args[0]?.animationName === 'green-cubic-last-right') {
                setSelectAnimationEnd(true);
            }
            if (args[0]?.animationName === 'back-green-last-line-left') {
                setSelectAnimationEnd(true);
            }

            if (args[0]?.animationName === 'green-last-line-left') {
                setSelectAnimationSpaceEnd(true);
            }
            if (args[0]?.animationName === 'blue-to-bottom') {
                setGreenCluster(true);
            }
            if (args[0]?.animationName === 'back-green-cubic-bottom') {
                setGreenCluster(true);
            }
            if (args[0]?.animationName === 'back-blue-to-bottom') {
                setShowBlueArrayIndex(2);
            }
        });

        windowAnimationStartHandle(threeBlueArrow?.current, function (...args: any) {
            if (args[0]?.animationName === 'back-green-cubic-last-right') {
                setSelectAnimationEnd(false);
            }
            if (args[0]?.animationName === 'green-last-line-left') {
                setSelectAnimationEnd(false);
            }
            if (args[0]?.animationName === 'back-green-last-line-left') {
                setSelectAnimationSpaceEnd(false);
            }
            if (args[0]?.animationName === 'back-blue-to-bottom') {
                setGreenCluster(false);
            }
            if (args[0]?.animationName === 'green-cubic-bottom') {
                setGreenCluster(false);
            }
        });
    };
    useEffect(() => {
        if (currentStep === 1) {
            setShowBlueArrayIndex(2);
            setAnimationEnd(false);
            const headWidth = headRef?.current?.offsetWidth || 0;
            // const headHeight = headRef?.current?.offsetHeight || 0;
            const workLoadWidth = workLoadRef?.current?.offsetWidth || 0;
            const selectBoxWidth = selectBoxRef?.current?.offsetWidth || 0;
            const selectBoxHeight = selectBoxRef?.current?.offsetHeight || 0;
            const width: number = Math.ceil(headWidth / 2 - workLoadWidth / 2);
            const rightWidth: number = Math.ceil(headWidth / 2 - selectBoxWidth / 2);
            const wayOrLineOffsetTop = wayOrLineRef?.current?.offsetTop || 0;
            // const mainRefTop = mainRef?.current?.offsetTop || 0;
            setWayLeftWidth(width);
            setWayRightWidth(rightWidth);
            setSelectBoxWidth(selectBoxWidth);
            setWorkLoadWidth(workLoadWidth);
            setSelectBoxHeight(selectBoxHeight);
            setWayOrLineOffsetTop(wayOrLineOffsetTop);
        } else {
            setShowBlueArrayIndex(1);
        }
    }, [currentStep]);
    useEffect(() => {
        if (showBlueArrayIndex === 1 && currentStep == 0 && appList.length > 0) {
            firstAnimationHandle();
        }
    }, [currentStep, appList, showBlueArrayIndex]);
    useEffect(() => {
        if (
            currentStep == 1 &&
            wayLeftWidth > 0 &&
            appList.length > 0 &&
            showBlueArrayIndex === 2
        ) {
            secondAnimationHandle();
        }
    }, [currentStep, wayLeftWidth, appList, showBlueArrayIndex]);
    useEffect(() => {
        if (
            currentStep == 1 &&
            wayRightWidth > 0 &&
            appList.length > 0 &&
            showBlueArrayIndex === 3
        ) {
            threeAnimationHandle();
        }
    }, [currentStep, wayRightWidth, appList, showBlueArrayIndex]);
    useEffect(() => {
        if (secondBlueArrow?.current) {
            removeWindowAnimationEndHandle(secondBlueArrow?.current, function (...args: any) {
                if (args[0]?.animationName === 'blue-cubic-last-left') {
                    setAnimationEnd(true);
                }

                if (args[0]?.animationName === 'back-blue-to-bottom') {
                    timer.current && clearTimeout(timer.current);
                    timer.current = null;
                    if (headerInfo) {
                        setShowBlueArrayIndex(3);
                    } else {
                        setShowBlueArrayIndex(0);
                        timer.current = window.setTimeout(() => {
                            setShowBlueArrayIndex(2);
                        }, 500);
                    }
                }
            });
            secondAnimationHandle();
        }
    }, [headerInfo]);
    return (
        <ContentWrap
            hiddenIcon={currentSpace && appList.length > 0}
            wayLeftWidth={wayLeftWidth - 50}
            wayRightWidth={wayRightWidth - 50}
            selectBoxWidth={selectBoxWidth}
            wayOrLineOffsetTop={wayOrLineOffsetTop}
            selectBoxHeight={selectBoxHeight}
            workLoadWidth={workLoadWidth}
        >
            <div className="header">
                {showBlueArrayIndex === 1 && currentStep == 0 && appList.length > 0 && (
                    <BlueArrow className="blueArrow" ref={firstBlueArrow}></BlueArrow>
                )}
                {currentStep == 1 &&
                    wayLeftWidth > 0 &&
                    appList.length > 0 &&
                    showBlueArrayIndex === 2 && (
                        <BlueArrow className="secondBlueArrow" ref={secondBlueArrow}></BlueArrow>
                    )}
                {currentStep == 1 && wayRightWidth > 0 && showBlueArrayIndex === 3 && (
                    <BlueArrow className="threeBlueArrow" ref={threeBlueArrow}></BlueArrow>
                )}
                <ImageComputerUp className="computerUp" />
                <ImageComputerDown className="computerDown" />
                <div className="wayLine">
                    <WayLine></WayLine>
                </div>
            </div>
            <div className="content">
                <div className="icon-wrap">
                    <Icon component={IconCluster} style={{ fontSize: 40 }} />
                    <span>{clusterName}</span>
                </div>
                {currentStep === 1 && (
                    <div className="tracing-header" ref={headRef}>
                        <div className="content">
                            <div
                                className="desc"
                                style={
                                    greenCluster && !!headerInfo
                                        ? {
                                              background: 'rgb(186, 237, 212)',
                                              boxShadow: '0px 0px 8px 0px rgba(18, 167, 92, 0.1)',
                                          }
                                        : {}
                                }
                            >
                                {headerInfo ? (
                                    greenCluster ? (
                                        <Icon
                                            component={IconActiveTracingHeader}
                                            style={{ fontSize: 16, marginRight: 4 }}
                                        />
                                    ) : (
                                        <Icon
                                            component={IconTracingHeader}
                                            style={{ fontSize: 16, marginRight: 4 }}
                                        />
                                    )
                                ) : (
                                    <CommonIcon
                                        NormalIcon={IconExplain}
                                        style={{ fontSize: 16, marginRight: 6 }}
                                        title={t('resources.meshSpace.tracingHeaderTip')}
                                    ></CommonIcon>
                                )}
                                <span
                                    style={greenCluster && headerInfo ? { color: '#12a75c' } : {}}
                                >
                                    {headerInfo
                                        ? `cluster:${headerInfo?.key}=${headerInfo?.value}`
                                        : t('resources.meshSpace.setTracingHeader')}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                {currentStep === 1 && (
                    <div className="wayLineBoth">
                        <WayLeft wayLeftWidth={wayLeftWidth}>
                            <div className="wayLeftDown"></div>
                            <div className="wayOrLine"></div>
                            <div className="wayLeftUp"></div>
                        </WayLeft>
                        <WayRight wayRightWidth={wayRightWidth}>
                            <div className="wayRightUp"></div>
                            <div className="wayOrLine"></div>
                            <div className="wayRightDown"></div>
                        </WayRight>
                        <div className="wayOrLineD" ref={wayOrLineRef}></div>
                        <div className="mainZheLeft"></div>
                        <div className="mainZheRight"></div>
                        <div className="serviceZhe"></div>
                        <div className="selectedZhe"></div>
                    </div>
                )}
                <div
                    className="main"
                    style={currentStep === 1 ? { marginTop: '0px', zIndex: 0 } : { zIndex: 3 }}
                    ref={mainRef}
                >
                    <div className="wrap">
                        <div className="workload-container" ref={workLoadRef}>
                            <div className="title">
                                <Icon component={IconSpace} style={{ fontSize: 32 }} />
                                <div className="title-info">
                                    <span>
                                        {currentSpace?.space_name ??
                                            t('resources.meshSpace.basicSpace')}
                                    </span>
                                    <span>{currentSpace?.namespace}</span>
                                </div>
                            </div>
                            <div
                                className="service-box"
                                style={
                                    animationEnd
                                        ? {
                                              border: '1px solid rgba(0, 128, 255, 0.5)',
                                              boxShadow: '0px 0px 10px 0px rgba(0, 128, 255, 0.2)',
                                          }
                                        : selectAnimationSpaceEnd && selectedAppList?.length === 0
                                        ? {
                                              border: '1px solid rgb(26, 196, 111)',
                                              boxShadow: '0px 0px 10px 0px rgba(27, 203, 122, 0.2)',
                                          }
                                        : { border: '1px solid #dae1e8' }
                                }
                            >
                                <div className="arrowShadow"></div>
                                {!currentSpace && (
                                    <div className="empty-box">
                                        <img src={ImageEmpty} />
                                        <span>{t('resources.meshSpace.selectBasicService')}</span>
                                    </div>
                                )}
                                {appList.map((item: any, key: number) => {
                                    return (
                                        <div key={key} className="workload-item">
                                            <div className="icon-box">
                                                {animationEnd ? (
                                                    <img
                                                        src={IconBlueWorkLoad}
                                                        style={{ width: 32, height: 34 }}
                                                    ></img>
                                                ) : selectAnimationSpaceEnd &&
                                                  !selectedAppList.find(
                                                      (el: any) =>
                                                          el.name === `${item.appName}:${item.name}`
                                                  ) ? (
                                                    <img
                                                        src={IconGreenWorkLoad}
                                                        style={{ width: 32, height: 34 }}
                                                    />
                                                ) : (
                                                    <img
                                                        src={IconWorkLoad}
                                                        style={{ width: 32, height: 34 }}
                                                    />
                                                )}
                                            </div>
                                            <div
                                                className="workload-info"
                                                style={
                                                    animationEnd
                                                        ? { background: 'rgb(199, 227, 255)' }
                                                        : selectAnimationSpaceEnd &&
                                                          !selectedAppList.find(
                                                              (el: any) =>
                                                                  el.name ===
                                                                  `${item.appName}:${item.name}`
                                                          )
                                                        ? { background: '#baedd4' }
                                                        : {}
                                                }
                                            >
                                                <SpaceIcon
                                                    end={animationEnd}
                                                    selectEnd={
                                                        selectAnimationSpaceEnd &&
                                                        !selectedAppList.find(
                                                            (el: any) =>
                                                                el.name ===
                                                                `${item.appName}:${item.name}`
                                                        )
                                                    }
                                                >
                                                    <Icon
                                                        component={
                                                            ICON_MAP[item.kind] || IconDeployment
                                                        }
                                                    />
                                                </SpaceIcon>
                                                <Tooltip title={`${item.appName}:${item.name}`}>
                                                    <div
                                                        className="name"
                                                        style={
                                                            animationEnd
                                                                ? { color: 'rgb(0, 128, 255)' }
                                                                : selectAnimationSpaceEnd &&
                                                                  !selectedAppList.find(
                                                                      (el: any) => {
                                                                          return (
                                                                              el.name ===
                                                                              `${item.appName}:${item.name}`
                                                                          );
                                                                      }
                                                                  )
                                                                ? { color: '#12a75c' }
                                                                : { color: 'rgb(121, 135, 156)' }
                                                        }
                                                    >{`${item.appName}:${item.name}`}</div>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {currentStep === 1 && (
                            <div className="selected-workload-container">
                                <div className="title">
                                    <Icon component={IconSpace} style={{ fontSize: 32 }} />
                                    <div className="title-info">
                                        <span>{shareSpace?.name}</span>
                                        <span>{shareSpace?.namespace}</span>
                                    </div>
                                </div>
                                <div
                                    className="selected-box"
                                    style={
                                        selectAnimationEnd && selectedAppList.length > 0
                                            ? {
                                                  border: '1px solid rgb(26, 196, 111)',
                                                  boxShadow:
                                                      '0px 0px 10px 0px rgba(27, 203, 122, 0.2)',
                                              }
                                            : { border: '1px dashed #dae1e8' }
                                    }
                                    ref={selectBoxRef}
                                >
                                    {selectedAppList.length === 0 && (
                                        <div className="empty-box">
                                            <img src={ImageEmpty} />
                                            <span>
                                                {t('resources.meshSpace.selectBasicService')}
                                            </span>
                                        </div>
                                    )}
                                    {selectedAppList.map((item: any, key: number) => {
                                        return (
                                            <div key={key} className="workload-item">
                                                <div className="icon-box">
                                                    {selectAnimationEnd ? (
                                                        <img
                                                            src={IconGreenWorkLoad}
                                                            style={{ width: 32, height: 34 }}
                                                        />
                                                    ) : (
                                                        <img
                                                            src={IconWorkLoad}
                                                            style={{ width: 32, height: 34 }}
                                                        />
                                                    )}
                                                    <div className="tip-icon">
                                                        <CommonIcon
                                                            style={{ fontSize: 16 }}
                                                            NormalIcon={IconPath}
                                                            title={t(
                                                                'resources.meshSpace.shareWorkloadTip'
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className="workload-info"
                                                    style={
                                                        selectAnimationEnd
                                                            ? { background: '#baedd4' }
                                                            : {}
                                                    }
                                                >
                                                    <SelectIcon end={selectAnimationEnd}>
                                                        <Icon
                                                            component={
                                                                ICON_MAP[item.kind] ||
                                                                IconDeployment
                                                            }
                                                        />
                                                    </SelectIcon>
                                                    <Tooltip title={item.name}>
                                                        <div
                                                            className="name"
                                                            style={
                                                                selectAnimationEnd
                                                                    ? { color: '#12a75c' }
                                                                    : {
                                                                          color:
                                                                              'rgb(121, 135, 156)',
                                                                      }
                                                            }
                                                        >
                                                            {item.name}
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ContentWrap>
    );
};

export default BaseSpace;

import React from 'react';

import CommonIcon from '../CommonIcon';
import { ReactComponent as IconHelp } from '../../images/icon/icon_label_query.svg';
import styled from 'styled-components';

const LabelWrap = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    .help {
        position: absolute;
        display: flex;
        align-items: center;
        top: 50%;
        left: 100%;
        transform: translate(12px, -50%);

        svg {
            &:hover {
                path {
                    fill: #36435c;
                }
            }
        }
    }
`;

interface IProp {
    label: string;
    tip: string;
}

const LabelWithHelp = ({ label, tip }: IProp) => {
    return (
        <LabelWrap>
            <div className="label">{label}</div>
            <div className="help">
                <CommonIcon NormalIcon={IconHelp} title={tip} style={{ fontSize: 20 }}></CommonIcon>
            </div>
        </LabelWrap>
    );
};

export default LabelWithHelp;

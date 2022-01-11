import styled from 'styled-components';

export const WrapList = styled.div`
    margin-top: 16px;
    border-radius: 8px;
`;

export const FlexBox = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
`;

export const FormFlexBox = styled(FlexBox)`
    flex: 1;
    justify-content: space-between;
`;

export const OtherConfigItem = styled.div`
    padding: 10px 12px;
    margin-top: 8px;
    background: #f9fbfd;
    border-radius: 4px;
    display: flex;
    align-items: center;

    .ant-form-item {
        margin-bottom: 0;
    }
`;

export const DescBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    span {
        &:nth-child(1) {
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            font-weight: 600;
            color: #36435c;
        }

        &:nth-child(2) {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #79879c;
        }
    }
`;

export const LimitWrap = styled.div`
    max-height: 288px;
    overflow: scroll;
    padding: 12px 12px 0;
    background: #f9fbfd;
    font-size: 14px;
    color: #36435c;

    .ant-form-item-control-input {
        box-shadow: none;
    }
    .ant-row.ant-form-item {
        margin-left: 40px;
    }
`;

export const LimitTitle = styled.div`
    margin: 12px 0;
    margin-left: 40px;
    color: rgb(54, 67, 92);
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    font-weight: 600;
`;

export const SleepModeWrap = styled(LimitWrap)`
    .ant-form-item-control-input {
        box-shadow: none;
    }
`;

export const Divide = styled.div`
    height: 1px;
    background: #e6ebf2;
`;

export const BtnBox = styled.div`
    display: flex;
    margin-top: 24px;
    align-items: center;
    justify-content: flex-end;
`;

export const OtherConfigTitle = styled.div`
    color: rgb(54, 67, 92);
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    font-weight: 600;
`;

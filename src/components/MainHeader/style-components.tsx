import styled from 'styled-components';
import IconMore from '../../images/icon/icon_more_black.svg';
import ImageVersionInfoBg from '../../images/about_popup_bg.svg';

export const Logo = styled.img`
    width: 37px;
    height: 24px;
`;

export const MainContent = styled.div`
    background-color: ${(props) => props.theme.mainBgColor};
    width: 100%;
    /* height: 60px; */
    padding: 18px 24px 18px 20px;
`;

export const LogoName = styled.div`
    /* width: 123px; */
    height: 20px;
    color: rgb(54, 67, 92);
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    letter-spacing: 0px;
    padding-left: 8px;
`;

export const Flex = styled.div`
    display: flex;
    align-items: center;
`;

export const FlexBetween = styled(Flex)`
    justify-content: space-between;
`;
export const FlexHeader = styled(FlexBetween)`
    /* width: 120px; */
`;

export const Section = styled.div`
    border-top: 1px solid rgb(243, 246, 250);
    border-bottom: 1px solid rgb(243, 246, 250);
`;
export const Info = styled.div`
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Name = styled.div`
    color: rgb(54, 67, 92);
    font-size: 14px;
    line-height: 20px;
`;

export const Email = styled.div`
    height: 16px;
    line-height: 16px;
    color: rgb(121, 135, 156);
`;

export const AvatarBox = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    background: red;
`;

export const AvatarItem = styled.div`
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    color: rgb(54, 67, 92);
    font-size: 14px;
    &:hover {
        background: rgb(243, 246, 250);
    }
    padding: 0 10px;
    cursor: pointer;
    position: relative;
`;

export const AvatarPop = styled.div`
    width: 220px;
    background: #fff;
`;

export const TranItem = styled(AvatarItem)`
    width: 220px;
    position: relative;
`;

export const AddIcon = styled.div`
    width: 20px;
    height: 20px;
    background: blue;
`;

export const Label = styled.div`
    margin-left: 10px;
    color: rgb(54, 67, 92);
    width: 120px;
`;

export const IconRight = styled.div`
    position: absolute;
    right: 10px;
    top: 50%;
    height: 20px;
    transform: translateY(-50%);
`;

export const HeaderSection = styled.div`
    border-left: 1px solid rgb(219, 228, 236);
    display: flex;
    align-items: center;
    padding-left: 20px;
    margin-left: 20px;
`;

export const Tran = styled.div`
    position: relative;
    cursor: pointer;
    /* top: -2px; */
`;

export const AvaterBox = styled.div`
    position: relative;
    cursor: pointer;
    &:hover {
        &:before {
            background-image: url(${IconMore});
            background-size: 20px 20px;
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 2;
            width: 20px;
            height: 20px;
            transform: translate(-50%, -50%);
            cursor: pointer;
        }
        &:after {
            content: '';
            position: absolute;
            top: 0px;
            left: 0px;
            z-index: 1;
            width: 100%;
            height: 100%;
            background: rgb(54, 67, 92, 0.5);
            border-radius: 50%;
            cursor: pointer;
        }
    }
`;

export const VersionInfo = styled.div`
    width: 320px;
    height: 248px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff url(${ImageVersionInfoBg}) no-repeat;

    .content {
        width: 260px;
        height: 84px;
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 20px;
        background: #ffffff;
        font-size: 12px;
        color: rgb(54, 67, 92);

        &-item {
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                &:nth-child(2) {
                    display: block;
                    max-width: 180px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
`;

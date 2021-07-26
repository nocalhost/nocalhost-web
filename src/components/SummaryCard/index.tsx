import React from 'react';
import { Main, Card } from './style-components';

interface summaryPropsType {
    title: string;
}

function SummaryCard(props: summaryPropsType) {
    return (
        <Main>
            <Card>{props.title}</Card>
        </Main>
    );
}

export default SummaryCard;

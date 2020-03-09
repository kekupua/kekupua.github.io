import React from 'react';
import styled from 'styled-components';

import VideoBackground from './VideoBackground';

import {sizes} from '../../styleguide';

let Title = styled.div({
    gridColumn: 2,
    gridRow: 1,
    textAlign: 'center',
    marginTop: 'auto',
    fontSize: sizes.getScaledSize(17)
});

let Subtitle = styled(Title)({
    gridColumn: 2,
    gridRow: 2,
    marginTop: 0,
    fontSize: sizes.getScaledSize(6)
});

let BackgroundContainer = styled.div({
    gridColumn: '1 / -1',
    gridRow: '1 / -1'
});

let SplashContainer = styled.div({
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '20% auto 20%',
    gridTemplateRows: "55% auto"
});

let LandingSplash = ({...props}) => {
    return (
        <SplashContainer>
            <Title>
                Sean Teramae
            </Title>
            <Subtitle>
                Engineer
            </Subtitle>
            <BackgroundContainer>
                <VideoBackground src={"videos/mainBackground.webm"}/>
            </BackgroundContainer>
        </SplashContainer>         
    )
}

export default LandingSplash
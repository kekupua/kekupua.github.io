import React from 'react';
import styled from 'styled-components';

let VideoBackgroundWrapper = styled.div({
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: -100,
})

let VideoWrapper = styled.video({
    width: '100%',
    height: '100%',
})

let VideoBackground = ({src}) => {
    return (
        <VideoBackgroundWrapper>
            <VideoWrapper src={src} loop autoPlay muted type='video/webm'/>
        </VideoBackgroundWrapper>    
    )
}

export default VideoBackground
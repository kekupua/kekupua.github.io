import React from 'react';
import styled from 'styled-components';

import Section from './Section';

import LandingSplash from './ui/LandingSplash';

const FullPage = styled.div({
    width: '100vw',
    height: '100vh',
});

let LandingPage = ({sections = [], ...props}) => {
    return (
        <React.Fragment>
            <FullPage>
                <LandingSplash/>
            </FullPage>
            {sections.map((section, index) => {
                return (
                    <Section key={`section-${index}`}index={index} type={section}/>
                )
            })}
        </React.Fragment>
        
            
    )
}

export default LandingPage
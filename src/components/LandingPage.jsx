import React from 'react';
import styled from 'styled-components';

import Section from './Section';

const FullPage = styled.div({
    width: '100vw',
    height: '100vh',
    background: 'blue'
});

let LandingPage = ({sections = [], ...props}) => {
    return (
        <React.Fragment>
            <FullPage>

            </FullPage>
            {sections.map((section, index) => {
                return (
                    <Section index={index} type={section}/>
                )
            })}
        </React.Fragment>
        
            
    )
}

export default LandingPage
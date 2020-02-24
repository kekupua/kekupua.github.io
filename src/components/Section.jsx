import React from 'react';
import styled from 'styled-components';

import {getScaledSize} from '../styleguide/sizes';

let SECTION_SCALE = 80;
const Wrapper = styled.div(props => ({
    height: getScaledSize(SECTION_SCALE),
    width: '100%',
    background: props.index % 2 === 0 ? 'grey' : 'white'
}))
const Section = ({index, type, ...props}) => {
    return (
        <Wrapper index={index}>
            Section {type}
        </Wrapper>
    )
}; 

export default Section;
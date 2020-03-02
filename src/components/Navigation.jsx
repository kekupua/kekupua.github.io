import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import style from '../styleguide';

let StyledNavLink = styled(NavLink)({
    textDecoration: 'none',
    padding: style.sizes._300,
});

let NavigationContainer = styled.div({
    display: 'flex',
    width: '100%',
    height: style.sizes._900,
    position: 'fixed',
    background: '#000000e8' 
})

export const Navigation = () => {
    return (
        <NavigationContainer>
            <StyledNavLink exact to="/">Home</StyledNavLink>
            <StyledNavLink to="/projects">Projects</StyledNavLink>
            <StyledNavLink to="/essays">Essays</StyledNavLink>
        </NavigationContainer>
    )
}

export default Navigation;
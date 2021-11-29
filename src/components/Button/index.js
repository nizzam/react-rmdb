import React from 'react'
//  Styles
import { Wrapper } from './Button.styles'
//  Prop Types
import PropTypes from 'prop-types';

const Button = ({ text, callback }) => (
    <Wrapper type='button' onClick={callback}>
        {text}

    </Wrapper>
);

Button.propTypes = {
    text: PropTypes.string,
    callback: PropTypes.func
};

export default Button;
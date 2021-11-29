import React from 'react'
//  Styles
import { Wrapper, Image } from './Actor.styles';
//  Prop Types
import PropTypes from 'prop-types';

const Actor = ({ name, character, imageURL }) => (
    <Wrapper>
        <Image src={imageURL} alt='actor-thumb' />
        <h3>{name}</h3>
        <p>{character}</p>
    </Wrapper>
);

Actor.propTypes = {
    name: PropTypes.string,
    character: PropTypes.string,
    imageURL: PropTypes.string
}

export default Actor;
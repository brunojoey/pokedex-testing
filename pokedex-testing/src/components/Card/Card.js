import React, { useState, useEffect } from 'react';
import typeColors from '../../helpers/pokemonTypes';
import './style.css';

function Card({ pokemon }) {
    // const [typeFilter, setTypeFilter] = useState();

    // function filterTypes() {

    // };

    return (
        <div className='Card'>
            <div className='Card__id'>
                {pokemon.id}
            </div>
            <div className='Card__img'>
                <img src={pokemon.sprites.front_default} alt='' />
            </div>
            <div className='Card__name'>
                {pokemon.name}
            </div>
            <div className='Card__types'>
                {
                    pokemon.types.map(type => {
                        return (
                            <div>
                                <button className='Card__type' style={{ backgroundColor: typeColors[type.type.name] }}>{type.type.name}</button>
                            </div>
                        )
                    })
                }
            </div>
            <div className='Card__info'>
                <div className='Card__data Card__data--weight'>
                    <p className='title'>Weight</p>
                    <p>{pokemon.weight}</p>
                </div>
                <div className='Card__data Card__data--height'>
                    <p className='title'>Height</p>
                    <p>{pokemon.height}</p>
                </div>
                <div className='Card__data Card__data--ability'>
                    <p className='title'>Ability</p>
                    <p className='abilityName'>{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
        </div>
    )
};

export default Card;
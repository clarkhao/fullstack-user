import {iconLibrary} from '../type';
import React from 'react';
import {css} from '@emotion/react';
import style from './icon.module.css';

export type IconChoice = {
    /**
     * icon types control
     */
    iconType: string;
    /**
     * size control 
     */
    iconSize: number;
}

function IconChoose(props: IconChoice) {
    return (
        <div className={style.container} css={css`width: ${props.iconSize}rem; height: ${props.iconSize}rem;`}>
            {iconLibrary.get(props.iconType)}
        </div>
    )
}

export default IconChoose;
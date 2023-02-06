import React from 'react';
import style from './card.module.css';

export type cardType = {
    childrend: React.ReactNode,
}

function CardLayout(props: cardType) {
    return (
        <main className={style.layout}>
            {props.childrend}
        </main>
    )
}

export default CardLayout;
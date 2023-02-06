import Lottie from "lottie-react";
import DogMark from '../../../public/lottie/4888-dog-icon.json';
import React from 'react';

export type markType = {
    size: number;
}

function MarkIcon(props: markType) {
    return (
        <>
            <Lottie animationData={DogMark} />
        </>
    )
}

export default MarkIcon;
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';

type progressType = {
    id: string;
    value: number;
}

function Progress({id,value, ...props}: progressType) {
    return (
        <div>
            <LinearProgress />
        </div>
    )
}

export default Progress;
import style from './list.module.css';
import {iconLibrary} from '../type';
import React from 'react';
import {FileNameListType} from '../../component/type';

export type ListType = {
    /**
     * list that is used to render
     */
    list: Array<FileNameListType>;
    /**
     * optional left icon
     */
    lIcon?: string;
    /**
     * optional right icon
     */
    rIcon?: string;
    /**
     * remove item handler
     */
    handleRemove?: (id:string) => void;
}

function List({list,...props}: ListType) {
    return (
        <>
            <ul className={style.container}>
                {list.map(
                    el => {
                        return (
                            <li key={el.id}>
                                {props.lIcon !== undefined ? <div className={style.left}>{iconLibrary.get(props.lIcon)}</div> : null}
                                <p>{el.name}</p>
                                {props.rIcon !== undefined ? <div 
                                            className={style.right}
                                            onClick={() => {
                                                console.log(el.id);
                                                if(props.handleRemove)
                                                    props.handleRemove(el.id);
                                            }}>
                                    {iconLibrary.get(props.rIcon)}
                                    </div> : null}
                            </li>
                        )
                    }
                )}
            </ul>
        </>
    )
}

export default List;
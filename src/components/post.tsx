import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Post } from '../helper/types';

type Props = {
    post: Post,
    postClick: MouseEventHandler,
    activePostId: number
}

const PostComp : React.FC<Props> = (props) => {
    const [active, setActive] = useState<boolean>(false);
    useEffect(() => {
        setActive(props.activePostId === props.post.id ? true : false);
    }, [props])
    return (
        <button className={`list-group-item list-group-item-action ${active ? 'active' : ''}`} onClick={props.postClick} >
            <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{props.post.title}</h5>
            <small>{props.post.id}</small>
            </div>
            <p className="mb-1">{props.post.body}</p>
            <small>User Id: {props.post.userId}</small>
        </button>
    );
}

export default PostComp;

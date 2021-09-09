import React, { FormEventHandler, SyntheticEvent, useRef, useState } from 'react';
import Util from '../helper/util';

type Props = {
    postId: number,
    commentId?: number,
    cancel: Function,
    reply: boolean
}

const AddComment: React.FC<Props> = (props) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const submitBtnTxt = `Add ${props.reply ? 'Reply' : 'Comment'}`;
    const [formHasError, setFormhasError] = useState<boolean>(false);

    const submitHandler: FormEventHandler = (e : SyntheticEvent) => {
        e.preventDefault();
        const value: string = inputRef.current?.value as string;
        if (!value) {
            setFormhasError(true);
        } else {
            const key = props.reply && props.commentId ? Util.getReplykey(props.postId, props.commentId) : Util.getCommentKey(props.postId)
            Util.setStorage(key, value);
            props.cancel();
        }
    }

    return (
        <form onSubmit={submitHandler} className={`needs-validation ${formHasError ? 'was-validated' : ''}`} noValidate>
            <textarea ref={inputRef} className="form-control mt-3" id="exampleFormControlTextarea1" required></textarea>
            {formHasError ? <div className="invalid-feedback">Enter a comment</div> : ''}
            <div className="d-flex justify-content-end my-3">
                <button type="submit" className="btn btn-sm btn-secondary me-3">{submitBtnTxt}</button>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => props.cancel()}>Cancel</button>
            </div>
        </form>
    );
}

export default AddComment;

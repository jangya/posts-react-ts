import React, { FormEventHandler, SyntheticEvent, useRef, useState } from 'react';
import { constants } from '../helper/constants';
import Util from '../helper/util';

type Props = {
    postId: number,
    commentId: number,
    cancel: Function,
}

const AddTag: React.FC<Props> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [formHasError, setFormhasError] = useState<boolean>(false);

    const submitHandler: FormEventHandler = (e : SyntheticEvent) => {
        e.preventDefault();
        const value: string = inputRef.current?.value as string;
        console.log(value);
        if (!value) {
            setFormhasError(true);
        } else {
            const tagKey = Util.getTagKey(props.postId, props.commentId);
            Util.setStorage(tagKey, value);
            props.cancel();
        }
    }

    return (
        <form onSubmit={submitHandler} className={`needs-validation ${formHasError ? 'was-validated' : ''}`} noValidate>
                <input ref={inputRef} className="form-control" list="datalistOptions" placeholder="Type to search tags..." required/>
                <datalist id="datalistOptions">
                    {constants.tags.map((item, index) => <option key={index} value={item}/>)}
                </datalist>
                {formHasError ? <div className="invalid-feedback">Enter a tag</div> : ''}
            <div className="d-flex justify-content-end my-3">
                <button type="submit" className="btn btn-sm btn-secondary me-3">Save</button>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => props.cancel()}>Cancel</button>
            </div>
        </form>
    );
}

export default AddTag;

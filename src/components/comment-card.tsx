import React, { useEffect, useState } from 'react';
import { Comment } from '../helper/types';
import Util from '../helper/util';
import AddComment from './add-comment';
import AddTag from './add-tag';

type Props = {
    comment: Comment
}

const CommentCard: React.FC<Props> = (props) => {
    const [showReply, setShowReply] = useState<boolean>(false);
    const [replies, setReplies] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [showTags, setShowTags] = useState<boolean>(false);

    useEffect(() => {
        setReplies(Util.getStorage(Util.getReplykey(props.comment.postId, props.comment.id)));
        setTags(Util.getStorage(Util.getTagKey(props.comment.postId, props.comment.id)));
    }, [props.comment, showReply, showTags])

    const ReplyTmpl = ({item}: any) => {
        return (
            <div className="card-body mt-2">
                <blockquote className="blockquote mb-0">
                    <p className="blockquote-footer">{item}</p>
                </blockquote>
            </div>
        );
    }
    const ReplyList = () => {
        return (
            <React.Fragment>
                {replies.length ? 
                    <div>
                        <small className="text-secondary">Comments: </small>
                        {replies.map((item, index) => <ReplyTmpl key={index} item={item}/>)}
                    </div> 
                    : ''
                }
                { showReply ? 
                    <AddComment 
                        postId={props.comment.postId} 
                        commentId={props.comment.id} 
                        cancel={() => setShowReply(false)} 
                        reply={true}/>
                    : ''
                }
            </React.Fragment>
        );
    }
    const TagList = ({item}: any) => {
        // setShowReply(false);
        return (
            <React.Fragment>
                { tags.length ? 
                    <div className="d-flex justify-content-end my-3">
                        <small className="text-secondary">Tags: </small>
                        {tags.map((item, index) => <span key={index} className="badge rounded-pill bg-success ms-2">{item}</span>)} 
                    </div>
                    : ''
                }
                { showTags ?
                    <AddTag
                        postId={props.comment.postId} 
                        commentId={props.comment.id} 
                        cancel={() => setShowTags(false)} /> 
                    : ''
                }
            </React.Fragment>
        );
    }

    return (
        <div className=" mb-3">
            <div className="card-body">
                <h5 className="card-title">
                    <img src="/avatar.png" width="30" alt="A" className="rounded-circle me-2"/>
                    <span>{props.comment.email.match(/^[^.|@]+/g)}</span>
                </h5>
                <p className="card-text">{props.comment.body}</p>
                <TagList/>
                <ReplyList/>
                <div className="d-flex justify-content-end">
                <button className="btn btn-sm btn-link" onClick={() => setShowReply(!showReply)}>Reply</button>
                <button className="btn btn-sm btn-link ms-3" onClick={() => setShowTags(!showTags)}>Add Tag</button>
                </div>
            </div>
            {/* <hr/> */}
        </div>
    );
}

export default CommentCard;

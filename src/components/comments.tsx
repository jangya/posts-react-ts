import React, { useEffect, useState } from 'react';
import { Comment } from '../helper/types';
import Util from '../helper/util';
import AddComment from './add-comment';
import CommentCard from './comment-card';
import { fetchData } from './home';

type Props = {
    postId: number
}

const CommentComp: React.FC<Props> =  (props) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [addComment, setAddComment] = useState<boolean>(false);

    useEffect(() => {
        const fetchComments = async () => {
            const rawComments: Comment[] = await fetchData(`/posts/${props.postId}/comments`);
            const localCmnts: string[] = Util.getStorage(Util.getCommentKey(props.postId));
            const localComments: Comment[] = localCmnts.map((cmnt, i) => {
                return {
                    id: Math.floor(Math.random() * Date.now()),
                    postId: props.postId,
                    body: cmnt,
                    email: 'Anonymous'
                } as Comment;
            });
            rawComments.unshift(...localComments.reverse());
            setComments(rawComments);
        }
        fetchComments();
    }, [props.postId, addComment])

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Comments({ 0 || comments.length})</h5>
                <button className="btn btn-sm btn-link" onClick={() => setAddComment(!addComment)}> Add Comment</button>
            </div>
            {addComment ? <AddComment postId={props.postId} cancel={() => setAddComment(false) } reply={false}/> : ''}
            <div className="comment-list">
                {comments.map(comment => <CommentCard key={comment.id} comment={comment}/>)}
            </div>
        </div>
    );
}

export default CommentComp;

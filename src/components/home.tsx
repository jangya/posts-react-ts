import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { constants } from '../helper/constants';
import { Post } from '../helper/types';
import CommentComp from './comments';
import PostComp from './post';


export const fetchData = async (uri: string) => {
    try {
        let response = await (await fetch(constants.url + uri)).json();
        return response;
    } catch (error) {
        console.error('Error in fetching data', error);
        throw error;
    }
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [activePost, setActivePost] = useState<number>(0);
    const [users, setUsers] = useState<number[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsRaw = await fetchData('/posts');
            setPosts(postsRaw);
            setFilteredPosts(postsRaw)
            let userIds: number[] = postsRaw.map((post:any) => post.userId);
            userIds = userIds.filter((uid, index) => userIds.indexOf(uid) === index);
            setUsers(userIds);
        }
        fetchPosts();
    }, [])

    const handleFilter: ChangeEventHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const selectedUser: number = parseInt(e.target.value, 10);
        setFilteredPosts(selectedUser ? posts.filter((p:any) => p.userId === selectedUser) : posts);
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-sm-7">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5>Posts({ 0 || filteredPosts.length})</h5>
                        <div className="d-flex">
                            <label htmlFor="floatingSelect" className="me-2 text-secondary">Filter by User ID</label>
                            <select id="floatingSelect" className="form-select-sm" onChange={handleFilter}>
                                <option defaultValue={0}> Select users</option>
                                {users.map(user => <option key={user} value={user}>{user}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="list-group list-group-flush post-list">
                    { filteredPosts.map(post => 
                        <PostComp 
                            key={post.id}
                            post={post}
                            activePostId={activePost}
                            postClick={() => setActivePost(post.id)}
                        />
                    )}
                    </div>
                </div>
                <div className="col-sm-5">
                    <CommentComp postId={activePost}/>
                </div>
            </div>
        </div>
    );
}

export default Home;

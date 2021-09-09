export type Post = {
    id: number,
    userId: number,
    title: string,
    body: string,
    active?: boolean
}

export type Comment = {
    id: number,
    postId: number,
    name: string,
    body: string,
    email: string
}

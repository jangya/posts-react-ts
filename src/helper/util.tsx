abstract class Util {

    static getStorage(key: string): string[] {
        return JSON.parse(localStorage.getItem(key) as string) || [];
    }

    static setStorage(key: string, value: string): void {
        const preValue: Array<string> = this.getStorage(key) ;
        preValue.push(value);
        localStorage.setItem(key, JSON.stringify(preValue));
    }

    static getCommentKey(postId: number): string  {
        return `comment_${postId}`;
    }

    static getReplykey(postId: number, commentId: number): string {
        return `reply_${postId}_${commentId}`;
    }

    static getTagKey(postId: number, commentId: number): string {
        return `tags_${postId}_${commentId}`;
    }
}

export default Util;

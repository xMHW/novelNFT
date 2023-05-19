import { fetchPosts } from '@/lib/apis';
import { useEffect, useState } from 'react';

export default function List() {
    const [posts, setPosts] = useState<any>([]);
    useEffect(() => {
        const loadData = async () => {
            const posts = await fetchPosts();
            setPosts(posts);
        }
        loadData();    
    }, [])
    return(
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <a>{post.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
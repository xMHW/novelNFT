import axios from 'axios';

export const fetchPosts = async () => {
    const { data: posts } = await axios.get('/api/posts');
    return posts;
}
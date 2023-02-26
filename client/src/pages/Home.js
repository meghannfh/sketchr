import { useEffect, useState } from 'react';

const Home = () => {
    const [posts, setPosts] = useState(null)

    useEffect(()=> {
        const fetchPosts = async () => {
            const response = await fetch('/feed')
            const json = await response.json()

            if (response.ok){
                setPosts(json)
            }
        }

        fetchPosts()
    }, [])
    //empty dependencies arr means compnent only renders once

    return (
        <div className="home">
            <div className="posts">
                {posts && posts.map((post) => (
                    <p key={post.id}>{post.prompt}</p>
                ))}
            </div>
        </div>
    )
}

export default Home
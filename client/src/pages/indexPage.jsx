import {useEffect, useState } from "react";
import Post from '../post.jsx'

export default function IndexPage(){
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        fetch('https://blog-nine-phi-73.vercel.app/posts',{
            method: 'Get',
        }).then(response=>{
            response.json().then(posts=>{
                setPosts(posts);
            })
        })
    },[]);
    return (
        <>
        {posts.length > 0 && posts.map(post =>(
            <Post {...post}/>
        ))}
        </>
    );
}

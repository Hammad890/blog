import {useEffect, useState } from "react";
import Post from '../post.jsx'

export default function IndexPage(){
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5001/posts',{
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
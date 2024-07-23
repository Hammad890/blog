import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import Editor from '../Editor.jsx'
import { Navigate } from 'react-router-dom';
export default function CreatePost (){
    const [title,setTitle]=useState('');
    const [summary,setSummary]= useState('');
    const [content,setContent]= useState('');
    const [files,setFiles]= useState(null);
    const [redirect,setRedirect] = useState(false);
   



    const handleSubmit = async(e)=>{
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);
        e.preventDefault();
        let res= fetch ('http://localhost:5001/posts',{
            method: 'Post',
            body: data,
            credentials: 'include',
        })
        if (res.ok){
            setRedirect(true);
        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
      }
    
    return(
        <form style={{marginTop:'70px'}} onSubmit={handleSubmit}>
            <input type="text"
            placeholder={'Title'}
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <input type="text"
            placeholder={'Summary'}
            value={summary}
            onChange={(e)=>setSummary(e.target.value)}
            />
            <input type="file" 
            onChange={(e)=>setFiles(e.target.files)}/>
            <Editor value={content} onChange={setContent}/>
            <button style={{marginTop:'25px'}}>Create post</button>
        </form>
    )
}
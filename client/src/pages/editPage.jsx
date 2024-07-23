import { useEffect,useState } from "react";
import { Navigate,useParams } from "react-router-dom";
import Editor from "../Editor.jsx";

export default function EditPost(){
    const {id}= useParams();
    const [title,setTitle]= useState('');
    const [content,setContent]=useState('');
    const [summary,setSummary]= useState('')
    const [files,setFiles]=useState('')
    const [redirect,setRedirect] = useState(false);

    useEffect(()=>{
        fetch('http://localhost:5001/posts/'+id)
        .then (response=>{
            response.json().then(postInfo=>{
                setTitle(postInfo.title)
                setSummary(postInfo.summary)
                setContent(postInfo.content)
            });
        });
    },[id])

    const handleUpdate= async (e)=>{
        e.preventDefault();
        const data = new FormData();
        data.set ('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);
        if (files?.[0]){
           data.set('file',files?.[0]) 
        }
        const response = await fetch('http://localhost:5001/posts',{
            method: 'Put',
            body: data,
            credentials: "include",  
        });
        if (response.ok){
            setRedirect(true);
        }
    }
    if (redirect){
        return <Navigate to={'/posts/'+id}/>
    }
    
    return(
        <form onSubmit={handleUpdate}>
            <input type="title"
            value={title}
            placeholder={'Title'}
            onChange={e=>setTitle(e.target.value)}
            />
            <input type="summary"
            value={summary}
            placeholder={'Summary'}
            onChange={e=>setSummary(e.target.value)}
            />
             <input type="file"
             onChange={e => setFiles(e.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{marginTop:'5px'}}>Update post</button>
        </form>
    );
}
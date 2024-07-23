import {formatISO9075} from "date-fns";
import { Link } from "react-router-dom";

export default function Post({title,summary,author,cover,createdAt,content,_id}){
    let formattedDate = 'Invalid date';
  if (createdAt && !isNaN(new Date(createdAt).getTime())) {
    formattedDate = formatISO9075(new Date(createdAt));
  }

    return(
     <div className="post">
        <div className="image">
            <Link to={`/posts/${_id}`}>
            <img src={`http://localhost:5001/uploads/${cover}`} alt="" />
            </Link>
        </div>
        <div className="text">
            <Link to={`/posts/${_id}`}>
            <h2>{title}</h2>
            </Link>
            <p className="info">
                <a href="/" className="author">{author.username}</a>
                <time>{formattedDate}</time>
            </p>
            <p className="summary">{summary}</p>
        </div>
     </div>
    )
}
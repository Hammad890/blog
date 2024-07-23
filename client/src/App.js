import './App.css';
import Layout from './layout.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import { UserContextProvider } from './context.js';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CreatePost from './pages/createPost.jsx';
import IndexPage from './pages/indexPage.jsx';
import PostPage from './pages/postPage.jsx';
import EditPost from './pages/editPage.jsx';


function App() {
  return (
    <UserContextProvider>
    <Router>
    <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/create" element={<CreatePost/>}/>
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
        </Route>
        </Routes>
        </Router>
        </UserContextProvider>
  );
}

export default App;

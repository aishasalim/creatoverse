import CreatePost from './pages/CreatePost'
import ReadPosts from './pages/ReadPost'
import EditPost from './pages/EditPost'
import InfoView from './pages/InfoView'
import { useRoutes, BrowserRouter as Router } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'

function App() {
    // Sets up routes
    let element = useRoutes([
      {
        path:"/new",
        element: <CreatePost />
      }, 
      {
        path: "/",
        element:<ReadPosts/>
      },
      {
        path:"/edit/:id",
        element: <EditPost />
      },
      {
        path: "/:id",
        element:<InfoView />
      },
    ]);

  return (
    <>
    <h1 style={{marginTop:"2em"}}>✍️Creatorsverse✍️</h1>
    <div >
      <Link to="/"><button className='btn'>View all creators</button></Link>
      <Link to="/new"><button className='btn'>Add creator</button></Link>
    </div>
    <hr />
    {element}
    </>
  )
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

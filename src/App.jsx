import {Route, Routes} from 'react-router-dom';
import Feed from './pages/Feed/Feed.jsx';
import './App.css'

function App() {


  return (
    <div>
     <Routes>
        <Route path="/" element={ <Feed /> }/>
         
      </Routes>



    </div>
  )
}

export default App

import {Routes, Route, Navigate} from "react-router-dom"
import {useContext} from 'react'
import AuthContext from "./store/authContext";

import "./App.css"

import Header from "./components/Header";
import Home from './components/Home';
import Auth from './components/Auth';
import AddSpots from './components/AddSpots';

const path = require('path')
const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../client/build");

app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})


function App() {
  const authCtx = useContext(AuthContext)
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={authCtx.token ? <Home/> : <Navigate to='/auth' />}/>
        <Route path='/auth' element={!authCtx.token ? <Auth/> : <Navigate to='/' />}/>
        <Route path='/add' element={authCtx.token ? <AddSpots/> : <Navigate to='/auth' />}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  );
}

export default App;

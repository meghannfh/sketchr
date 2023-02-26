import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              //the element is what we want to render
              element={<Home />}
            />
          </Routes>  
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

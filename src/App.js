import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import CoinPage from './pages/Coin';
import ComparePage from './pages/Compare';
import WatchListPage from './pages/Watchlist';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <ToastContainer className="foo" />
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/dashboard' element={<DashboardPage/>}/>
            <Route path='coin/:id' element={<CoinPage/>}/>
            <Route path='compare' element={<ComparePage/>}/>
            <Route path='watchlist' element={<WatchListPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

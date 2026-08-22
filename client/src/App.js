import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './container/login/Login';
import Signup from './container/signup/Signup';
import Home from './container/home/Home';
import Profile from './container/profile/Profile';
import Request from './container/request/Request';
import Friend from './container/friend/Friend';
import Expense from './container/expense/Expense';
import Header from './component/header/Header';
import MainLayout from './component/main-layout/MainLayout';


function App() {
  return (
    <div style={{ backgroundImage:  "url('/background.jfif')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<MainLayout />}>
            <Route path='/home/' element={<Home />} />
            <Route path='/home/profile' element={<Profile />} />
            <Route path='/home/request' element={<Request />} />
            <Route path='/home/friend' element={<Friend />} />
            <Route path='/home/expense' element={<Expense />} />
            <Route path='/home/header' element={<Header />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

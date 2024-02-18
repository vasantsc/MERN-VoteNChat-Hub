import { Routes,Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/homePage';
import chatpollPage from './Pages/chatpollPage';
import SinglePollChat from './Pages/singlepollPage';

function App() {
  return (
    <div className="App">
      
    <Routes>
    <Route path="/" Component={HomePage} exact></Route>
    <Route path="/chats" Component={chatpollPage}></Route>
    <Route path="/singlechats" Component={SinglePollChat}></Route>
    </Routes>
    </div>
  );
}

export default App;

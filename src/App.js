import './styles/globals.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import FriendsQuizLLM from './components/homepage'
import QuizLandingPage from './pages/QuizLandingPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<QuizLandingPage/>}/>
      <Route path="/quiz" element={<PrivateRoute><FriendsQuizLLM/></PrivateRoute>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
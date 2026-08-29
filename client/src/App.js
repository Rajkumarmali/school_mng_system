import Login from './auth/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Layout from './components/Layout';
import { useSelector } from 'react-redux';
import OnGoingExamQuestion from './pages/student/exam/OnGoingExamQuestion';
import SubmitExam from './pages/student/exam/SubmitExam';

function App() {
  const token = useSelector((state) => state.auth.token)
    || localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {!token ? <Route path='/' element={<Login />} />
          :
          <>
            <Route path="/*" element={<Layout />} />
            <Route path='student/exam/ongoing-exam-question/:studentExamId' element={<OnGoingExamQuestion />} />
            <Route path='student/exam/submit/:studentExamId' element={<SubmitExam />} />
          </>

        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;

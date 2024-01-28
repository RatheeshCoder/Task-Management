import './Style/Style.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/SignUp';
import TaskMain from './Components/TaskManage/TaskMain';


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/TaskMain' element={<TaskMain />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;

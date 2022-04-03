import SignUp from "./SignUp";
import { Container, container } from 'react-bootstrap'
import { AuthProvider } from "./contexts/AuthContext";
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Container 
    className="d-flex 
    align-items-center 
    justify-content-center" 
    style={{minHeight: '100vh'}}>
      <div className="w-100" style={{maxWidth: '400px'}}>
        <AuthProvider>
        <Routes>
            <Route path='/signup' element={<SignUp/>}/>
        </Routes>
        </AuthProvider>
      </div>
      </Container>
  );
}

export default App;

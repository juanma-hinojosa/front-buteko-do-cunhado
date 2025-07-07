import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import HomePage from './pages/HomePage'
import DashboardAdmin from './pages/AdminDashboard'
import PrivateRoute from './components/PrivateRouteComponent'
import { ToastContainer } from 'react-toastify';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop rtl={false}  draggable/>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />


          
          <Route
            path='/dashboard'
            element={
              <PrivateRoute allowedRoles={["admin", "cozinha", "garçom"]}>
                <DashboardAdmin />
              </PrivateRoute>
            }
          />
          {/* <Route path="/dashboard" element={<DashboardAdmin /> } /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

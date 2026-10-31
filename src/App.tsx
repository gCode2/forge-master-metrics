import { Route, Routes, Navigate } from "react-router"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AdminPage from "./pages/AdminPage"
import PlayersPage from "./pages/PlayersPage"
import PlayerPage from "./pages/PlayerPage"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import PublicRoute from "./components/auth/PublicRoute"
import HomePage from "./pages/HomePage"
import AppLayout from "./components/layout/AppLayout"
import VerifiedRoute from "./components/auth/VerifiedRoute"
import WarsPage from "./pages/WarsPage"
import CalculatorsPage from "./pages/CalculatorsPage"
import ChartsPage from "./pages/ChartsPage"

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          
          <Route element={<VerifiedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/players/:nickname" element={<PlayerPage />} />
            <Route path="/wars" element={<WarsPage/>} />
            <Route path="/calculators" element={<CalculatorsPage/>}/>
            <Route path="/charts" element={<ChartsPage/>}/>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Route>
    </Routes>
  )
}

export default App
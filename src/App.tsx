import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"
import { Route, Routes } from "react-router"
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
function App() {
  return (
    <>
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route path="/dashboard" element={
              <DashboardPage/>
            }/>
        <Route element={<VerifiedRoute/>}>
          <Route element={<AppLayout/>}>
            
            <Route path="/admin" element={
              <AdminPage/>
            }/>
            <Route path="/players" element={
              <PlayersPage/>
            }/>
            <Route path="/player/:id" element={
              <PlayerPage/>
            }/>
        </Route>
        </Route>
      </Route>
        <Route element={<PublicRoute/>}>
        <Route element={<AppLayout/>}>
          <Route path="/login" element={
            <LoginPage/>
          }/>
          <Route path="/register" element={
            <RegisterPage/>
          }/>
          <Route path="/" element={
            <HomePage/>
          }/>
        </Route>
        </Route>
    </Routes>
    </>
  )
}

export default App

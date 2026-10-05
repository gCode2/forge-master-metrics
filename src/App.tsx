import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"
import { Route, Routes } from "react-router"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AdminPage from "./pages/AdminPage"
import PlayersPage from "./pages/PlayersPage"
import PlayerPage from "./pages/PlayerPage"
function App() {
  // const [clans, setClans] = useState([])
  // useEffect(()=>{
  //     getClans();
  //   }, [])

  // async function getClans(){
  //   const {data, error} = await supabase.from('clans').select()
  //   if(error){
  //     console.error(error);
  //     return
  //   }
  //   setClans(data);
  // }
  return (
    <>
    <Routes>
      <Route>
        <Route path="/dashboard" element={
          <DashboardPage/>
        }/>
        <Route path="/login" element={
          <LoginPage/>
        }/>
        <Route path="/register" element={
          <RegisterPage/>
        }/>
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
    </Routes>
      {/* <div className="text-3xl">
        Hello World
        <div>
          {clans.map(clan=>(
            <div key={clan.id}>
              {clan.name}
            </div>
          ))}
        </div>
      </div> */}
    </>
  )
}

export default App

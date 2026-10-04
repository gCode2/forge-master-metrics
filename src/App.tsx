import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"
function App() {
  const [clans, setClans] = useState([])
  useEffect(()=>{
      getClans();
    }, [])

  async function getClans(){
    const {data, error} = await supabase.from('clans').select()
    if(error){
      console.error(error);
      return
    }
    setClans(data);
  }
  return (
    <>
      <div className="text-3xl">
        Hello World
        <div>
          {clans.map(clan=>(
            <div key={clan.id}>
              {clan.name}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App

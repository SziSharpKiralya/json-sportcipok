import "bootstrap/dist/css/bootstrap.min.css"
import type { Cipo } from "./types/Cipo";
import { useEffect, useState } from "react";

function App() {
  const [cipok, setCipok] = useState<Cipo[]>([]);

  useEffect( () => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/cipok");
        const data : Cipo[] = await response.json();
        setCipok(data);
      } catch (err: Error | unknown) {
        console.log("Hiba történt: " + err);
      }
    }
    fetchUsers();
  },[])

  return (
    <>
    <table className="table table-hover table-bordered">
      <thead>
          <tr>
            <th>Név</th>
            <th>Megjelenés</th>
            <th>Értéke</th>
            <th>Kapható</th>
          </tr>
      </thead>
      <tbody>
        {
            cipok.map( (cipo) => (
              <tr key={cipo.id}>
                <td>{cipo.nev}</td>
                <td>{cipo.megjelenes}</td>
                <td>{cipo.ertek}</td>
                <td>{cipo.kaphato ? "✅" : "❌"}</td>
              </tr>
            ))
        }
      </tbody>
    </table>
    </>
  )
}

export default App

import "bootstrap/dist/css/bootstrap.min.css"
import type { Cipo } from "./types/Cipo";
import { useEffect, useState } from "react";

function App() {
  const [cipok, setCipok] = useState<Cipo[]>([]);
  const [nev, setNev] = useState("");
  const [megjelenes, setMegjelenes] = useState("");
    const [ertek, setErtek] = useState(0);
    const [kaphato, setKaphato] = useState(false);

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

  async function AddCipo(e: Event | any) {
    e.preventDefault();
    const ujCipo = {
      nev: nev,
      megjelenes: megjelenes,
      ertek: ertek,
      kaphato: kaphato
    };
    try {
      const response = await fetch("http://localhost:3000/cipok", {
        "method": "POST",
        "headers": {"Content-type": "application.json"},
        "body": JSON.stringify(ujCipo)
      });
      const cipo: Cipo = await response.json();
      setCipok((elozo) => [...elozo, cipo]);
      setNev("");
      setMegjelenes("");
      setErtek(0);
      setKaphato(false);

    } catch (err: Error | unknown) {
      console.log("Hiba történt felvételnél: " + err);
    }
  }

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
    <h2>Form</h2>
    <form onSubmit={AddCipo}>
        <label htmlFor="nev">Név: <br/>
          <input type="text" value={nev} onChange={(e) => setNev(e.target.value)} />
        </label> <br/>
        <label htmlFor="nev">Megjelenés: <br/>
          <input type="date" value={megjelenes} onChange={(e) => setMegjelenes(e.target.value)} />
        </label> <br/>
        <label htmlFor="nev">Érték: <br/>
          <input type="number" value={ertek} onChange={(e) => setErtek(parseInt(e.target.value))} />
        </label> <br/>
        <label htmlFor="nev">Kapható: <br/>
          <input type="checkbox" checked={kaphato} onChange={(e) => setKaphato(e.target.checked)} />
        </label> <br/>
        <br/>
        <button type="submit">Felvétel</button>   
      </form>
    </>
  )
}

export default App

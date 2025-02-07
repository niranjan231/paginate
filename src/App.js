import { useSelector } from "react-redux";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import User from "./Componet/User";
import AddUser from "./Componet/AddUser";


function App() {
  const count = useSelector((state)=> state.counter)
  console.log(count)


  return (
    <div>
      <User/>
      <Routes>
        <Route path="/adduser" element={ <AddUser/>}  />
      </Routes>
    </div>
  );
}

export default App;

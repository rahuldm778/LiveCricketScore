import React, {useEffect,useState} from "react";
//import logo from './logo.svg';
import './App.css';
//import { Button } from "@material-ui/core";
import Navbar from './components/Navbar';
import MyCard from './components/MyCard';
import { getMatches } from "./api/Api";
import { Grid } from "@material-ui/core";

function App() {

  //const [matches,setMatches] = useState([]);
  const [matches,setMatches] = useState([]);

  useEffect(()=>{
    getMatches()
      .then((data) => setMatches(data.matches))
      .catch();

  },[]);

  return (
    <div className="App">
      <Navbar />
      <h1>Welcome To My Cricket Live score</h1>
      <Grid container>
        <Grid sm="3"></Grid>
        <Grid sm="6">
          {matches && matches.map((match) => {
            return (
              <MyCard key={match.unique_id} match={match}></MyCard>
            );})}
        </Grid>
        <Grid sm="3"></Grid>
      </Grid>
      
      
    </div>
  );
}

export default App;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from './Components/Home/Util/CustomButton';

const useStyles = makeStyles(() => ({
  centerBox: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }

}));

function App() {
  return (
    <div className={useStyles().centerBox}>
      <header className={useStyles().centerBox}>
        <CustomButton text="Play" width="200px" height="60px" color="red"/>
      </header>
    </div>
  );
}

export default App;

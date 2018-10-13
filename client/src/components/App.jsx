import React from 'react';
import styles from './../styles/App.css';
import MainBoard from './MainBoard.jsx';
import SlideDeck from './SlideDeck.jsx';
import MusicPlayer from './MusicPlayer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]
    }
  }

  render() {
    return(
      <div className={ styles.appContainer }>
        <h1 className="header">
          Arena
        </h1>
        <hr/>
        <div className={ styles.main }>
          <SlideDeck />
          <MainBoard board={ this.state.board }/>
        </div>
        <br/>
        <div className={ styles.musicPlayer}>
          <MusicPlayer />
        </div>
      </div>
    )
  }
};

export default App;
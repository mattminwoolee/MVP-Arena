import React from 'react';
import styles from './../styles/App.css';
import MainBoard from './MainBoard.jsx';
import SlideDeck from './SlideDeck.jsx';
import MusicPlayer from './MusicPlayer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update: true,
      collection: [],
      clickedBoard: { 
        name: '',
        next: '',
        previous: '',
        dancers: {},
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
    this.update = this.update.bind(this);
    this.displayBoard = this.displayBoard.bind(this);
  }
  update(){
    this.componentDidMount();
  }

  displayBoard(name) {
    // console.log('display board', name);
    $.ajax({
      url: `/api/stage/${name}`,
      method: 'GET',
      success: (success) => {
        console.log(success[0]);
        this.setState({
          clickedBoard: success[0]
        })
      }
    })
  }

  componentDidMount() {
    $.ajax({
      url: `/api/stages`,
      method: 'GET',
      success: (data) => {
        // console.log('data: ', data);
        this.setState({
          collection: data,
        });
      },
    })
  }

  render() {
    return(
      <div className={ styles.appContainer }>
        <h1 className="header">
          Arena
        </h1>
        <hr/>
        <div className={ styles.main }>
          <SlideDeck displayBoard={this.displayBoard} collection={this.state.collection}/>
          <MainBoard ref={() => { console.log('hi')}} clickedBoard={this.state.clickedBoard} update={this.update}/>
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
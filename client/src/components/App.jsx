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
      },
      nextBoard: {},
      previousBoard: {},
    }
    this.update = this.update.bind(this);
    this.displayBoard = this.displayBoard.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
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

  handleNext() {
    let current = this.state.clickedBoard;
    let collection = this.state.collection;

    let indexOfCurrent;
    for (var [index, elem] of collection.entries() ) {
      if (elem.name === current.name) {
        indexOfCurrent = index;
      }
    }
    
    this.setState({
      clickedBoard: collection[indexOfCurrent+1],
      previousBoard: collection[indexOfCurrent],
      nextBoard: null,
    })
  }

  handlePrevious() {
    let current = this.state.clickedBoard;
    let collection = this.state.collection;
    let indexOfCurrent;
    for (var [index, elem] of collection.entries() ) {
      if (elem.name === current.name) {
        indexOfCurrent = index;
      }
    }
    
    this.setState({
      clickedBoard: collection[indexOfCurrent-1],
      nextBoard: collection[indexOfCurrent],
      previousBoard: null
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

  clearBoard() {
    this.setState({
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
        <br/>
        <div className={ styles.main }>
          <SlideDeck displayBoard={this.displayBoard} collection={this.state.collection}/>
          <MainBoard 
          clearBoard={this.clearBoard.bind(this)}
          previousBoard={this.state.previousBoard}
          nextBoard={this.state.nextBoard}
          handlePrevious={this.handlePrevious} 
          handleNext={this.handleNext} 
          clickedBoard={this.state.clickedBoard} 
          update={this.update}/>
        </div>
        <br/>
        <div className={ styles.musicPlayer}>
          <MusicPlayer handleNext={this.handleNext}/>
        </div>
      </div>
    )
  }
};

export default App;
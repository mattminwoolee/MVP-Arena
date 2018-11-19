import React from 'react';
import styles from './../styles/MainBoard.css';
import Position from './../components/Position.jsx';
import ButtonPanel from './../components/ButtonPanel.jsx';

class MainBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.clickedBoard.name,
      next: this.props.clickedBoard.next,
      previous: {},
      dancers: this.props.clickedBoard.dancers,
      mainBoard: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      totalDancers: Object.keys(props.clickedBoard.dancers).length,
      changePositionMode: {isOn: false, dancerId: null},

    }
    this.handleClick = this.handleClick.bind(this);
    this.handleAlreadyClicked = this.handleAlreadyClicked.bind(this);
    this.clearStage = this.clearStage.bind(this);
    this.saveBoard = this.saveBoard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // check if if the board exists
    if ( nextProps.clickedBoard ) {
      let next = (nextProps.clickedBoard.next) ? nextProps.clickedBoard.next: [null];
      let previous = (nextProps.clickedBoard.previous) ? nextProps.clickedBoard.previous: [null];
  
      this.setState({ 
        name: nextProps.clickedBoard.name,
        next: next,
        previous: previous,
        dancers: nextProps.clickedBoard.dancers,
        mainBoard: nextProps.clickedBoard.board,
        totalDancers: Object.keys(nextProps.clickedBoard.dancers).length, 
      });  
    }
  }

  handleClick(e) {
    console.log('event: ', e.target)
    let row =  e.target.attributes.x.value;
    let col =  e.target.attributes.y.value;
    let dancers = this.state.dancers;
    let newBoard = this.state.mainBoard;
    let id = this.state.totalDancers;

    if (!this.state.changePositionMode.isOn) {
      // save dancer info
      id++;
      dancers[id] = {x: row, y: col};
      // update board
      newBoard[row][col] = id; // display id number of the dancer
      console.log('newBoard: ', newBoard);
      this.setState({
        totalDancers: id,
      })
    } else {
      // if change position mode is on, save previous dancer info and update dancer info
      id = this.state.changePositionMode.dancerId;

      // store
      let prevRow = dancers[id].x;
      let prevCol = dancers[id].y;

      // update dancers 
      dancers[id] = {x: row, y: col};

      // update board
      newBoard[prevRow][prevCol] = 0;
      newBoard[row][col] = Number(id);
      this.setState({
        changePositionMode: {isOn: false, dancerId: null},
      })
    }

    // update dancers and board
    this.setState({
      dancers: dancers,
      mainBoard: newBoard,
    });
  }

  handleAlreadyClicked(e) {
    console.log('dancer already cliked: ', e.target);
    let dancerId = e.target.attributes.value.value;

    // save the dancer id and enter change mode
    this.setState({
      changePositionMode: {isOn: true, dancerId: dancerId}, 
    });
  }

  clearStage() {
    $.ajax({
      url: 'http://localhost:3000/api/stages',
      method: 'DELETE',
      success: (response) => {
        console.log('Success! ', response);
        this.props.update();
        this.setState({
          dancers: [],
          totalDancers: 0,
          changePositionMode: {isOn: false, dancerId: null}
        })
        this.props.clearBoard();
      }
    })
  }

  saveBoard(name) {
    let data = {
      name: name,
      dancers: this.state.dancers,
      board: this.state.mainBoard
    }
    console.log('data', data);
    $.ajax({
      url: 'http://localhost:3000/api/stages',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: (response) => {
        console.log('Success! ', response);
        this.props.update();
      }
    })
  }

  render() {
    return(
      <div className={ styles.mainBoard }>
        <div>
          <ButtonPanel handlePrevious={this.props.handlePrevious} handleNext={this.props.handleNext} saveBoard={this.saveBoard} clearStage={this.clearStage}/>
        </div>
        <div className={ styles.gridBoard }>
          {this.state.mainBoard.map( (row, rowIndex) => row.map( (positionValue, colIndex) => <Position 
          key={`${rowIndex}&${colIndex}`} 
          value={positionValue}
          x={rowIndex} 
          y={colIndex}
          previousBoard={this.props.previousBoard}
          nextBoard={this.props.nextBoard}
          previous={this.props.previousBoard ? this.state.previous[positionValue] : null}
          next={this.props.nextBoard ? this.state.next[positionValue] : null}
          handleClick={this.handleClick}
          handleAlreadyClicked={this.handleAlreadyClicked}
          /> ))}
        </div>
      </div>
    )
  };
};

export default MainBoard;
import React from 'react';
import styles from './../styles/MainBoard.css';
import Position from './../components/Position.jsx';
import ButtonPanel from './../components/ButtonPanel.jsx';

class MainBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      previous: '',
      totalDancers: 0,
      dancers: {},
      changePositionMode: {isOn: false, dancerId: null},
      mainBoard: [
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
    this.handleClick = this.handleClick.bind(this);
    this.handleAlreadyClicked = this.handleAlreadyClicked.bind(this);
    this.clearStage = this.clearStage.bind(this);
    this.saveBoard = this.saveBoard.bind(this);
  }

  componentDidUpdate() {
    // let board = this.props.clickedBoard;
    // if (board) {
    //   this.setState({
    //     mainBoard: board.board,
    //   })
    // }
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
    console.log('dancer already cliked: ', e.target.attributes.value.value);
    let dancerId = e.target.attributes.value.value;

    // save the dancer id and enter change mode
    this.setState({
      changePositionMode: {isOn: true, dancerId: dancerId}, 
    })

  }

  clearStage() {
    this.setState({
      dancers: [],
      totalDancers: 0,
      changePositionMode: {isOn: false, dancerId: null},
      mainBoard:[
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]
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
          <ButtonPanel saveBoard={this.saveBoard} clearStage={this.clearStage}/>
        </div>
        <div className={ styles.gridBoard }>
          {this.state.mainBoard.map( (row, rowIndex) => row.map( (positionValue, colIndex) => <Position 
          key={`${rowIndex}&${colIndex}`} 
          value={positionValue}
          x={rowIndex} 
          y={colIndex}
          handleClick={this.handleClick}
          handleAlreadyClicked={this.handleAlreadyClicked}
          /> ))}
        </div>
      </div>
    )
  };
};

export default MainBoard;
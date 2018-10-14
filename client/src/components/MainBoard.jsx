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
      dancers: [],
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
    this.clearStage = this.clearStage.bind(this);
    this.saveBoard = this.saveBoard.bind(this);
  }

  handleClick(e) {
    console.log('event: ', e.target)
    let row =  e.target.attributes.x.value;
    let col =  e.target.attributes.y.value;
    var newBoard = this.state.mainBoard;
    var newDancers = this.state.dancers;
    newDancers.push({id: newDancers.length, x: row, y: col});
    newBoard[row][col] = 1;
    console.log('newBoard: ', newBoard);

    this.setState({
      dancers: newDancers,
      mainBoard: newBoard,
    });
  }

  clearStage() {
    this.setState({
      dancers: [],
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
          /> ))}
        </div>
      </div>
    )
  };
};

export default MainBoard;
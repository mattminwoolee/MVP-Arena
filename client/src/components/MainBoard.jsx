import React from 'react';
import styles from './../styles/MainBoard.css';
import Position from './../components/Position.jsx';
import ButtonPanel from './../components/ButtonPanel.jsx';

class MainBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleClick(e) {
    console.log('event: ', e.target)
    let row =  e.target.attributes.x.value;
    let col =  e.target.attributes.y.value;
    var newBoard = this.state.mainBoard;
    newBoard[row][col] = 1;
    console.log('newBoard: ', newBoard);

    this.setState({
      mainBoard: newBoard,
    });
  }

  render() {
    return(
      <div className={ styles.mainBoard }>
        <div>
          <ButtonPanel />
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
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
    console.log('target', e.target);
    let row = e.target.x;
    let col = e.target.y;
    var newBoard = this.state.mainBoard;
    newBoard[row][col] = 1;

    this.setState = {
      mainBoard: newBoard,
    }
  }

  render() {
    return(
      <div className={ styles.mainBoard }>
        <div>
          <ButtonPanel />
        </div>
        <div className={ styles.gridBoard }>
          {this.props.board.map( (row, rowIndex) => row.map( (position, colIndex) => <Position 
          key={`${rowIndex}&${colIndex}`} 
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
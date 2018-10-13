import React from 'react';
import styles from './../styles/Position.css';

class Position extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={ styles.position } 
      x={this.props.x} 
      y={this.props.y}
      onClick={this.props.handleClick}>
        o
      </div>
    )
  };
};

export default Position;
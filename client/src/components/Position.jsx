import React from 'react';
import styles from './../styles/Position.css';

class Position extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={ styles.position }>
        {
          this.props.value == 1 
          ? (<div
              value={this.props.value}
              x={this.props.x} 
              y={this.props.y}
              onClick={this.props.handleClick}>O</div>) 
          : (<div
              value={this.props.value}
              x={this.props.x} 
              y={this.props.y}
              onClick={this.props.handleClick}>&nbsp;</div>)
        }
      </div>
    )
  };
};

export default Position;
import React from 'react';
import styles from './../styles/Position.css';

class Position extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilled: false,
    }
    this.handleDancerClick = this.handleDancerClick.bind(this);
  }

  handleDancerClick(e) {
    if (!this.state.isFilled) {
      this.setState({
        isFilled: true,
      })
      this.props.handleClick(e);
    } else {
      this.setState({
        isFilled: false
      })
      this.props.handleAlreadyClicked(e);
    }
  }

  render() {
    return(
      <div className={ styles.position }>
        {
          this.props.value !== 0 
          ? (<div><div 
            value={this.props.value}
            x={this.props.x} 
            y={this.props.y}
            onClick={this.handleDancerClick}
            className={styles.positionInner}>{this.props.value}</div></div>) 
          : (<div
              value={this.props.value}
              x={this.props.x} 
              y={this.props.y}
              onClick={this.handleDancerClick}>&nbsp;</div>)
        }
      </div>
    )
  };
};

export default Position;
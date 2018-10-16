import React from 'react';
import styles from './../styles/Slide.css';

class Slide extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.displayBoard(this.props.slide.name);
  }

  render() {
    return(
      <div onClick={this.handleClick} className={ styles.slide }>
        <div>
          {this.props.slide.name}
        </div>
      </div>
    )
  };
};

export default Slide;

import React from 'react';
import styles from './../styles/Slide.css';

class Slide extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={ styles.slide }>
        <div>
          Board {this.props.slide.id}
        </div>
      </div>
    )
  };
};

export default Slide;

import React from 'react';
import styles from './../styles/SlideDeck.css';

class SlideDeck extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={ styles.slideDeck }>
        This is the Slide Deck
      </div>
    )
  };
};

export default SlideDeck;
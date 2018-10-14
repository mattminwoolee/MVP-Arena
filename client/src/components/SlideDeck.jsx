import React from 'react';
import styles from './../styles/SlideDeck.css';
import Slide from './Slide.jsx';

class SlideDeck extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={ styles.slideDeck }>
        {
          this.props.collection.map( (slide, index) => <Slide key={index} slide={slide}/>)
        }
      </div>
    )
  };
};

export default SlideDeck;
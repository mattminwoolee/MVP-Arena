import React from 'react';
import styles from './../styles/Position.css';
import styled, { keyframes } from "styled-components";
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

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

    console.log('this.props.previous: ', this.props.previous);
    console.log('this.props.next: ', this.props.next);
    var differenceX; // Difference in viewport units
    var differenceY;
    var mymove;

    if (this.props.previous) {
      // console.log('previous x: ', this.props.previous.x);
      // console.log('previous y: ', this.props.previous.y);
      differenceX = (this.props.previous.x- this.props.x)*6;
      differenceY = (this.props.previous.y- this.props.y)*10;
      // console.log('diffX: ', differenceX);
      // console.log('diffY: ', differenceY);
      mymove = keyframes`
        from {top: ${differenceX}vmin; left: ${differenceY}vmin}
        to {top: 0px; left 0px}
      `;
    } else if (this.props.next) {
      differenceX = (this.props.next.x- this.props.x)*6;
      differenceY = (this.props.next.y- this.props.y)*10;
      // console.log('diffX: ', differenceX);
      // console.log('diffY: ', differenceY);
      mymove = keyframes`
        from {top: ${differenceX}vmin; left: ${differenceY}vmin}
        to {top: 0px; left 0px}
      `;
    } else {
      mymove = keyframes`
        from {top: 0vmin; left: 0vmin}
        to {top: 0px; left 0px}
      `
    }

    let Style = styled.div`
    background-image: url('https://s3.us-east-2.amazonaws.com/mattminwoolee-mvp/images/circleTransparent.png');
    background-repeat: no-repeat;
    background-size: cover;  
    background-position: center center;
    display: flex;
    justify-content: center;
    color: white;
    font-size: 2vmin;
    line-height: 6vmin;
    position: relative;
    animation: ${mymove} 2s;
    `

    return(
      <div className={ styles.position }>
        {
          this.props.value !== 0 
          ? (<div className={styles.transitionObject}><Style 
            value={this.props.value}
            x={this.props.x} 
            y={this.props.y}
            onClick={this.handleDancerClick}
            className={styles.positionInner}
            // style={ animationStyle }
            >{this.props.value}</Style></div>) 
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
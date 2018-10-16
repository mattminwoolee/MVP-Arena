import React from 'react';
import styles from './../styles/ButtonPanel.css';
import SaveModal from './SaveModal.jsx';

class ButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({
      showModal: true,
    });
  }

  hideModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    return(
      <div className={ styles.buttonPanel }>
        <button onClick={this.props.clearStage}>Create new Colletion</button>
        <button onClick={this.showModal}>Save Board</button>
        <button onClick={this.props.handlePrevious} >Previous</button>
        <button onClick={this.props.handleNext}>Next</button>
        <SaveModal saveBoard={this.props.saveBoard} show={this.state.showModal} handleClose={this.hideModal} />
      </div>
    )
  };
};

export default ButtonPanel;
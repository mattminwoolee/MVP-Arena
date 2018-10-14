import React from 'react';
import classNames from 'classnames';
import styles from '../styles/SaveModal.css';

class SaveModal extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.saveBoard(this.state.name);
    this.props.handleClose();
  }
  
  render() {
    const showHideClassName = this.props.show ? 'display' : 'displayNone';
    return (
      <div className={ classNames({ [styles.modal]: true, [styles[showHideClassName]]: true }) }>
        <section className={ styles.modalMain }>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name your board: 
              <input type="text" name="name" onChange={this.handleChange}/>
            </label>
            <input type="submit" value="submit"/>
          </form>
        </section>
      </div>
    );
  }
};

export default SaveModal;

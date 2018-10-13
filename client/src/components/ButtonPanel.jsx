import React from 'react';
import styles from './../styles/ButtonPanel.css';

class ButtonPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={ styles.buttonPanel }>
        <button>Create</button>
        <button>Save</button>
        <button>New</button>
        <button>Next</button>
      </div>
    )
  };
};

export default ButtonPanel;
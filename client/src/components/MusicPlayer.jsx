import React from 'react';
import styles from './../styles/MusicPlayer.css';

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={ styles.musicPlayer }>
        This is the Music Player
      </div>
    )
  };
};

export default MusicPlayer;
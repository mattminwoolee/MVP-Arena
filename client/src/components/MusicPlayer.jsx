import React from 'react';
import styles from './../styles/MusicPlayer.css';
import ReactAudioPlayer from 'react-audio-player';

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
  }

  handlePlay(){
    this.props.handleNext();
  }

  render() {
    return(
      <div className={ styles.musicPlayer }>
        {/* This is the Music Player */}
        <ReactAudioPlayer
          className={ styles.audio }
          src="/audio/You_make_my_dreams.mp3"
          listenInterval={4000}
          onListen={this.handlePlay}
          controls
        />
      </div>
    )
  };
};

export default MusicPlayer;
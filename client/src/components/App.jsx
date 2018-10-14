import React from 'react';
import styles from './../styles/App.css';
import MainBoard from './MainBoard.jsx';
import SlideDeck from './SlideDeck.jsx';
import MusicPlayer from './MusicPlayer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: [{id: 1}, {id:2}, {id:3}]
    }
  }

  componentDidMount() {
    $.ajax({
      url: `/api/stages`,
      method: 'GET',
      contentType: 'application/json',
      success: (data) => {
        let newCollection = this.state.collection;
        newCollection.push(data);
        this.setState({
          collection: newCollection,
        });
      },
    })
  }

  render() {
    return(
      <div className={ styles.appContainer }>
        <h1 className="header">
          Arena
        </h1>
        <hr/>
        <div className={ styles.main }>
          <SlideDeck collection={this.state.collection}/>
          <MainBoard />
        </div>
        <br/>
        <div className={ styles.musicPlayer}>
          <MusicPlayer />
        </div>
      </div>
    )
  }
};

export default App;
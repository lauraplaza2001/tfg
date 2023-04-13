import React from 'react';
import ReactPlayer from 'react-player';

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          videoUrl: this.props.videoUrl
        };
      }
      render() {
        return <ReactPlayer url={this.state.videoUrl} controls  />;
      }
}

export default VideoPlayer;
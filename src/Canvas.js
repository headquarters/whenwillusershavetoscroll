import { Component } from 'preact';

export default class Canvas extends Component {
  SCALE_FACTOR = 10

  renderFrames() {
    const SCALE_FACTOR = 10;

    return Object.values(this.props.screenResolutions).map((res) => {
      if (res.width > 100 && res.height > 100) {
        return <div style={{ width: res.width/SCALE_FACTOR, height: res.height/SCALE_FACTOR }} class="frame">
            <span class="frame__label">{res.width}x{res.height}</span>
          </div>;
      }      
    });
  }

  renderDesignFrame() {
    
    const { width, height } = this.props.designDimensions;
    console.log(width, height, width > 100 && height > 100)
    if (width > 100 && height > 100) {
      return <div style={{ width: width/this.SCALE_FACTOR, height: height/this.SCALE_FACTOR }} class="the-design">
        <span class="frame__label">Your design</span>
      </div>;
    }
  }

  render(props) {
    return (
      <div class="canvas">
        {this.renderFrames()}
        {this.renderDesignFrame()}
      </div>
    );    
  }
}
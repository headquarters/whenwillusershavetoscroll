import { Component } from 'preact';

export default class ScreenResolutionInput extends Component {
  constructor(props) {
    super();

    this.state = {
      width: props.width,
      height: props.height
    };
  }

  defaultProps = {
    id: ''
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      width: nextProps.width,
      height: nextProps.height
    })
  }

  enterScreenResolution() {
    const { width, height } = this.parseResolution(event.target.value);
    
    // console.log(width, height);
    if (width > 0 && height > 0) {
      this.props.saveResolution(event.target.name, width, height);
    }
  }

  parseResolution(resolutionString) {
    const regexResult = /(\d+)\D+(\d+)/.exec(resolutionString);
    
    if (!regexResult) {
      return {
        width: 0,
        height: 0
      };
    }

    // regexResult[0] is full match, e.g. '1200 by 600'
    const width = parseInt(regexResult[1], 10);
    const height = parseInt(regexResult[2], 10);

    return {
      width,
      height
    };
  }

	render(props, state) {
    return <input 
              type="text" 
              name={props.name} 
              id={props.id}
              onKeyUp={this.enterScreenResolution.bind(this)} 
              value={`${this.state.width}x${this.state.height}`}
          />;
  }

}
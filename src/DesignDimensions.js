import { Component } from 'preact';
import ScreenResolutionInput from './ScreenResolutionInput';

export default class DesignDimensions extends Component {
  constructor(props) {
    super();

    this.state = {
      width: props.dimensions.width,
      height: props.dimensions.height
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      width: nextProps.dimensions.width,
      height: nextProps.dimensions.height
    });
  }

  render(props, state) {
    return (
      <div class="design-dimensions">
        <h2>Your design</h2>
        <label class="design-dimensions__label" for="design-dimensions">Screen size</label>
        <ScreenResolutionInput 
          name="designDimensions"
          id="design-dimensions"
          saveResolution={this.props.saveDesignDimensions}
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    )
  }
}
import { Component } from "preact";
import ScreenResolutionInput from "./ScreenResolutionInput";

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

  renderResults() {
    if (this.state.width < 0 || this.state.height < 0) {
      return null;
    }

    let scrollWidthPercentage = 0;
    let scrollHeightPercentage = 0;

    const totalPercentage = Object.values(
      this.props.screenResolutions
    ).reduce((sum, res) => {
      return sum + res.percentage;
    }, 0);

    Object.values(this.props.screenResolutions).map(res => {
      if (this.state.width > res.width) {
        scrollWidthPercentage += res.percentage;
      }

      if (this.state.height > res.height) {
        scrollHeightPercentage += res.percentage;
      }
    });

    return (
      <p class="results">
        The screen resolutions provided represent{" "}
        <strong>
          {totalPercentage}% of all your users' screen resolutions
        </strong>. Of all your users,{" "}
        <strong>
          {scrollWidthPercentage}% will have to scroll horizontally
        </strong>,{" "}
        <strong>
          {scrollHeightPercentage}% will have to scroll vertically
        </strong>.
      </p>
    );
  }

  render(props, state) {
    return (
      <div class="design-dimensions">
        <h2>Your design</h2>
        <label class="design-dimensions__label" for="design-dimensions">
          Screen resolution
        </label>
        <ScreenResolutionInput
          name="designDimensions"
          id="design-dimensions"
          saveResolution={this.props.saveDesignDimensions}
          width={this.state.width}
          height={this.state.height}
        />
        {this.renderResults()}
      </div>
    );
  }
}

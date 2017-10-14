import { Component } from "preact";
import ScreenResolutionInput from "./ScreenResolutionInput";
import PercentageInput from "./PercentageInput";

export default class ScreenResolutions extends Component {
  constructor(props) {
    super();

    this.state = {
      screenResolutions: props.screenResolutions
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      screenResolutions: nextProps.screenResolutions
    });
  }

  renderScreenResolutionInputs() {
    return Object.entries(this.state.screenResolutions).map(res => {
      const name = res[0];
      const { width, height, percentage } = res[1];

      return (
        <tr>
          <td>
            <ScreenResolutionInput
              name={name}
              width={width}
              height={height}
              saveResolution={this.props.saveResolution}
            />
          </td>
          <td>
            <PercentageInput
              name={`percent-${name}`}
              percentage={percentage}
              savePercentage={this.props.savePercentage}
            />
          </td>
        </tr>
      );
    });
  }

  render(props, state) {
    return (
      <div class="resolutions">
        <h2>Users' screen resolutions</h2>
        <table>
          <thead>
            <tr>
              <th class="resolutions__label">Screen resolution</th>
              <th class="resolutions__label">Percentage of users</th>
            </tr>
          </thead>
          <tbody>{this.renderScreenResolutionInputs()}</tbody>
        </table>
      </div>
    );
  }
}

import { Component } from 'preact';

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

  enterResolution(event) {
    const { width, height } = this.parseResolution(event.target.value);

    // console.log(width, height);
    if (width > 0 && height > 0) {
      this.props.saveResolution(event.target.name, width, height);
    }
  }

  enterPercentage(event) {
    const name = 'resolution' + event.target.name[event.target.name.length - 1];
    console.log(name, event.target.value);
    let percentage = Math.abs(parseInt(event.target.value, 10));

    if (percentage > 100) {
      percentage = 100;
    }

    this.props.savePercentage(name, percentage);
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
          <tbody>
            <tr>
              <td><input type="text" name="resolution1" onKeyUp={this.enterResolution.bind(this)} value={`${this.state.screenResolutions.resolution1.width}x${this.state.screenResolutions.resolution1.height}`}/></td>
              <td><input type="text" name="percentage1" onKeyUp={this.enterPercentage.bind(this)} value={this.state.screenResolutions.resolution1.percentage}/></td>            
            </tr>
            {/* <tr>
              <td><input type="text" name="resolution2" onKeyUp={this.enterResolution.bind(this)} value={`${this.state.resolutions.resolution1.width}x${this.state.resolutions.resolution1.height}`}/></td>
              <td><input type="text" name="percentage2" onKeyUp={this.enterPercentage.bind(this)} value={this.state.resolutions.resolution1.percentage}/></td>            
            </tr>
            <tr>
              <td><input type="text" name="resolution3" onKeyUp={this.enterResolution.bind(this)} value={`${this.state.resolutions.resolution1.width}x${this.state.resolutions.resolution1.height}`}/></td>
              <td><input type="text" name="percentage3" onKeyUp={this.enterPercentage.bind(this)} value={this.state.resolutions.resolution1.percentage}/></td>            
            </tr>
            <tr>
              <td><input type="text" name="resolution4" onKeyUp={this.enterResolution.bind(this)} value={`${this.state.resolutions.resolution1.width}x${this.state.resolutions.resolution1.height}`}/></td>
              <td><input type="text" name="percentage4" onKeyUp={this.enterPercentage.bind(this)} value={this.state.resolutions.resolution1.percentage}/></td>            
            </tr>
            <tr>
              <td><input type="text" name="resolution5" onKeyUp={this.enterResolution.bind(this)} value={`${this.state.resolutions.resolution1.width}x${this.state.resolutions.resolution1.height}`}/></td>
              <td><input type="text" name="percentage5" onKeyUp={this.enterPercentage.bind(this)} value={this.state.resolutions.resolution1.percentage}/></td>            
            </tr>
            <tr>
              <td><input type="text" name="resolution6" onKeyUp={this.enterResolution.bind(this)} value={`${this.state.resolutions.resolution1.width}x${this.state.resolutions.resolution1.height}`}/></td>
              <td><input type="text" name="percentage6" onKeyUp={this.enterPercentage.bind(this)} value={this.state.resolutions.resolution1.percentage}/></td>            
            </tr>
            <tr>
              <td><input type="text" name="resolution7" onKeyUp={this.enterResolution.bind(this)} value={`${this.state.resolutions.resolution1.width}x${this.state.resolutions.resolution1.height}`}/></td>
              <td><input type="text" name="percentage7" onKeyUp={this.enterPercentage.bind(this)} value={this.state.resolutions.resolution1.percentage}/></td>            
            </tr>
            <tr>
              <td><input type="text" name="resolution8" onKeyUp={this.enterResolution.bind(this)} value={`${this.state.resolutions.resolution1.width}x${this.state.resolutions.resolution1.height}`}/></td>
              <td><input type="text" name="percentage8" onKeyUp={this.enterPercentage.bind(this)} value={this.state.resolutions.resolution1.percentage}/></td>            
            </tr>
            <tr>
              <td><input type="text" name="resolution9" onKeyUp={this.enterResolution.bind(this)} value={`${this.state.resolutions.resolution1.width}x${this.state.resolutions.resolution1.height}`}/></td>
              <td><input type="text" name="percentage9" onKeyUp={this.enterPercentage.bind(this)} value={this.state.resolutions.resolution1.percentage}/></td>            
            </tr>
            <tr>
              <td><input type="text" name="resolution10" onKeyUp={this.enterResolution.bind(this)} value={`${this.state.resolutions.resolution1.width}x${this.state.resolutions.resolution1.height}`}/></td>
              <td><input type="text" name="percentage10" onKeyUp={this.enterPercentage.bind(this)} value={this.state.resolutions.resolution1.percentage}/></td>            
            </tr> */}
          </tbody>
        </table>
      </div>
		);
	}
}

import './style';
import { Component } from 'preact';
import ScreenResolutions from './src/ScreenResolutions';
import DesignDimensions from './src/DesignDimensions';
import Canvas from './src/Canvas';

export default class App extends Component {
  constructor(props) {
    super();

    this.state = {
      screenResolutions: {
        resolution1: {
          width: 0,
          height: 0,
          percentage: 0
        }
      }
    };
  }

  componentDidMount() {

    document.addEventListener('paste', function(e) {
      const data = e.clipboardData.getData('Text');
      let screenResolutions = {};
      
      // MS Excel, even in macOS, uses \r returns instead of \n for line endings
      const rows = data.split("\r");

      const lastRow = rows[rows.length - 1];

      const splitLastRow = lastRow.split("\t");

      const totalSessions = splitLastRow[1];

      rows.forEach(function(row, index) {
        // Excel columns are separated by tabs
        const splitRow = row.split("\t");

        const resolution = splitRow[0];
        let percentage = splitRow[1];

        if (!percentage || !resolution) {
          return;
        }
          
        percentage = Math.round(parseFloat(percentage/totalSessions) * 100);

        const resolutionDimensions = resolution.split('x');
        
        const width = parseInt(resolutionDimensions[0], 10);
        const height = parseInt(resolutionDimensions[1], 10);

        screenResolutions['resolution' + (index + 1)] = {
          width,
          height,
          percentage
        }
      });

      if (Object.entries(screenResolutions).length) {
        this.setState({
          screenResolutions: screenResolutions
        });
      }
      
    }.bind(this));
  }

  // GOOD LORD THESE TWO FUNCTIONS FEEL SO CLUNKY...gotta be a better way to handle state
  saveResolution(resolutionName, width, height) {
    console.log(this.state);
    let screenResolutions = this.state.screenResolutions;

    screenResolutions[resolutionName].width = width;
    
    screenResolutions[resolutionName].height = height;

    this.setState({
      screenResolutions
    });
  }

  savePercentage(resolutionName, percentage) {
    let screenResolutions = this.state.screenResolutions;
    
    screenResolutions[resolutionName].percentage = percentage;

    this.setState({
      screenResolutions
    });
  }

	render(props, state) {
		return (
			<div class="app">
				<h1>When will users have to scroll?</h1>
        <p>
          Paste, or type in, the top 10 screen size resolutions from Google Analytics. Then enter the dimensions of your design.  
        </p>
        <div class="workarea">
          <div class="workarea__panel">
            <ScreenResolutions
              saveResolution={this.saveResolution.bind(this)}
              savePercentage={this.savePercentage.bind(this)}
              screenResolutions={this.state.screenResolutions}
            />
            <DesignDimensions />
          </div>
          <div class="workarea__panel">
            <Canvas />
          </div>
          
        </div>
			</div>
		);
	}
}

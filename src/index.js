import './style';
import { Component } from 'preact';
import ScreenResolutions from './ScreenResolutions';
import DesignDimensions from './DesignDimensions';
import Canvas from './Canvas';

export default class App extends Component {
  constructor(props) {
    super();

    // this.state.screenResolutions[0] = { width, height, percentage }
    this.state = {
      screenResolutions: {
        resolution1: {
          width: 0,
          height: 0,
          percentage: 0
        },
        resolution2: {
          width: 0,
          height: 0,
          percentage: 0
        },
        resolution3: {
          width: 0,
          height: 0,
          percentage: 0
        },
        resolution4: {
          width: 0,
          height: 0,
          percentage: 0
        },
        resolution5: {
          width: 0,
          height: 0,
          percentage: 0
        },
        resolution6: {
          width: 0,
          height: 0,
          percentage: 0
        },
        resolution7: {
          width: 0,
          height: 0,
          percentage: 0
        },
        resolution8: {
          width: 0,
          height: 0,
          percentage: 0
        },
        resolution9: {
          width: 0,
          height: 0,
          percentage: 0
        },
        resolution10: {
          width: 0,
          height: 0,
          percentage: 0
        }
      },
      designDimensions: {
        width: 0,
        height: 0
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

  saveDesignDimensions(name, width, height) {
    this.setState({
      designDimensions: {
        width,
        height
      }
    });
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
          Paste, or type in, the top 10 screen size resolutions from Google Analytics. Then enter the dimensions of your design. Everything is 1/10th scale. 
        </p>
        <div class="workarea">
          <div class="workarea__panel">
            <ScreenResolutions
              saveResolution={this.saveResolution.bind(this)}
              savePercentage={this.savePercentage.bind(this)}
              screenResolutions={this.state.screenResolutions}
            />
            <DesignDimensions 
              dimensions={this.state.designDimensions}
              saveDesignDimensions={this.saveDesignDimensions.bind(this)}
            />
          </div>
          <div class="workarea__panel">
            <Canvas 
              screenResolutions={this.state.screenResolutions}
              designDimensions={this.state.designDimensions}
            />
          </div>
          
        </div>
			</div>
		);
	}
}

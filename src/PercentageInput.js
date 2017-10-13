import { Component } from 'preact';

export default class PercentageInput extends Component {
  constructor(props) {
    super();

    this.state = {
      percentage: props.percentage
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      percentage: nextProps.percentage
    })
  }

  enterPercentage(event) {
    const valueInt = parseInt(event.target.value, 10);
    
    if (!event.target.value || Number.isNaN(valueInt)) {
      return;
    }

    const name = 'resolution' + event.target.name[event.target.name.length - 1];

    let percentage = Math.abs(valueInt);

    if (percentage > 100) {
      percentage = 100;
    }

    this.props.savePercentage(name, percentage);
  }

	render(props, state) {
    return <span>
      <input 
              type="text" 
              name={props.name} 
              onKeyUp={this.enterPercentage.bind(this)} 
              value={this.state.percentage}
              class="percentage"
          />%</span>;
  }

}
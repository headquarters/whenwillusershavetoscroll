import { Component } from "preact";

export default class Example extends Component {
  constructor(props){ 
    super();

    this.state = { 
      open: false
    };
  }

  toggle(event) {
    event.preventDefault();

    this.setState({
      open: !this.state.open
    })
  }

  render(props, state) {
    return (
      <div class="example">
        <a href="#example" class={`example__action ${this.state.open ? 'active' : '' }`} onClick={this.toggle.bind(this)}>See an example</a>
        {this.state.open && 
          <a href="./assets/example.gif"><img id="example" class="example__image" src="./assets/example.gif" alt="GIF showing how to use the site" /></a>
        }
      </div>
    )
  }
};
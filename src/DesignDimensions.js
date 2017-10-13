import { Component } from 'preact';

export default class DesignDimensions extends Component {
  render(props, state) {
    return (
      <div class="design-dimensions">
        <h2>Your design</h2>
        <label class="design-dimensions__label" for="design-dimensions">Screen size</label>
        <input type="text" id="design-dimensions" />
      </div>
    )
  }
}
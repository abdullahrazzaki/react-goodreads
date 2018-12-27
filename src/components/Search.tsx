import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
interface OwnProps {
  value: string;
  search: (text: string) => any;
  onTyped: (text: string) => any;
}
type State = {
  input: string;
};
class Search extends Component<OwnProps, State> {
  constructor(props: OwnProps) {
    super(props);
    this.state = {
      input: this.props.value
    };
    this.inputChanged = this.inputChanged.bind(this);
    this.search = this.search.bind(this);
  }

  inputChanged(event: any) {
    this.setState({ input: event.target.value });
    this.props.onTyped(event.target.value);
  }

  search() {
    this.props.search(this.state.input);
  }

  render() {
    return (
      <div className="Search">
        <InputGroup>
          <Input
            onChange={this.inputChanged}
            value={this.state.input}
            placeholder="Enter keyword"
            type="text"
          />
          <InputGroupAddon addonType="append">
            <Button onClick={this.search}>Search</Button>{" "}
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}
export default Search;

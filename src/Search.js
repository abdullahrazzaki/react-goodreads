import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.value,
            searchValue: ''
        };
        this.inputChanged = this.inputChanged.bind(this);
        this.search = this.search.bind(this);
    }

    inputChanged(event) {
        console.log(event);
        this.setState({input: event.target.value});
        this.props.onTyped(event.target.value);
    }

    search() {
        this.props.search(this.state.input);
    }

    render() {
        return (
            <div className="Search">

                <InputGroup>
                    <Input onChange={this.inputChanged} value={this.state.input} placeholder="Enter keyword"
                           type="text"/>
                    <InputGroupAddon addonType="append"><Button onClick={this.search}>Search</Button> </InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}

Search.propTypes =
    {
        value: PropTypes.string.isRequired,
        search: PropTypes.func.isRequired,
        onTyped: PropTypes.func.isRequired
    };
export default Search;

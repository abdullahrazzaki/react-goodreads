import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link, withRouter} from "react-router-dom";
import {connect} from 'react-redux';

class Header extends Component {

    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="">{this.props.title}</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                {!this.props.isHome && <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/">Home</NavLink>
                    </NavItem>
                </Nav>
                }
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        path: state.router.location.pathname,
        isHome: state.router.location.pathname === "/"
    };
};
Header.propTypes =
    {
        title: PropTypes.string.isRequired,
        isHome: PropTypes.bool.isRequired
    };
Header.defaultProps = {title: "GoodReads", home: "/"};
export default withRouter(connect(mapStateToProps)(Header));
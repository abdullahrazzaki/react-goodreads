import React from "react";
import PropTypes from "prop-types";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
type Props = {
  isHome: boolean;
  title: string;
};
const Header = (props: Props) => {
  const { isHome, title } = props;
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="">{title}</NavbarBrand>
      {!isHome && (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">
              Home
            </NavLink>
          </NavItem>
        </Nav>
      )}
    </Navbar>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isHome: state.router.location.pathname === "/"
  };
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isHome: PropTypes.bool.isRequired
};

Header.defaultProps = { title: "GoodReads", home: "/" };

export default connect(mapStateToProps)(Header);

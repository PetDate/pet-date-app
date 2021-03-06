import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, } from "react-router-dom";
import {
  HeaderNavigation,
  StyledNavigationList,
  StyledNavigationItem,
  ALIGN,
} from "baseui/header-navigation";
import { Avatar } from "baseui/avatar";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";
import { Button, KIND, SIZE } from "baseui/button";
import { ChevronDown } from "baseui/icon";
import { LOGOUT_REQUEST } from "utils/storeConsts";
import LoginModal from "components/modals/LoginModal";
import { HeadingXSmall } from "baseui/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

export const LoginButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <React.Fragment>
      <Button onClick={() => setIsOpen(true)}>
        Login
      </Button>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </React.Fragment>
  );
}

export const ProfileButton = ({ user, onLogout }) => {

  const history = useHistory();

  const ITEMS = [
    {
      label: "My Pets",
      action: () => {
        history.push("/user/pets");
      },
    },
    {
      label: "Logout",
      action: () => {
        onLogout();
        window.location.reload();
      },
    },
  ];

  return (
    <StatefulPopover
      focusLock
      placement={PLACEMENT.bottomRight}
      content={({ close }) => (
        <StatefulMenu
          items={ITEMS}
          onItemSelect={({ item }) => {
            item.action();
            close();
          }}
          overrides={{ List: { style: { width: '138px' } } }}
        />
      )}
    >
      <Button
        type="button"
        kind={KIND.minimal}
        endEnhancer={ChevronDown}
        $style={{
          ":hover": {
            backgroundColor: "transparent",
          },
          ":active": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Avatar name={user.username} />
      </Button>
    </StatefulPopover>
  );
}

const NavButton = (props) => {
  const history = useHistory();

  return (
    <Button
      {...props}
      kind={KIND.minimal}
      onClick={() => history.push(props.to)}
    >
      {props.children}
    </Button>
  );
};

const DesktopNavbar = ({ user, logout, toggleTheme }) => {

  return (
    <HeaderNavigation
      $style={{
        paddingTop: "0px",
        paddingBottom: "0px",
        paddingLeft: "12%",
        paddingRight: "12%",
        height: "60px",
      }}
    >
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>
          <Link to="/" style={{ textDecoration: "inherit", color: "inherit", }}>
            <HeadingXSmall $style={{ margin: "0" }} >Pet Date App</HeadingXSmall>
          </Link>
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <NavButton
            to="/adoption"
          >
            How to Adopt?
          </NavButton>
          <NavButton
            to="/swiper"
          >
            Animal Swiper
          </NavButton>
          <NavButton
            to="/dateswiper"
          >
            Date Swiper
          </NavButton>
        </StyledNavigationItem>
        <StyledNavigationItem>
          <Button
            kind={KIND.minimal}
            size={SIZE.compact}
            onClick={toggleTheme}
          >
            <FontAwesomeIcon icon={faLightbulb} />
          </Button>
        </StyledNavigationItem>
        <StyledNavigationItem>
          {user ? <ProfileButton user={user} onLogout={logout} /> : <LoginButton />}
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: LOGOUT_REQUEST }),
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(DesktopNavbar);
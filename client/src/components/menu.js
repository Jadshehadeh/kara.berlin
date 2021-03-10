import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signOut, isAuthenticated } from "../auth/index";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import MenuIcon from "@material-ui/icons/Menu";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import PersistentDrawerLeft from "./sidebar";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

// const { role } = isAuthenticated();

const isActive = (history, path) => {
  if (history.location.ppathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const PrimarySearchAppBar = ({ history }) => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <PersistentDrawerLeft />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link className="nav-link" style={isActive(history, "/")} to="/">
              Home
            </Link>
          </Typography>
          {isAuthenticated() && (
            <Typography className={classes.title} variant="h6" noWrap>
              <Link
                className="nav-link"
                style={isActive(history, "/userDashboard")}
                to="/userDashboard"
              >
                Dashboard
              </Link>
            </Typography>
          )}

          <div className={classes.grow} />
          {!isAuthenticated() && (
            <Typography
              edge="end"
              className={classes.title}
              variant="h6"
              noWrap
            >
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                SignIn
              </Link>
            </Typography>
          )}
          {isAuthenticated() && (
            <div className={classes.sectionDesktop}>
              {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
              <MailIcon />
              </Badge>
              </IconButton>
              <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
              </Badge>
            </IconButton> */}
              <IconButton
                edge="end"
                aria-label="account of current user"
                color="inherit"
              >
                <Link to="/profile">
                  <AccountCircle />
                </Link>
              </IconButton>
              <IconButton
                onClick={() =>
                  signOut(() => {
                    history.push("/");
                  })
                }
                edge="end"
                aria-label="sign out"
                color="inherit"
              >
                <PowerSettingsNewIcon />
              </IconButton>
            </div>
          )}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};

export default withRouter(PrimarySearchAppBar);

import React from "react";

import { useSelector } from "react-redux";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";

const useStyles = makeStyles(theme => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isLogin = useSelector(state => state.logIn.isLoggedIn);
  const user = useSelector(state => state.user.user);

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          {user.name}
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            {isLogin && (
              <>
                <Link to="/home" className={classes.link}>
                  Home
                </Link>
                <Link to="/result" className={classes.link}>
                  Result
                </Link>
                <Link to="/contact" className={classes.link}>
                  Contact
                </Link>
                <Link to="/Logout" className={classes.link}>
                  Log Out
                </Link>
              </>
            )}

            {!isLogin && (
              <Link to="/" className={classes.link}>
                Log In
              </Link>
            )}

            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={AddUser} disableRipple>
                Log In
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                Sign In
              </MenuItem>

              <MenuItem onClick={handleClose} disableRipple>
                Log Out
              </MenuItem>
            </StyledMenu> */}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;

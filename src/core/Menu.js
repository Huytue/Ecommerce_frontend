import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default withRouter(function Menu({ history }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            TECH SHOP
          </Typography>

          <Link className="nav-link" style={isActive(history, "/")} to="/">
            <Tab label="Home" />
          </Link>

          <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">
            <Tab label="Shop" />
          </Link>

          <Link
            className="nav-link"
            style={isActive(history, "/cart")}
            to="/cart"
          >
            <Tab label="Cart" />
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
          </Link>

           {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <Link
                className="nav-link"
                style={isActive(history, "/user/dashboard")}
                to="/user/dashboard"
              >
                <Tab label="Dashboard" />
              </Link>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <Link
                className="nav-link"
                style={isActive(history, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                <Tab label="Dashboard" />
              </Link>
            )}

          



          {!isAuthenticated() && (
              <Fragment>
                <Link
                  className="nav-link"
                  style={isActive(history, "/signin")}
                  to="/signin"
                >
                  <Tab label="Signin" />
                </Link>

                <Link
                  className="nav-link"
                  style={isActive(history, "/signup")}
                  to="/signup"
                >
                  <Tab label="Register" />
                </Link>
              </Fragment>
            )}


     




          {isAuthenticated() && (
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                <Tab label="Signout" />
              </span>
            )}
          
        </Toolbar>
      </AppBar>
    </div>
  );
});

// const Menu = ({ history }) => (
//   <div>
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="title" color="inherit">
//           <Tabs>
//             <Link className="nav-link" style={isActive(history, "/")} to="/">
//               <Tab label="Home" />
//             </Link>

//             <Link
//               className="nav-link"
//               style={isActive(history, "/shop")}
//               to="/shop"
//             >
//               <Tab label="Shop" />
//             </Link>

//             <Link
//               className="nav-link"
//               style={isActive(history, "/cart")}
//               to="/cart"
//             >
//               <Tab label="Cart" />
//               <sup>
//                 <small className="cart-badge">{itemTotal()}</small>
//               </sup>
//             </Link>

//             {isAuthenticated() && isAuthenticated().user.role === 0 && (
//               <Link
//                 className="nav-link"
//                 style={isActive(history, "/user/dashboard")}
//                 to="/user/dashboard"
//               >
//                 <Tab label="Dashboard" />
//               </Link>
//             )}

//             {isAuthenticated() && isAuthenticated().user.role === 1 && (
//               <Link
//                 className="nav-link"
//                 style={isActive(history, "/admin/dashboard")}
//                 to="/admin/dashboard"
//               >
//                 <Tab label="Dashboard" />
//               </Link>
//             )}

//             {!isAuthenticated() && (
//               <Fragment>
//                 <Link
//                   className="nav-link"
//                   style={isActive(history, "/signin")}
//                   to="/signin"
//                 >
//                   <Tab label="Signin" />
//                 </Link>

//                 <Link
//                   className="nav-link"
//                   style={isActive(history, "/signup")}
//                   to="/signup"
//                 >
//                   <Tab label="Register" />
//                 </Link>
//               </Fragment>
//             )}

//             {isAuthenticated() && (
//               <span
//                 className="nav-link"
//                 style={{ cursor: "pointer", color: "#ffffff" }}
//                 onClick={() =>
//                   signout(() => {
//                     history.push("/");
//                   })
//                 }
//               >
//                 <Tab label="Signout" />
//               </span>
//             )}
//           </Tabs>
//         </Typography>
//       </Toolbar>
//     </AppBar>
//   </div>
// );

// export default withRouter(Menu);

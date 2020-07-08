import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { Fragment, useState } from "react"
const axios = require("axios").default
var querystring = require("querystring")

const Header = ({ siteTitle }) => {
  const [_, setTemp] = useState();
  return (
    <nav className="fixed border fixed split-nav">
      <div className="nav-brand">
        <h3>
          <Link
            to="/"
            id="title"
            style={{
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h3>
      </div>
      <div className="collapsible">
        <input id="collapsible1" type="checkbox" name="collapsible1" />
        <button aria-label="menus">
          <label htmlFor="collapsible1">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </label>
        </button>
        <div className="collapsible-body">
          <ul className="inline">
            {typeof Storage !== "undefined" ? (
              JSON.parse(localStorage.getItem("u")) ? (
                <Fragment>
                  <li>
                    <Link
                      to="/profile"
                      style={{
                        textDecoration: `none`,
                      }}
                    >
                      Profile
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      let email =
                        typeof Storage !== "undefined"
                          ? JSON.parse(localStorage.getItem("u")) ? JSON.parse(localStorage.getItem("u")).email : ''
                          : ""
                      axios
                        .post(
                          `${process.env.GATSBY_BACKEND_URL}/api/user/logout`,
                          querystring.stringify({
                            email,
                          }),
                          {
                            headers: {
                              "Content-Type":
                                "application/x-www-form-urlencoded",
                            },
                          }
                        )
                        .then(res => {
                          console.log(res)
                          setTemp(res)
                          if (typeof Storage !== "undefined") {
                            //use the local storage
                            localStorage.removeItem("u")
                          }
                        })
                        .catch(alert)
                    }}
                  >
                    <Link
                      to="/"
                      style={{
                        textDecoration: `none`,
                      }}
                    >
                      Log out
                    </Link>
                  </li>
                </Fragment>
              ) : (
                <ul className="inline">
                  <li>
                    <Link
                      to="/login"
                      style={{
                        textDecoration: `none`,
                      }}
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              )
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

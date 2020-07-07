import React, { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, navigate } from "gatsby"
const axios = require("axios").default
var querystring = require("querystring")

const RegisterPage = () => {
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  return (
    <Layout>
      <SEO title="Register" />
      <div className="real-center">
        <div className="border border-primary padding-large">
          <div className="card-body">
            <h4 className="card-title">Register</h4>
            <form id="register-form">
              <div className="row">
                <div className="col sm-6">
                  <div className="form-group">
                    <label htmlFor="inputName">Name</label>
                    <input
                      onChange={e => setName(e.target.value)}
                      type="text"
                      className="input-block"
                      placeholder="Input your name here"
                      id="inputName"
                    />
                  </div>
                </div>
                <div className="col sm-6">
                  <div className="form-group">
                    <label htmlFor="inputEmail">Email</label>
                    <input
                      onChange={e => setEmail(e.target.value)}
                      type="email"
                      className="input-block"
                      placeholder="email@example.com"
                      id="inputEmail"
                    />
                  </div>
                </div>
                <div className="col sm-6">
                  <div className="form-group">
                    <label htmlFor="inputPassword1">Password</label>
                    <input
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                      placeholder="..."
                      id="inputPassword1"
                    />
                  </div>
                </div>
                <div className="col sm-6">
                  <div className="form-group">
                    <label htmlFor="inputPassword2">Confirm Password</label>
                    <input
                      onChange={e => setConfirmPassword(e.target.value)}
                      type="password"
                      placeholder="..."
                      id="inputPassword2"
                    />
                  </div>
                </div>
              </div>
            </form>
            <h5 className="card-subtitle">
              Have an account?{" "}
              <Link
                to="/login"
                style={{
                  textDecoration: `none`,
                }}
              >
                Login
              </Link>
            </h5>
            <button
              disabled={
                !(
                  name &&
                  email &&
                  password &&
                  confirmPassword &&
                  password === confirmPassword
                )
              }
              onClick={() => {
                axios
                  .post(
                    `${process.env.GATSBY_BACKEND_URL}/api/user/register`,
                    querystring.stringify({
                      email,
                      name,
                      password,
                    }),
                    {
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                    }
                  )
                  .then(res => {
                    console.log(res)
                    if (typeof Storage !== "undefined") {
                      //use the local storage
                      localStorage.setItem("u", JSON.stringify(res.data))
                    }
                  })
                  .catch(alert)
                  .finally(() => {
                    navigate("/")
                  })
              }}
              aria-label="register"
              className="background-primary"
              type="button"
              form="register-form"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default RegisterPage

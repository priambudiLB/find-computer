import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, navigate } from "gatsby"
const axios = require("axios").default
var querystring = require("querystring")

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Layout>
      <SEO title="Login" />
      <div className="real-center">
        <div className="border border-primary padding-large">
          <div className="card-body">
            <h4 className="card-title">Login</h4>
            <form id="login-form">
              <div className="row">
                <div className="col sm-6">
                  <div className="form-group">
                    <label htmlFor="inputEmail">Email</label>
                    <input
                      onChange={e => setEmail(e.target.value)}
                      type="email"
                      placeholder="email@example.com"
                      id="inputEmail"
                    />
                  </div>
                </div>
                <div className="col sm-6">
                  <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                      placeholder=""
                      id="inputPassword"
                    />
                  </div>
                </div>
              </div>
            </form>
            <h5 className="card-subtitle">
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  textDecoration: `none`,
                }}
              >
                Register
              </Link>
            </h5>
            <button
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true)
                axios
                  .post(
                    `${process.env.GATSBY_BACKEND_URL}/api/user/login`,
                    querystring.stringify({
                      email,
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
                    setIsLoading(false)
                    navigate("/")
                  })
              }}
              aria-label="login"
              className="background-primary"
              type="button"
              form="login-form"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LoginPage

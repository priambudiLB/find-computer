import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const LoginPage = () => (
  <Layout>
    <SEO title="Login" />
    <div className="real-center">
      <div className="border border-primary padding-large" style={{ width: "25rem" }}>
        <div className="card-body">
          <h4 className="card-title">Login</h4>
          <form id="login-form">
            <div className="row">
              <div className="col sm-6">
                <div className="form-group">
                  <label htmlFor="inputEmail">Email</label>
                  <input type="email" placeholder="email@example.com" id="inputEmail" />
                </div>
              </div>
              <div className="col sm-6">
                <div className="form-group">
                  <label htmlFor="inputPassword">Password</label>
                  <input type="password" placeholder="..." id="inputPassword" />
                </div>
              </div>
            </div>
          </form>
          <h5 className="card-subtitle">Don't have an account? <Link to="/register"
            style={{
              textDecoration: `none`,
            }}>Register</Link></h5>
          <button aria-label="login" className="background-primary" type="submit" form="login-form">Login</button>
        </div>
      </div>
    </div>
  </Layout>
)

export default LoginPage

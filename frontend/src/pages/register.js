import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const RegisterPage = () => (
  <Layout>
    <SEO title="Login" />
    <div className="real-center">
    <div className="border border-primary padding-large">
        <div className="card-body">
          <h4 className="card-title">Register</h4>
          <form id="register-form">
            <div className="row">
            <div className="col sm-6">
                <div className="form-group">
                  <label htmlFor="inputName">Name</label>
                  <input type="text" className="input-block" placeholder="Input your name here" id="inputName" />
                </div>
              </div>
              <div className="col sm-6">
                <div className="form-group">
                  <label htmlFor="inputEmail">Email</label>
                  <input type="email" className="input-block" placeholder="email@example.com" id="inputEmail" />
                </div>
              </div>
              <div className="col sm-6">
                <div className="form-group">
                  <label htmlFor="inputPassword1">Password</label>
                  <input type="password" placeholder="..." id="inputPassword1" />
                </div>
              </div>
              <div className="col sm-6">
                <div className="form-group">
                  <label htmlFor="inputPassword2">Confirm Password</label>
                  <input type="password" placeholder="..." id="inputPassword2" />
                </div>
              </div>
            </div>
          </form>
          <h5 className="card-subtitle">Have an account? <Link to="/login"
            style={{
              textDecoration: `none`,
            }}>Login</Link></h5>
          <button aria-label="register" className="background-primary" type="submit" form="register-form">Register</button>
        </div>
      </div>
    </div>
  </Layout>
)

export default RegisterPage

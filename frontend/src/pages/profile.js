import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, navigate } from "gatsby"
const axios = require("axios").default
var querystring = require("querystring")

const ProfilePage = () => {
  const deviceName = typeof Storage !== "undefined"
  ? JSON.parse(localStorage.getItem("u")).name
  : ""
  const deviceEmail = typeof Storage !== "undefined"
  ? JSON.parse(localStorage.getItem("u")).name
  : ""
  const deviceId = typeof Storage !== "undefined"
  ? JSON.parse(localStorage.getItem("u")).id
  : ""
  const [name, setName] = useState(deviceName)
  const [email, setEmail] = useState(deviceEmail)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Layout>
      <SEO title="Profile" />
      <div className="real-center">
        <div className="border border-primary padding">
          <div className="card-body">
            <h4 className="card-title">Profile</h4>
            <form id="register-form">
              <div className="row">
                <div className="col sm-6">
                  <div className="form-group">
                    <label htmlFor="inputName">Name</label>
                    <input
                      onChange={e => setName(e.target.value)}
                      value={name}
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
                      value={email}
                      type="email"
                      className="input-block"
                      placeholder="email@example.com"
                      id="inputEmail"
                    />
                  </div>
                </div>
              </div>
            </form>
            <button
              disabled={(deviceName === name && deviceEmail === email) && !isLoading}
              onClick={() => {
                setIsLoading(true)
                axios
                  .post(
                    `${process.env.GATSBY_BACKEND_URL}/api/user/update`,
                    querystring.stringify({
                      id: deviceId,
                      name,
                      email,
                    }),
                    {
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                    }
                  )
                  .then(res => {
                    setIsLoading(false)
                    console.log(res)
                    navigate("/")
                  })
                  .catch(alert)
              }}
              aria-label="login"
              className="background-primary"
              type="button"
              form="login-form"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProfilePage

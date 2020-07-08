import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { navigate } from "gatsby"
const axios = require("axios").default
var querystring = require("querystring")
var deviceId = typeof Storage !== "undefined"
  ? JSON.parse(localStorage.getItem("u")).id
  : ""
const UpdateProfile = () => {
  const [profileData, setProfileData] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch(`${process.env.GATSBY_BACKEND_URL}/api/user/detail`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: querystring.stringify({
        id: deviceId,
      })
    })
    .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setName(resultData.name)
        setEmail(resultData.email)
        setProfileData(resultData)
      })
  }, [])
  console.log('render')

  return <div className="border border-primary padding">
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
              disabled
              onChange={e => setEmail(e.target.value)}
              defaultValue={email}
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
      disabled={(profileData.name === name && profileData.email === email) && !isLoading}
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
}
const ProfilePage = () => {

  return (
    <Layout>
      <SEO title="Profile" />
      <div className="real-center">
        <UpdateProfile />
      </div>
    </Layout>
  )
}

export default ProfilePage

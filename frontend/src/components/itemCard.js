import React from "react"
import { navigate } from "gatsby"
const axios = require("axios").default
var querystring = require("querystring")

const parseCategoryToColor = cat => {
  if (cat === undefined) return "#fff"
  const category = cat.toLowerCase()
  if (category === "ram") {
    return "#2d132c"
  } else if (category === "processor") {
    return "#84142d"
  } else if (category === "vga") {
    return "#204051"
  } else if (category === "motherboard") {
    return "#3b6978"
  } else if (category === "storage") {
    return "#111d5e"
  } else return "#fff"
}
const ItemCard = ({ id, title, category, price, description, owner, stock }) => {
  const deviceName = typeof Storage !== "undefined"
    ? JSON.parse(localStorage.getItem("u")) ? JSON.parse(localStorage.getItem("u")).name : ''
    : ""
  console.log(deviceName, owner)
  const newOwner = `${owner} ${owner === deviceName ? '(You)' : ''}`
  return (
    <div key={id} className="sm-6 md-4 col">
      <div className="card" style={{ width: "15rem", pointerEvents: stock > 0 ? 'default' : 'none', boxShadow: stock > 0 ? 'box-shadow: 15px 28px 25px -18px rgba(0,0,0,0.2)' : 'none' }}>
        <div className="card-body">
          <h4 className="card-title">
            <span
              className="badge"
              style={{ backgroundColor: parseCategoryToColor(category) }}
            >
              {category}
            </span>{" "}
            {title}
          </h4>
          <div className="row flex-middle"><h5 className="card-subtitle" style={{ color: '#000', textDecoration: stock > 0 ? 'none' : 'line-through red' }}>{price}</h5><span className="margin-left-small">{stock > 0 ? '' : 'Sold Out'}</span></div>
          <p className="card-text">{description}</p>
          <div class="row flex-middle flex-edges">
            <div class="col-8">{newOwner}</div>
            <div class="col-3">
              {JSON.parse(localStorage.getItem("u")) && stock > 0 && deviceName !== owner ?
                <button onClick={() => {
                  axios
                    .post(
                      `${process.env.GATSBY_BACKEND_URL}/api/item/delete`,
                      querystring.stringify({
                        itemId: id,
                      }),
                      {
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded",
                        },
                      }
                    )
                    .then(res => {
                      console.log(res)
                    })
                    .catch(alert)
                    .finally(() => {
                      navigate("/")
                    })
                }} aria-label="buy">Buy</button>
                : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCard

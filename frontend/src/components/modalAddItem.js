import React, { Fragment, useEffect, useState } from "react"
import { Dropdown } from "./dropdown"
const axios = require("axios").default
var querystring = require("querystring")

const ModalAddItem = () => {
    const deviceId = typeof Storage !== "undefined"
    ? JSON.parse(localStorage.getItem("u")) ? JSON.parse(localStorage.getItem("u")).id : ''
    : ""
    const [name, setName] = useState('')
    const [decription, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch(`${process.env.GATSBY_BACKEND_URL}/api/category/all`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(response => response.json()) // parse JSON from request
            .then(resultData => {
                console.log(resultData)
                setCategories(resultData)
            })
    }, [])
    return (
        <Fragment>
            <div class="add-item">
                <label class="paper-btn margin" for="modal-2">+</label>
            </div>
            <input class="modal-state" id="modal-2" type="checkbox" />
            <div class="modal">
                <div class="modal-body">
                    <label class="btn-close" for="modal-2">X</label>
                    <h4 class="modal-title">Add Item</h4>
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
                                    <label htmlFor="inputDescription">Description</label>
                                    <input
                                        onChange={e => setDescription(e.target.value)}
                                        type="text"
                                        className="input-block"
                                        placeholder="description"
                                        id="inputDescription"
                                    />
                                </div>
                            </div>
                            <div className="col sm-6">
                                <div className="form-group">
                                    <label htmlFor="inputCategory">Category</label>
                                    <select id="inputCategory" onChange={(e) => setCategory(e.target.value)} >
                                        <Dropdown items={categories} />
                                    </select>
                                </div>
                            </div>
                            <div className="col sm-6">
                                <div className="form-group">
                                    <label htmlFor="inputPrice">Price</label>
                                    <input
                                        onChange={e => setPrice(e.target.value)}
                                        type="number"
                                        placeholder=""
                                        id="inputPrice"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <button
                    disabled={!(name && decription && category && price)}
                    onClick={() => {
                axios
                  .post(
                    `${process.env.GATSBY_BACKEND_URL}/api/item/add`,
                    querystring.stringify({
                      name,
                      decription,
                      categoryId: category,
                      ownerId: deviceId, 
                      price,
                      stock: 1
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
                    // navigate("/")
                  })
              }}

                        aria-label="register"
                        className="background-primary"
                        type="button"
                        form="register-form"
                    >
                        Add
            </button>

                </div>
            </div>
        </Fragment>
    )
}

export default ModalAddItem

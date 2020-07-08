import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ItemCard from "../components/itemCard"
import ModalAddItem from "../components/modalAddItem"
import Image from "../components/image"
const axios = require("axios").default

// const datas = [
//   {
//     name: "RAM terbagus",
//     category: "1",
//     price: 100000,
//     description: "RAM terbagus se-Indonesia.",
//     owner: 1,
//   },
//   {
//     name: "Processor terbagus",
//     category: "2",
//     price: 100000,
//     description: "Processor terbagus se-Indonesia.",
//     owner: 1,
//   },
//   {
//     name: "VGA terbagus",
//     category: "3",
//     price: 100000,
//     description: "VGA terbagus se-Indonesia.",
//     owner: 1,
//   },
//   {
//     name: "Motherboard terbagus",
//     category: "4",
//     price: 100000,
//     description: "Motherboard terbagus se-Indonesia.",
//     owner: 1,
//   },
//   {
//     name: "Storage terbagus",
//     category: "5",
//     price: 100000,
//     description: "Storage terbagus se-Indonesia.",
//     owner: 1,
//   },
// ]

const parseCategoryIdToCategory = id => {
  if (id === 1) {
    return "RAM"
  } else if (id === 2) {
    return "Processor"
  } else if (id === 3) {
    return "VGA"
  } else if (id === 4) {
    return "Motherboard"
  } else if (id === 5) {
    return "Storage"
  }
}

const ItemCards = ({ data }) =>
  data.map((item, index) => {
    const { id, name, categoryId, price, description, owner, stock } = item
    const category = parseCategoryIdToCategory(categoryId)
    return (
      <ItemCard
        id={id}
        key={index}
        title={name}
        category={category}
        price={price}
        owner={owner}
        stock={stock}
        description={description}
      />
    )
  })
const IndexPage = () => {
  const [item, setItem] = useState([])

  useEffect(() => {
    console.log(process.env.GATSBY_BACKEND_URL)
    axios
      .get(`${process.env.GATSBY_BACKEND_URL}/api/item/all`, { timeout: 5000 })
      .then(function (response) {
        setItem(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])
  return (
    <Layout>
      <SEO title="Home" />
      <div className="row" style={{ marginTop: "10vh" }}>
        <ItemCards data={item} />
      </div>
      <ModalAddItem />
    </Layout>
  )
}

export default IndexPage

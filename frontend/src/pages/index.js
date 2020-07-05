import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ItemCard from "../components/itemCard"

const datas = [
  {
    title: "RAM terbagus",
    category: "RAM",
    price: 100000,
    description: "RAM terbagus se-Indonesia.",
    owner: 1
  },
  {
    title: "Processor terbagus",
    category: "Processor",
    price: 100000,
    description: "Processor terbagus se-Indonesia.",
    owner: 1
  },
  {
    title: "VGA terbagus",
    category: "VGA",
    price: 100000,
    description: "VGA terbagus se-Indonesia.",
    owner: 1
  },
  {
    title: "Motherboard terbagus",
    category: "Motherboard",
    price: 100000,
    description: "Motherboard terbagus se-Indonesia.",
    owner: 1
  },
  {
    title: "Storage terbagus",
    category: "Storage",
    price: 100000,
    description: "Storage terbagus se-Indonesia.",
    owner: 1
  }
]

const ItemCards = ({data}) => data.map((item, index)=>{
  const { title, category, price, description } = item;
  return <ItemCard 
    key={index}
    title={title}
    category={category}
    price={price}
    description={description}
  />
})
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="row" style={{ marginTop: '10vh'}}>
      <ItemCards data={datas}/>
    </div>
  </Layout>
)

export default IndexPage

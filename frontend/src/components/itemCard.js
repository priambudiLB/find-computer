import React from "react"

const parseCategoryToColor = (cat) => {
    if(cat===undefined) return "#fff"
    const category = cat.toLowerCase();
    if (category === "ram"){
        return "#2d132c";
    } else if (category === "processor"){
        return "#84142d";
    } else if (category === "vga"){
        return "#204051";
    } else if (category === "motherboard"){
        return "#3b6978";
    } else if (category === "storage"){
        return "#111d5e";
    } else return "#fff"
}
const ItemCard = ({ id, title, category, price, description }) => {
    return <div id={id} className="sm-6 md-4 col">
        <div className="card" style={{ width: "15rem" }}>
            <div className="card-body">
                <h4 className="card-title">
                    <span className="badge" style={{ backgroundColor: parseCategoryToColor(category) }}>
                        {category}
                    </span> {title}
                </h4>
                <h5 className="card-subtitle">{price}</h5>
                <p className="card-text">{description}</p>
                <button aria-label="buy">Buy</button>
            </div>
        </div>
    </div>
}

export default ItemCard
import React, { Fragment } from "react"

export const Dropdown = ({items}) =>{
    return <Fragment>
        <option selected disabled hidden value="0">Choose</option>
        <Dropdowns items={items} />
    </Fragment>
}

export const Dropdowns = ({items}) =>{
    return items.map((item, index)=>{
        const optionId = item.id || index+1;
        return <option value={optionId}>{item.name}</option>
    })
}
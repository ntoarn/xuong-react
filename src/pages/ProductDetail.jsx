import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../apis/index';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() =>{
    (async ()=> {
      const { data } = await instance.get(`/products/${id}`)
      setProduct(data)
    })()
  },[] )
  return (
    <>
    <div className="container">
    <h1>Chi tiết sản phẩm</h1>
    <div className="row">
      <div className="col-12 col-md-6">
        <img src={product.thumbnail} alt="" />
      </div>
      <div className="col-12 col-md-6">
        <h1>{product.title}</h1>
        <p>Giá: {product.price}</p>
        <p>{product.description}</p>
        <p>Thương hiệu: {product.brand}</p>
        <button className='btn btn-primary'>Mua</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default ProductDetail

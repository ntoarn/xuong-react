import React, { useContext } from 'react';
import { ProductContext } from './../contexts/ProductContext';
import { Link } from 'react-router-dom';
            
function Home() {
    const { state } = useContext(ProductContext)
    return (
        <>
        
       <div className="container">
       <div className="banner">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmPVeQvmwG7JbtnzPzSo7syQM4prji0Qpo9Q&s" alt="Banner" className='banner-img' />
        </div>
            <h1 className="my-4 text-center">Danh sách sản phẩm</h1>
            <div className="row">
                {state.products.map(product => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id} >
                        <div className="card h-100 product-card">
                            <Link to={`/product-detail/${product.id}`}>
                                <img className="card-img-top" src={product.thumbnail} alt={product.title} height={200} />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-price">Giá: {product.price}$</p>
                                <p className="card-text">{product.description}</p>
                                <p className="card-brand">Thương hiệu: {product.brand}</p>
                                <button className="btn btn-primary">Add To Cart</button>
                            </div>
                        </div>
                        </div> 
                ))}
            </div>
        </div>
        </>
    )
}

export default Home

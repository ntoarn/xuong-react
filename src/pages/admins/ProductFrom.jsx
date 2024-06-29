import './form.scss'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import productSchema from './../../validations/productSchema';
import instance from './../../apis/index';
import Button from './../../components/Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import { ProductContext } from '../../contexts/ProductContext';

const ProductFrom = () => {
    const { id } = useParams();
    const nav = useNavigate()
    const { dispatch } = useContext(ProductContext)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(productSchema)
    })
    if (id) {
        useEffect(() => {
            (async () => {
                try {
                    const { data } = await instance.get(`/products/${id}`)
                    reset(data)
                } catch (error) {
                    console.log(error.message)
                }
            })()
        }, [id ,reset])
    }
    const onSubmit = async (product) => {
         try {
                if (id) {
                    await instance.put(`products/${id}`, product)
                    toast.success("Sửa sản phẩm thành công!");
                    dispatch({type: "UPDATE_PRODUCT", payload: {id, product}})
                    // console.log(data);
                    // setProducts(res.data)
                    setTimeout(() => {
                        nav("/admin")
                    }, 2000)
                } else {
                    const { data } = await instance.post("/products", product);
                    toast.success("Thêm sản phẩm thành công!");
                    dispatch({type: "ADD_PRODUCT", payload:data})
                    // setProducts([...products, res.data]);
                    // showSuccess();
                    setTimeout(() => {
                        nav("/admin");
                    }, 2000)
                }
            } catch (error) {

            }
        
    }
    return (
        <>
            <form onSubmit={handleSubmit((data) => onSubmit({...data, id}))}>
                <h1>{id ? "Product Edit" : "Product Add"}</h1>
                <div className="mb-3 form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className='form-control' id="title"
                        {...register("title", { required: true })}
                    />
                    {errors.title?.message && <p className='text-danger'>{errors.title?.message}</p>}
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="price" className="form-label">price</label>
                    <input type="number" className='form-control' id="price"
                        {...register("price", { required: true, valueAsNumber: true })}
                    />
                    {errors.price?.message && <p className='text-danger'>{errors.price?.message}</p>}
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className='form-control' id="description"
                        {...register("description", { required: true })}
                    />
                    {errors.description?.message && <p className='text-danger'>{errors.description?.message}</p>}
                </div>
                <div className="mb-3  form-group">
                    <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
                    <input
                        type="text"
                        className="form-control"
                        id="thumbnail"
                        {...register("thumbnail")}
                    />
                    {errors.thumbnail?.message && <p className="text-danger">{errors.thumbnail?.message}</p>}
                </div>
                <div className="mb-3  form-group">
                    <label htmlFor="brand" className="form-label">Brand</label>
                    <input
                        type="text"
                        className="form-control"
                        id="brand"
                        {...register("brand")}
                    />
                    {errors.brand?.message && <p className="text-danger">{errors.brand?.message}</p>}
                </div>
                <Button type="submit">
                    {id ? "Product Edit" : "Product Add"}
                </Button>
            </form>
            <ToastContainer />
        </>
    )
}

export default ProductFrom
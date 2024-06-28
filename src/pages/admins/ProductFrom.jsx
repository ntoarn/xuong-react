import './form.scss'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import productSchema from './../../validations/productSchema';
import instance from './../../apis/index';
import Button from './../../components/Button/Button';
import { ToastContainer, toast } from 'react-toastify';

const ProductFrom = () => {
    const { id } = useParams();
    const nav = useNavigate()
    const [products, setProducts] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await instance.get("/products")
                setProducts(data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
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
        }, [])
    }
    const onSubmitProduct = (data) => {
        (async () => {
            try {
                if (data.id) {
                    const res = await instance.patch(`products/${id}`, data)
                    toast.success("Sửa sản phẩm thành công!");
                    // console.log(data);
                    setProducts(res.data)
                    setTimeout(() => {
                        nav("/admin")
                    }, 2000)
                } else {
                    const res = await instance.post("/products", data);
                    toast.success("Thêm sản phẩm thành công!");
                    setProducts([...products, res.data]);
                    // showSuccess();
                    setTimeout(() => {
                        nav("/admin");
                    }, 2000)
                }
            } catch (error) {

            }
        })()
    }

    const onSubmit = (data) => {
        onSubmitProduct({ ...data, id })
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
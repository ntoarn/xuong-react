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
const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;

const ProductFrom = () => {
    const { id } = useParams();
    const nav = useNavigate()
    const { dispatch } = useContext(ProductContext)
    const [thumbnailUrl, setThumbnailUrl] = useState(null)
    const [thumbnailOption, setThumbnailOption] = useState("keep")
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(productSchema)
    })
    useEffect(() => {
        if (id) {

            (async () => {
                try {
                    const { data } = await instance.get(`/products/${id}`)
                    reset(data)
                    setThumbnailUrl(data.thumbnail)
                } catch (error) {
                    console.log(error.message)
                }
            })()
        }
    }, [id, reset])
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file)
        formData.append("upload_preset", VITE_UPLOAD_PRESET)
        const response = await fetch(`https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
        })
    }

    const onSubmit = async (product) => {
        try {
            let updateProduct = { ...product }
            switch(thumbnailOption){
                case "upload":
                    if(product.thumbnail && product.thumbnail[0]){
                        const thumbnailUrl = await uploadImage(product.thumbnail[0]);
                        updateProduct= {...updateProduct, thumbnail: thumbnailUrl}
                    }
                    break;
                    default:
            }
            if (id) {
                await instance.patch(`products/${id}`, updateProduct)
                toast.success("Sửa sản phẩm thành công!");
                dispatch({ type: "UPDATE_PRODUCT", payload: { id, product: updateProduct } })
                // console.log(data);
                // setProducts(res.data)
                setTimeout(() => {
                    nav("/admin")
                }, 2000)
            } else {
                const { data } = await instance.post("/products", updateProduct);
                toast.success("Thêm sản phẩm thành công!");
                dispatch({ type: "ADD_PRODUCT", payload: data })
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
            <form onSubmit={handleSubmit((data) => onSubmit({ ...data, id }))}>
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
                {/* <div className="mb-3  form-group">
                    <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
                    <input
                        type="text"
                        className="form-control"
                        id="thumbnail"
                        {...register("thumbnail")}
                    />
                    {errors.thumbnail?.message && <p className="text-danger">{errors.thumbnail?.message}</p>}
                </div> */}
                <div className="mb-3 form-group">
                    <label htmlFor="thumbnailOption" className="form-label">
                        Chọn
                    </label>
                    <select className='form-control' value={thumbnailOption} 
                    id="thumbnailOption" onChange={(e) => setThumbnailOption(e.target.value)}>
                        <option value="keep">Giữ hình cũ</option>
                        <option value="link">Dán link form Link</option>
                        <option value="upload">Gửi tệp form</option>
                    </select>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="thumbnail" className='form-label'>
                        Thumbnail
                    </label>
                    {thumbnailOption === "link" && (
                        <input type="text" className='form-control' id="thumbnail" 
                        {...register("thumbail")}
                        />
                    )}
                    {thumbnailOption === "upload" && (
                        <input type="file" className='form-control' id='thumbnail' 
                        {...register("thumbnail", {required:true})}
                        />
                    )}
                    {errors.thumbnail?.message && <p className='text-danger'>{errors.thumbnail?.message}</p>}
                </div>
                {thumbnailUrl && (
                    <img src={thumbnailUrl} alt="Product Thumbnail" style={{maxWidth:"200px", marginTop: "10px"}} />
                )}
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
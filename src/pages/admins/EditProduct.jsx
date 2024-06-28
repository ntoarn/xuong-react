// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form';
// import instance from '../../apis';
// import { useNavigate, useParams } from 'react-router-dom';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { ToastContainer, toast } from 'react-toastify';
// import Button from '../../components/Button/Button';


// const productSchema = z.object({
//     title: z.string().min(6, { message: "Title ít nhất 6 ký tự" }),
//     price: z.number().min(0, { message: "Price không được để âm" }),
//     description: z.string().min(1, { message: "Không được bỏ trống dữ liệu" }),
//     thumbnail: z.string().min(1, { message: "Không được bỏ trống dữ liệu" }),
//     brand: z.string().min(1, { message: "Không được bỏ trống dữ liệu" }),
//   });
// const EditProduct = () => {
//     const navigate = useNavigate()
//     const { 
//         register,
//         handleSubmit,
//         formState: { errors }
//     } = useForm({
//         resolver : zodResolver(productSchema)
//     });
//     const { id } = useParams();
//     const [product, setProduct] = useState({});
//     useEffect(() => {
//         (async () => {
//             const { data } = await instance.get(`/products/${id}`)
//             setProduct(data)
//         })()
//     }, [])
//     const handleEditProduct = (data) => {
//         (async () => {
//             try {
//                 const confirmValue = confirm("Bạn có muốn sửa ko");
//                 if (confirmValue) {
//                     const res = await instance.patch(`products/${id}`, data)
//                     toast.success("Sửa sản phẩm thành công!");
//                     // console.log(data);
//                     setProduct(res.data)
//                     setTimeout(() => {
//                       navigate("/admin")
//                     },2000)
//                 }
//             } catch (error) {
//                 console.log(error)
//             }
//         })()
//     }
//     const onSubmit = (data) => {
//         handleEditProduct(data)
//     }
//     return (
//         <div >
//         <form onSubmit={handleSubmit(onSubmit)} >
//           <h1>Edit Product</h1>
//           <div className="mb-3 form-group" >
//             <label htmlFor="title" className="form-label">Title</label>
//             <input
//               type="text"
//               className="form-control"
//               id="title"
//               {...register("title")}
//               defaultValue={product?.title}
//             />
//             {errors.title && <p className="text-danger">{errors.title.message}</p>}
//           </div>
//           <div className="mb-3 form-group">
//             <label htmlFor="price" className="form-label">Price</label>
//             <input
//               type="number"
//               className="form-control"
//               id="price"
//               {...register("price", { valueAsNumber: true })}
//               defaultValue={product?.price}
//             />
//             {errors.price && <p className="text-danger">{errors.price.message}</p>}
//           </div>
//           <div className="mb-3 form-group">
//             <label htmlFor="description" className="form-label">Description</label>
//             <input
//               type="text"
//               className="form-control"
//               id="description"
//               {...register("description")}
//               defaultValue={product?.description}
//             />
//             {errors.description && <p className="text-danger">{errors.description.message}</p>}
//           </div>
//           <div className="mb-3 form-group">
//             <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
//             <input
//               type="text"
//               className="form-control"
//               id="thumbnail"
//               {...register("thumbnail")}
//               defaultValue={product?.thumbnail}
//             />
//             {errors.thumbnail && <p className="text-danger">{errors.thumbnail.message}</p>}
//           </div>
//           <div className="mb-3 form-group">
//             <label htmlFor="brand" className="form-label">Brand</label>
//             <input
//               type="text"
//               className="form-control"
//               id="brand"
//               {...register("brand")}
//               defaultValue={product?.brand}
//             />
//             {errors.brand && <p className="text-danger">{errors.brand.message}</p>}
//           </div>
//           <Button type="submit">Submit</Button>
//         </form>
//         <ToastContainer />
//       </div>
//     )
// }

// export default EditProduct

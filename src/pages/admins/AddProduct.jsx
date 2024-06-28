// import './form.scss'
// import React, { useEffect, useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import instance from '../../apis';
// import { useNavigate } from 'react-router-dom';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import {ToastContainer, toast } from 'react-toastify';
// import Button from './../../components/Button/Button';


// const productSchema = z.object({
//   title: z.string().min(6, { message: "Title ít nhất 6 ký tự" }),
//   price: z.number().min(0, { message: "Price không được để âm" }),
//   description: z.string().min(1, { message: "Không được bỏ trống dữ liệu" }),
//   thumbnail: z.string().min(1, { message: "Không được bỏ trống dữ liệu" }),
//   brand: z.string().min(1, { message: "Không được bỏ trống dữ liệu" }),
// });

// const AddProduct = () => {

//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(productSchema),
//   });

//   const [products, setProducts] = useState([]);

//   const handleAddProduct = async (data) => {
//     try {
//       const confirmValue = confirm("Add product successfully?");
//       if (confirmValue) {
//         const res = await instance.post("/products", data);
//         toast.success("Thêm sản phẩm thành công!");
//         setProducts([...products, res.data]);
//         // showSuccess();
//         setTimeout(() => {
//           navigate("/admin");
//         },2000)
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const onSubmit = (data) => {
//     handleAddProduct(data);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <h1>Add Product</h1>
//         <div className="mb-3  form-group">
//           <label htmlFor="title" className="form-label">Title</label>
//           <input
//             type="text"
//             className="form-control"
//             id="title"
//             {...register("title")}
//           />
//           {errors.title && <p className="text-danger">{errors.title.message}</p>}
//         </div>
//         <div className="mb-3  form-group">
//           <label htmlFor="price" className="form-label">Price</label>
//           <input
//             type="number"
//             className="form-control"
//             id="price"
//             {...register("price", { valueAsNumber: true })}
//           />
//           {errors.price && <p className="text-danger">{errors.price.message}</p>}
//         </div>
//         <div className="mb-3  form-group">
//           <label htmlFor="description" className="form-label">Description</label>
//           <input
//             type="text"
//             className="form-control"
//             id="description"
//             {...register("description")}
//           />
//           {errors.description && <p className="text-danger">{errors.description.message}</p>}
//         </div>
//         <div className="mb-3  form-group">
//           <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
//           <input
//             type="text"
//             className="form-control"
//             id="thumbnail"
//             {...register("thumbnail")}
//           />
//           {errors.thumbnail && <p className="text-danger">{errors.thumbnail.message}</p>}
//         </div>
//         <div className="mb-3  form-group">
//           <label htmlFor="brand" className="form-label">Brand</label>
//           <input
//             type="text"
//             className="form-control"
//             id="brand"
//             {...register("brand")}
//           />
//           {errors.brand && <p className="text-danger">{errors.brand.message}</p>}
//         </div>
//         <Button type="submit">Submit</Button>
//       </form>
//         <ToastContainer />
//     </div>
//   );
// };

// export default AddProduct;
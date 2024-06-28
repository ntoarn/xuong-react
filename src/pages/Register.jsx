// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import instance from '../apis';
// import Button from './../components/Button/Button';

// const userSchema = z.object({
//   email: z.string().email({ message: "Không đúng định dạng" }),
//   username: z.string().min(6, { message: "Ít nhất 6 ký tự" }),
//   password: z.string().min(6, { message: "Ít nhất 6 ký tự" }),
// });

// const Register = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(userSchema),
//   });

//   const onSubmit = async (data) => {
//     try {
//         const res = await instance.post("/register", data);
//         console.log(res.data);
//         if (res.data) {
//           toast.success("Đăng ký account thành công");
//           setTimeout(() => {
//             navigate("/login");
//           }, 2000);
//         }
      
//     } catch (error) {
//       console.log(error);
//       toast.error("Đăng ký thất bại  !!!");
//     }
//   };
  
//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <h1>Register</h1>
//         <div className="mb-3 form-group">
//           <label htmlFor="email" className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             {...register("email")}
//           />
//           {errors.email && <p className="text-danger">{errors.email.message}</p>}
//         </div>
//         <div className="mb-3 form-group">
//           <label htmlFor="username" className="form-label">Tên đăng nhập</label>
//           <input
//             type="text"
//             className="form-control"
//             id="username"
//             {...register("username")}
//           />
//           {errors.username && <p className="text-danger">{errors.username.message}</p>}
//         </div>
//         <div className="mb-3 form-group">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             {...register("password")}
//           />
//           {errors.password && <p className="text-danger">{errors.password.message}</p>}
//         </div>
        
//         <Button width="100%" type="submit">Đăng ký</Button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Register;

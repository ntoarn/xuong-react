import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Button from '../Button/Button';
import instance from './../../apis/index';
import { loginSchema, registerSchema } from './../../validations/authSchema';

const AuthForm = ({ isRegister }) => {
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(isRegister ? registerSchema : loginSchema)
    })
    const onSubmit = (data) => {
        (async () => {
            try {
                if (isRegister) {
                    const res = await instance.post("/register", data);
                    if (res.data) {
                        toast.success("Đăng ký account thành công");
                        setTimeout(() => {
                            nav("/login");
                        }, 2000);
                    } else {
                        throw new Error("Đăng ký thất bại");
                    }
                } else {
                    const res = await instance.post("/login", data);
                    if (res.data) {
                        localStorage.setItem("user", JSON.stringify(res.data));
                        toast.success("Đăng nhập thành công");
                        setTimeout(() => {
                            nav("/");
                        }, 2000);
                    } else {
                        throw new Error("Đăng nhập thất bại");
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error("Đăng ký thất bại");
                } else if (error.response && error.response.status === 401) {
                    toast.error("Đăng nhập thất bại");
                } else {
                    toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
                }
                console.log(error.message);
            }
        })()
    }
    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3 form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className='form-control' id="email"
                            {...register("email", { required: true })}
                        />
                        {errors.email?.message && <p className="text-danger">{errors.email?.message}</p>}
                    </div>
                    {isRegister && (
                        <div className="mb-3 form-group">
                            <label htmlFor="name" className="form-label">User Name</label>
                            <input type="text" className='form-control' id="name"
                                {...register("name", { required: true })}
                            />
                            {errors.name?.message && <p className="text-danger">{errors.name?.message}</p>}
                        </div>
                    )}
                    <div className="mb-3 form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input type="password" className="form-control" id="password" {...register("password", { required: true })} />
                        {errors.password?.message && <p className="text-danger">{errors.password?.message}</p>}
                    </div>
                    {isRegister && (
                        <div className="mb-3 form-group">
                            <label htmlFor="confirmPass" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className='form-control'
                                id="confirmPass"
                                {...register("confirmPass", { required: true })}
                            />
                            {errors.confirmPass?.message && <p className="text-danger">{errors.confirmPass?.message}</p>}
                        </div>
                    )}
                    <Button type="submit">
                        {isRegister ? "Register" : "Login"}
                    </Button>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default AuthForm
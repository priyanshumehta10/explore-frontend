import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { login } from '../store/authSlice.js';

function Signup() {
    // const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const [avatar, setAvatar] = useState(null); // State to hold the avatar file

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setAvatar(file); // Store the selected file in state
    };

    const create = async (data) => {
        setError("");
        try {
            // Create a FormData object to append form fields and the file
            const formData = new FormData();
            formData.append("fullName", data.fullName);
            formData.append("username", data.username);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("avatar", avatar); // Append the avatar file

            // Send the form data to the server
            const userData = await axios.post("http://localhost:8000/api/v1/users/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if(userData){
                dispatch(login(userData))
            }

            // Handle successful registration (e.g., navigate to login, dispatch action, etc.)
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    {/* <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link> */}
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("fullName", { required: true })}
                        />
                        <Input
                            label="Username: "
                            placeholder="Enter Username"
                            {...register("username", { required: true })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                        />
                        <Input
                            label="Avatar"
                            type="file"
                            {...register("avatar", { required: true })}
                            onChange={handleFileChange}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;

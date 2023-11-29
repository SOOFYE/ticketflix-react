import React, { useState,useContext  } from 'react';
import { useForm, Controller } from 'react-hook-form';
import "../../assets/Lgsignpop.css"

import MyContext from '../../MyContext';

import axios from "axios"
import { toast } from 'react-toastify';
import RotateSpinner from '../../components/RotateSpinner';

import Cookies from 'js-cookie';

const LoginSignupPopup = ({ isVisible, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);  // Toggle between Login and Signup
    const { control, handleSubmit, reset, formState: { errors } } = useForm();
    const [isBLoading, setBLoading] = useState(false)

    const context = useContext(MyContext);

    const onSubmit = async(data) => {

        if(isBLoading) return;

        setBLoading(true)

        try{
           if (isLogin) {
            console.log("Login data:", data);

            const toSend = {
                email: data.email,
                password: data.password,
            }

            const response = await axios.post("https://cinemareservationsystemapi.azurewebsites.net/api/Users/login",toSend,{
                withCredentials: true
              })
            console.log(response)
           
                context.setisLoggedIn(true);
                context.setUserName(response.data.userId.toString())
                context.setRole(response.data.role)
                context.setName(response.data.name)
                const endOfDay = new Date();
                endOfDay.setHours(23, 59, 59, 999); // Set the time to the end of the current day
                Cookies.set('token',response.data.token, { expires: endOfDay, path: '/' });
                toast.success('Login Successfull')
                onClose()
           
            console.log(context)
           
        } else {
            console.log("Login data:", data);

            const toSend = {
                name: data.name,
                email: data.email,
                password: data.password,
                isAdmin:false
            }

            const response = await axios.post("https://cinemareservationsystemapi.azurewebsites.net/api/Users",toSend,{
                withCredentials: true
              })
            console.log(response)
            if(response.status===201){
                context.setisLoggedIn(true);
                context.setUserName(response.data.userId.toString())
                context.setRole(response.data.role)
                context.setName(response.data.name)
                const endOfDay = new Date();
                endOfDay.setHours(23, 59, 59, 999); // Set the time to the end of the current day
                Cookies.set('token',response.data.token, { expires: endOfDay, path: '/' });
                toast.success('Signup Successfull')
                onClose()
            }
           
          
        }  


        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
        }

        setBLoading(false) 
       
    };

    if (!isVisible) return null;

    return (
        <div className="popupWrapper">
        
            <div className="popupContent">
            
                <h2 id='logTitle'>{isLogin ? "Login" : "Sign Up"}</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                <button onClick={onClose} className="closeButton">X</button>
                
                {!isLogin && (
                    
                    <>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Name is required",
                           
                        }}
                        render={({ field }) => (
                            <input id='loginput' {...field} placeholder="Name" />
                        )}
                    />
                    {errors.name && <p className='text-red-700'>{errors.name.message}</p>}
                    </> 
                )}


                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Email Address is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address format"
                            }
                        }}
                        render={({ field }) => (
                            <input id='loginput' {...field} placeholder="Email Address" />
                        )}
                    />
                    {errors.email && <p className='text-red-700'>{errors.email.message}</p>}

                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Password is required" }}
                        render={({ field }) => (
                            <input id='loginput' {...field} type="password" placeholder="Password" />
                        )}
                    />
                    {errors.password && <p className='text-red-700'>{errors.password.message}</p>}

                    {!isLogin && (
                        <>
                            <Controller
                                name="rePassword"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Please confirm your password" }}
                                render={({ field }) => (
                                    <input {...field} type="password" placeholder="Re-enter Password" />
                                )}
                            />
                            {errors.rePassword && <p className='text-red-700'>{errors.rePassword.message}</p>}
                        </>
                    )}

                    <button className='logbutton flex justify-center items-center' type="submit">{isBLoading ? <RotateSpinner/> :isLogin ? "Login" : "Sign Up"}</button>
                </form>

                <p className='asking' onClick={() => { setIsLogin(!isLogin); reset(); }}>
                    { isLogin  ? "Need an account? Sign Up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default LoginSignupPopup;

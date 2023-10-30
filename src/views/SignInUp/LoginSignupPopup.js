import React, { useState,useContext  } from 'react';
import { useForm, Controller } from 'react-hook-form';
import "../../assets/Lgsignpop.css"

import MyContext from '../../MyContext';

import axios from "axios"
import { toast } from 'react-toastify';

const LoginSignupPopup = ({ isVisible, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);  // Toggle between Login and Signup
    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    const context = useContext(MyContext);

    const onSubmit = async(data) => {

        try{
           if (isLogin) {
            console.log("Login data:", data);

            const toSend = {
                email: data.email,
                password: data.password,
            }

            const response = await axios.post("https://cinemareservationsystemapi.azurewebsites.net/api/Users/login",toSend)
            console.log(response)
            if(response.status===200){
                context.setisLoggedIn(true);
                context.setUserName(response.data.userId)
                context.setRole(response.data.role)
                toast.success('Login Successfull')
                onClose()
            }
           
        } else {
            console.log("Login data:", data);

            const toSend = {
                id: data.email,
                email: data.email,
                password: data.password,
                isAdmin:false
            }

            const response = await axios.post("https://cinemareservationsystemapi.azurewebsites.net/api/Users",toSend)
            console.log(response)
            if(response.status===201){
                context.setisLoggedIn(true);
                context.setUserName(response.data.userId)
                context.setRole(response.data.role)
                toast.success('Signup Successfull')
                onClose()
            }
           
          
        }  


        }catch(error){
            toast.error(error.response.data.message)
        }
       
    };

    if (!isVisible) return null;

    return (
        <div className="popupWrapper">
        
            <div className="popupContent">
            
                <h2 id='logTitle'>{isLogin ? "Login" : "Sign Up"}</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                <button onClick={onClose} className="closeButton">X</button>
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
                    {errors.email && <p>{errors.email.message}</p>}

                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Password is required" }}
                        render={({ field }) => (
                            <input id='loginput' {...field} type="password" placeholder="Password" />
                        )}
                    />
                    {errors.password && <p>{errors.password.message}</p>}

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
                            {errors.rePassword && <p>{errors.rePassword.message}</p>}
                        </>
                    )}

                    <button className='logbutton' type="submit">{isLogin ? "Login" : "Sign Up"}</button>
                </form>

                <p className='asking' onClick={() => { setIsLogin(!isLogin); reset(); }}>
                    {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default LoginSignupPopup;

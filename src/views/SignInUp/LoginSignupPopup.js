import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import "../../assets/Lgsignpop.css"

const LoginSignupPopup = ({ isVisible, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);  // Toggle between Login and Signup
    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        if (isLogin) {
            console.log("Login data:", data);
            // Handle login
        } else {
            console.log("Signup data:", data);
            // Handle signup
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
                        name="phoneNumber"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Phone number is required" }}
                        render={({ field }) => (
                            <input {...field} placeholder="Phone Number" />
                        )}
                    />
                    {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Password is required" }}
                        render={({ field }) => (
                            <input {...field} type="password" placeholder="Password" />
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

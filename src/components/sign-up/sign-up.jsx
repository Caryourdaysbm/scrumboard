import React from 'react';
import "./sign-up.css";
import content  from '../../static/index';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Link } from 'react-router-dom';

const schema = yup.object().shape(
    {
        fullname: yup.string().required().min(6),
        email: yup.string().required("please enter email"),
        password: yup.string().required("please enter password").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must contain at least eight characters, at least one letter, one number and one special character")
    }
);

const SignUp = () => {
   const {register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    }); 

    const onSubmit = (data) => console.log(data)

    return (
    <div className='sign-up'>
        <h1>Don't have an account?</h1>
        <h3>Sign up here!</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            {content.input.slice(0,3).map((input, key) => {
                return (
                    <div key={key}>
                        <label htmlFor={input.name}>{input.label}</label><br />
                        <input type={input.type} name={input.name} placeholder={input.placeholder} {...register(input.name)}/>
                        <span className='message'>{errors[input.name]?.message}</span><br />
                        <br />
                    </div>
                )
            }
            )}
            

            <label for="options">User Type</label> 
                <select name="options" id="options">
                    <option value="developer">Developer</option>
                    <option value="Owner">Owner</option>
                </select>
            
            <button>SIGN UP</button>

        </form>
        <p>Have an account? <Link to='/signin'>Sign In</Link></p>
        <p><Link to='/'>Back to home</Link></p>
    </div>
)
}
export default SignUp;

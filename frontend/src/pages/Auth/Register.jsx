import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import { toast } from 'react-toastify';
import Loader from '../../components/Loader.jsx';
import { useRegisterMutation } from '../../redux/api/usersApiSlice.js';

export const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [register, { isLoading }] = useRegisterMutation()
    const { userInfo } = useSelector(state => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        } [navigate, redirect, userInfo]
    })

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Password not mathched')
        } else {
            try {
                const res = await register({ username, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate(redirect)
                toast.success('user successfully registered')
            } catch (error) {
                console.log(error)
                toast.error(error.data.message)
            }
        }
    }

    return (
        <section className='flex flex-col md:flex-row items-start justify-between px-[10rem]'>
            <div className='mr-[4rem] mt-[5rem]'>
                <h1 className="text-2xl font-semibold mb-4">Register</h1>
                <form onSubmit={submitHandler} className='container w-[40rem]'>
                    <div className="my-[2rem]">
                        <label htmlFor="name" className='block text-sm font-medium text-black'>
                            Name
                        </label>
                        <input type="text" id='name' className='mt-1 p-2 border border-rounded w-full' placeholder='Enter name'
                            value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="email" className='block text-sm font-medium text-black'>
                            Email Address
                        </label>
                        <input type="email" id='email' className='mt-1 p-2 border border-rounded w-full' placeholder='Enter email'
                            value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="password" className='block text-sm font-medium text-black'>
                            Password
                        </label>
                        <input type="password" id='password' className='mt-1 p-2 border border-rounded w-full' placeholder='Enter password'
                            value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="my-[2rem]">
                        <label htmlFor="confirmpassword" className='block text-sm font-medium text-black'>
                            Confirm Password
                        </label>
                        <input type="password" id='confirmpassword' className='mt-1 p-2 border border-rounded w-full' placeholder='Confirm your password'
                            value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <button disabled={isLoading} type='submit' className='bg-pink-500 text-black px-4 py-2 
                       cursor-pointer my-[1rem]'>{isLoading ? "Registering..." : "Register"}</button>
                    {isLoading && <Loader />}
                </form>
                <div className="mt-4">
                    <p className='text-black'>
                        Already have an Account ? {" "}
                        <Link to={redirect ? `/login?redirect=${redirect}` : `/login`} className='text-pink-500 hover:underline'>Login</Link>
                    </p>
                </div>
            </div>
            <img
                src="https://images.unsplash.com/photo-1555529669-2269763671c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNob3BwaW5nfGVufDB8fDB8fHww"
                alt="Login Shopping img"
                className="h-sreen w-[45%] hidden md:block rounded-lg object-cover"
            />

        </section>
    )
}

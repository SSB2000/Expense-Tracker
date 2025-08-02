import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const navigate = useNavigate();
  
  // Handle Login form submit.

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back.</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Pleas enter your details to login.
        </p>

        <form onSubmit={handleLogin}>
          <Input 
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label='Email Address'
            placeholder='rahul@exmple.com'
            type='text'
          />
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login;
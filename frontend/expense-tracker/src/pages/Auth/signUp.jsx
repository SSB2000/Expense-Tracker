import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/inputs/input';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';

export const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  return (
    <div>signUp</div>
  )
}

export default SignUp
// admin-login.js
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import toast, { Toaster } from 'react-hot-toast';


const AdminLogin = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Perform authentication logic here
    // For simplicity, I'll just check if username and password are not empty
    if (email == 'document@aziz.com' && password== 'production3223') {
      // Store login info in local storage
      localStorage.setItem('isLoggedIn', 'true');
      // Redirect to dashboard
      router.push('/dashboard');
    }else{
        toast.error("Please Try Again")
    }
  };


 

  return (
    <div className='calling'>
      <div className='login'>
        <h3 className='text-center'>Login</h3>
      <input className='w-100 my-3 border py-2 px-2 feild' type="email" placeholder="Email" value={email} onChange={(e) => setUsername(e.target.value)} required/>
      <input className='w-100 my-3 border py-2 px-2 feild' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      <button className='w-100 btn btn-primary' onClick={handleLogin}>Login</button>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminLogin;

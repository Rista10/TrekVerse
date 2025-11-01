'use client'

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface FormData {
  fullName: string;
  phoneNo: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  fullName?: string;
  phoneNo?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface Message {
  type: 'success' | 'error' | '';
  text: string;
}

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNo: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState<Message>({ type: '', text: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    
    if (!isLogin && !formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!isLogin && !formData.phoneNo.trim()) {
      newErrors.phoneNo = 'Phone number is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!isLogin && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    if (!validateForm()) return;

    try {
      const endpoint = isLogin ? 'http://localhost:3000/api/auth/login' : 'http://localhost:3000/api/auth/signup';
      const body = isLogin 
        ? { email: formData.email, password: formData.password, remember: rememberMe }
        : { 
            fullName: formData.fullName, 
            phoneNo: formData.phoneNo, 
            email: formData.email, 
            password: formData.password,
            confirmPassword: formData.confirmPassword 
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        if (!isLogin) {
          setTimeout(() => setIsLogin(true), 2000);
        }
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: '',
      phoneNo: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white" >
        <div className="fixed inset-0 z-0">
                <Image
                  src="/frames/frame_0192.png"
                  alt="Mountain background"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
      <div className="w-full max-w-md ">
        <div className="bg-background/50 backdrop-blur-md border-muted  rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 pb-6" >
            <h2 className="text-3xl font-bold text-center" style={{ color: '54414E' }}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-center mt-2" style={{ color: '#875C74' }}>
              {isLogin ? 'Login to continue' : 'Sign up to get started'}
            </p>
          </div>

          <div className="p-8">
            {message.text && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message.text}
              </div>
            )}

            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: '#54414E' }}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#875C74' }} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
                    style={{ 
                      borderColor: errors.fullName ? '#ef4444' : '#B7C8B5',
                      backgroundColor: '#fafafa'
                    }}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
            )}

            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: '#54414E' }}>
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#875C74' }} />
                  <input
                    type="tel"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
                    style={{ 
                      borderColor: errors.phoneNo ? '#ef4444' : '#B7C8B5',
                      backgroundColor: '#fafafa'
                    }}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phoneNo && <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: '#54414E' }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#875C74' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
                  style={{ 
                    borderColor: errors.email ? '#ef4444' : '#B7C8B5',
                    backgroundColor: '#fafafa'
                  }}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: '#54414E' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#875C74' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-all"
                  style={{ 
                    borderColor: errors.password ? '#ef4444' : '#B7C8B5',
                    backgroundColor: '#fafafa'
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? 
                    <EyeOff className="w-5 h-5" style={{ color: '#875C74' }} /> : 
                    <Eye className="w-5 h-5" style={{ color: '#875C74' }} />
                  }
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: '#54414E' }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#875C74' }} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-all"
                    style={{ 
                      borderColor: errors.confirmPassword ? '#ef4444' : '#B7C8B5',
                      backgroundColor: '#fafafa'
                    }}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? 
                      <EyeOff className="w-5 h-5" style={{ color: '#875C74' }} /> : 
                      <Eye className="w-5 h-5" style={{ color: '#875C74' }} />
                    }
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 w-4 h-4 rounded"
                    style={{ accentColor: '#875C74' }}
                  />
                  <span className="text-sm" style={{ color: '#54414E' }}>Remember me</span>
                </label>
                <a href="#" className="text-sm hover:underline" style={{ color: '#875C74' }}>
                  Forgot password?
                </a>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #875C74 0%, #A790A5 100%)' }}
            >
              {isLogin ? 'Login' : 'Sign Up'}
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm" style={{ color: '#54414E' }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="ml-2 font-medium hover:underline"
                  style={{ color: '#875C74' }}
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-white opacity-80">
          © 2024 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthPages;
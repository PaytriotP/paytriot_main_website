'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Input, Button, Loading, Card, Text, Tooltip } from '@nextui-org/react'
import { InfoIcon as InfoCircle, CheckCircle } from 'lucide-react'

// Form field type
type FormValues = {
  fullName: string;
  email: string;
  website: string;
  password: string;
  repeatPassword: string;
  phoneNumber: string;
};

export default function SignupForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError: setFormError,
    clearErrors
  } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      website: '',
      password: '',
      repeatPassword: '',
      phoneNumber: '',
    },
  })

  const password = watch('password')
  const repeatPassword = watch('repeatPassword')

  // Check if passwords match
  useEffect(() => {
    if (repeatPassword && password !== repeatPassword) {
      setFormError('repeatPassword', {
        type: 'manual',
        message: "Passwords don't match"
      })
    } else if (repeatPassword) {
      clearErrors('repeatPassword')
    }
  }, [password, repeatPassword, setFormError, clearErrors])

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    setPasswordStrength(strength)
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch('https://hooks.zapier.com/hooks/catch/15891653/2lq4i5f/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Form submission failed. Please try again.')
      }
      
      setIsSuccess(true)
      reset()
      
      // Redirect after successful submission
      setTimeout(() => {
        router.push('/')
      }, 5000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="signup py-5">
      <div className="container d-flex flex-column align-items-center">
        <Card css={{ maxWidth: '500px', width: '100%' }}>
          <Card.Header className="text-center">
            <div className="w-100">
              <Text h3 className="text-center mb-2">Create Your Paytriot Account</Text>
              <Text className="text-center text-gray-500">
                Join thousands of businesses using Paytriot
              </Text>
            </div>
          </Card.Header>
          <Card.Body>
            {isSuccess ? (
              <div className="text-center d-flex flex-column align-items-center gap-3">
                <div className="d-flex justify-content-center">
                  <CheckCircle size={64} className="text-success" />
                </div>
                <Text h4 className="text-success">Account Created Successfully!</Text>
                <Text>Thank you for signing up with Paytriot. You will be redirected to the homepage in 5 seconds.</Text>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
                <div>
                  <Input
                    rounded
                    size="lg"
                    fullWidth
                    label="Full Name"
                    placeholder="John Smith"
                    status={errors.fullName ? 'error' : undefined}
                    {...register('fullName', { 
                      required: 'Full name is required',
                      minLength: {
                        value: 2,
                        message: 'Full name must be at least 2 characters'
                      }
                    })}
                  />
                  {errors.fullName && (
                    <Text color="error" size="sm" className="mt-1">
                      {errors.fullName.message}
                    </Text>
                  )}
                </div>
                
                <div>
                  <Input
                    rounded
                    size="lg"
                    fullWidth
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    status={errors.email ? 'error' : undefined}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <Text color="error" size="sm" className="mt-1">
                      {errors.email.message}
                    </Text>
                  )}
                </div>

                <div>
                  <Input
                    rounded
                    size="lg"
                    fullWidth
                    type="tel"
                    label="Phone Number"
                    placeholder="+44 (555) 123-4567"
                    status={errors.phoneNumber ? 'error' : undefined}
                    {...register('phoneNumber', { 
                      required: 'Phone number is required',
                      minLength: {
                        value: 5,
                        message: 'Please enter a valid phone number'
                      }
                    })}
                  />
                  {errors.phoneNumber && (
                    <Text color="error" size="sm" className="mt-1">
                      {errors.phoneNumber.message}
                    </Text>
                  )}
                </div>
                
                <div>
                  <Input
                    rounded
                    size="lg"
                    fullWidth
                    type="url"
                    label="Website"
                    placeholder="https://yourwebsite.com"
                    status={errors.website ? 'error' : undefined}
                    {...register('website', { 
                      required: 'Website is required',
                      pattern: {
                        value: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
                        message: 'Please enter a valid website URL'
                      }
                    })}
                  />
                  {errors.website && (
                    <Text color="error" size="sm" className="mt-1">
                      {errors.website.message}
                    </Text>
                  )}
                </div>
                
                <div>
                  <div className="position-relative">
                    <Input
                      rounded
                      size="lg"
                      fullWidth
                      type="password"
                      label="Password"
                      placeholder="••••••••"
                      status={errors.password ? 'error' : undefined}
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        },
                        onChange: (e) => checkPasswordStrength(e.target.value)
                      })}
                    />
                    <Tooltip content="Password should be at least 6 characters">
                      <InfoCircle 
                        size={16} 
                        className="position-absolute text-gray-500" 
                        style={{ right: '12px', top: '50%', transform: 'translateY(-50%)' }} 
                      />
                    </Tooltip>
                  </div>
                  {errors.password && (
                    <Text color="error" size="sm" className="mt-1">
                      {errors.password.message}
                    </Text>
                  )}
                  {password && (
                    <div className="mt-2">
                      <div className="d-flex gap-1" style={{ height: '4px' }}>
                        <div className={`flex-grow-1 rounded ${passwordStrength >= 1 ? 'bg-danger' : 'bg-light'}`}></div>
                        <div className={`flex-grow-1 rounded ${passwordStrength >= 2 ? 'bg-warning' : 'bg-light'}`}></div>
                        <div className={`flex-grow-1 rounded ${passwordStrength >= 3 ? 'bg-info' : 'bg-light'}`}></div>
                        <div className={`flex-grow-1 rounded ${passwordStrength >= 4 ? 'bg-success' : 'bg-light'}`}></div>
                      </div>
                      <Text size="sm" className="mt-1 text-gray-500">
                        {passwordStrength === 0 && 'Very weak'}
                        {passwordStrength === 1 && 'Weak'}
                        {passwordStrength === 2 && 'Fair'}
                        {passwordStrength === 3 && 'Good'}
                        {passwordStrength === 4 && 'Strong'}
                      </Text>
                    </div>
                  )}
                </div>
                
                <div>
                  <Input
                    rounded
                    size="lg"
                    fullWidth
                    type="password"
                    label="Repeat Password"
                    placeholder="••••••••"
                    status={errors.repeatPassword ? 'error' : undefined}
                    {...register('repeatPassword', { 
                      required: 'Please confirm your password',
                      validate: value => value === password || "Passwords don't match"
                    })}
                  />
                  {errors.repeatPassword && (
                    <Text color="error" size="sm" className="mt-1">
                      {errors.repeatPassword.message}
                    </Text>
                  )}
                </div>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                <div className="d-flex flex-column align-items-center mt-3">
                  <Button
                    rounded
                    size="xl"
                    color="warning"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100 mb-4"
                  >
                    {isSubmitting ? <Loading color="currentColor" size="sm" /> : 'Sign Up'}
                  </Button>
                </div>
              </form>
            )}
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center border-top pt-4">
            <Text size="sm" className="text-gray-500">
              Already have an account? <a href="/login" className="text-warning fw-medium">Sign In</a>
            </Text>
          </Card.Footer>
        </Card>
      </div>
    </section>
  )
}

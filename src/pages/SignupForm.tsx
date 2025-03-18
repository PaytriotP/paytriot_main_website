"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Info, Loader2 } from "lucide-react"

// Form field type
type FormValues = {
  fullName: string
  email: string
  website: string
  password: string
  repeatPassword: string
  phoneNumber: string
}

export default function SignupForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const form = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      website: "",
      password: "",
      repeatPassword: "",
      phoneNumber: "",
    },
  })

  const { watch } = form
  const password = watch("password")
  const repeatPassword = watch("repeatPassword")

  // Check if passwords match
  useEffect(() => {
    if (repeatPassword && password !== repeatPassword) {
      form.setError("repeatPassword", {
        type: "manual",
        message: "Passwords don't match",
      })
    } else if (repeatPassword) {
      form.clearErrors("repeatPassword")
    }
  }, [password, repeatPassword, form])

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
      const response = await fetch("https://hooks.zapier.com/hooks/catch/15891653/2lq4i5f/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Form submission failed. Please try again.")
      }

      setIsSuccess(true)
      form.reset()

      // Redirect after successful submission
      setTimeout(() => {
        router.push("/")
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
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Your Paytriot Account</CardTitle>
            <CardDescription>Join thousands of businesses using Paytriot</CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className="text-center space-y-4">
                <div className="d-flex justify-content-center">
                  <CheckCircle className="h-16 w-16 text-success" />
                </div>
                <h3 className="text-xl font-semibold text-success">Account Created Successfully!</h3>
                <p>Thank you for signing up with Paytriot. You will be redirected to the homepage in 5 seconds.</p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    rules={{
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Full name must be at least 2 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    rules={{
                      required: "Phone number is required",
                      minLength: {
                        value: 5,
                        message: "Please enter a valid phone number",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+44(555)1234567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    rules={{
                      required: "Website is required",
                      pattern: {
                        value:
                          /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
                        message: "Please enter a valid website URL",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input type="url" placeholder="https://yourwebsite.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="position-relative">
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                checkPasswordStrength(e.target.value)
                              }}
                            />
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info
                                    className="position-absolute end-3 top-3 text-muted"
                                    style={{ height: "16px", width: "16px" }}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Password should be at least 6 characters</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </FormControl>
                        {field.value && (
                          <div className="mt-1">
                            <div className="d-flex gap-1" style={{ height: "4px" }}>
                              <div
                                className={`flex-grow-1 rounded ${passwordStrength >= 1 ? "bg-danger" : "bg-light"}`}
                              ></div>
                              <div
                                className={`flex-grow-1 rounded ${passwordStrength >= 2 ? "bg-warning" : "bg-light"}`}
                              ></div>
                              <div
                                className={`flex-grow-1 rounded ${passwordStrength >= 3 ? "bg-info" : "bg-light"}`}
                              ></div>
                              <div
                                className={`flex-grow-1 rounded ${passwordStrength >= 4 ? "bg-success" : "bg-light"}`}
                              ></div>
                            </div>
                            <p className="small mt-1 text-muted">
                              {passwordStrength === 0 && "Very weak"}
                              {passwordStrength === 1 && "Weak"}
                              {passwordStrength === 2 && "Fair"}
                              {passwordStrength === 3 && "Good"}
                              {passwordStrength === 4 && "Strong"}
                            </p>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="repeatPassword"
                    rules={{
                      required: "Please confirm your password",
                      validate: (value) => value === password || "Passwords don't match",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repeat Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-100 btn-warning btn-lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="me-2 animate-spin" style={{ height: "16px", width: "16px" }} />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="d-flex justify-content-center border-top pt-4">
            <p className="small text-muted">
              Already have an account?{" "}
              <a href="/login" className="text-warning fw-medium">
                Sign In
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}


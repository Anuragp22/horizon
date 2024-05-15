'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { AuthFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'


const AuthForm = ({ type }: { type: string }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)

    const form = useForm<z.infer<typeof AuthFormSchema>>({
        resolver: zodResolver(AuthFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof AuthFormSchema>) {
        setIsLoading(true)
        console.log(values)
        setIsLoading(false)
    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href="/" className="cursor-pointer flex items-center gap-1">
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Horizon logo"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
                </Link>

                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ? 'Link Account' : type === 'sign-in' ? 'sign-in' : 'Sign Up'}
                        <p className='text-16 font-normal text-gray-600'>
                            {user ? 'Link your account to continue' : type === 'sign-in' ? 'Sign in to your account' : 'Create an account to get started'}
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    {/* PaidLink */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                    <CustomInput control={form.control} name='firstName' label='First Name' placeholder='Enter your first Name' />
                                    <CustomInput control={form.control} name='lastName' label='Last Name' placeholder='Enter your Last Name' />
                                    <CustomInput control={form.control} name='address' label='Last Name' placeholder='Enter your Address' />
                                    <CustomInput control={form.control} name='state' label='State' placeholder='Example: NY' />
                                    <CustomInput control={form.control} name='postalCode' label='Postal Code' placeholder='Example: 11101' />
                                    <CustomInput control={form.control} name='dob' label='Date of Birth' placeholder='YYYY-MM-DD' />
                                    <CustomInput control={form.control} name='ssn' label='SSN' placeholder='Eaxmple:1234' />
                                </>
                            )}

                            <CustomInput control={form.control} name='email' label='email' placeholder='Enter your username' />
                            <CustomInput control={form.control} name='password' label='Password' placeholder='Enter your Password' />

                            <div className='flex flex-col gap-4'>
                                <Button type="submit" disabled={isLoading} className='form-btn'>
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className='animate-spin' />&nbsp;Loading...
                                        </>
                                    ) : (type === 'sign-in' ? 'Sign In' : 'Sign Up')}
                                </Button>
                            </div>

                        </form>
                    </Form>
                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>
                            {type === 'sign-in' ? 'Don’t have an account?' : 'Already have an account?'}
                        </p><Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm
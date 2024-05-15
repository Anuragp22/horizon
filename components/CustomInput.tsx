import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { AuthFormSchema } from '@/lib/utils';

interface CustomInput {
    control: Control<z.infer<typeof AuthFormSchema>>
    name: FieldPath<z.infer<typeof AuthFormSchema>>;
    label: string;
    placeholder: string;
}

const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='for-item'>
                    <FormLabel className='form-label'>{label}</FormLabel>
                    <div className='flex w-full'>
                        <FormControl>
                            <Input
                                {...field}
                                type={name === 'password' ? 'password' : 'text'}
                                placeholder={placeholder}
                                className='input-class'
                            />
                        </FormControl>
                    </div>
                    <FormMessage className='form-message mt-2' />
                </div>
            )}
        />
    )
}

export default CustomInput
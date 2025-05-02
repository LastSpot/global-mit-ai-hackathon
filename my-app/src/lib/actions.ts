"use server"

import { z } from 'zod';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
})

export async function login(
  prevState: string | undefined,
  formData: FormData,
) {
  const supabase = await createClient()

  const validatedFields = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!validatedFields.success) {
    return 'Missing fields. Failed to Login.';
  }

  const { email, password } = validatedFields.data;
  const data = {
    email: email as string,
    password: password as string,
  }

  const { data: user, error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    return error.message
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function signup(
  prevState: string | undefined,
  formData: FormData,
) {
  const supabase = await createClient()

  const validatedFields = signupSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })
  if (!validatedFields.success) {
    return 'Missing fields. Failed to Login.';
  }

  const { email, password, confirmPassword } = validatedFields.data;
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  const data = {
    email: email as string,
    password: password as string,
  }

  const { data: user, error } = await supabase.auth.signUp(data)
  if (error) {
    return error.message
  }

  await supabase.auth.updateUser({
    data: { 
      user_metadata: {
        display_name: user.user?.email?.split('@')[0] as string,
      },
    },
  })

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    return error.message
  }
  return user
}
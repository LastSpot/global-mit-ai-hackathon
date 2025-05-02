"use server"

import { z } from 'zod';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { 
  createClient, 
  createAdminClient 
} from '@/utils/supabase/server'

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
  
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        display_name: email?.split('@')[0] as string,
        assessment_done: false,
      }
    }
  })
  if (error) {
    return error.message
  }

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

export async function deleteProfile() {
  const supabase = await createClient()
  const supabaseAdmin = await createAdminClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    return error.message
  }
  const identities = await supabase.auth.getUserIdentities()
  const idToDelete = identities.data?.identities.find(
    identity => identity.id === user?.id
  )
  if (idToDelete) {
    const { data: deleteData, error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(idToDelete.id)
    if (deleteError) {
      return deleteError.message
    }
    console.log(deleteData)
  }
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function assessmentDone(dominantTraits: string[] = []) {
  const supabase = await createClient()
  
  // First verify the user is authenticated with getUser()
  const { data: { user }, error: getUserError } = await supabase.auth.getUser()
  
  if (getUserError) {
    console.error("Authentication error:", getUserError)
    return getUserError.message
  }
  
  if (!user) {
    console.error("No authenticated user found")
    return "You must be logged in to complete the assessment"
  }

  console.log("Updating user with dominant traits:", dominantTraits)
  
  // Now update the user metadata
  const { error: updateError } = await supabase.auth.updateUser({
    data: { 
      assessment_done: true,
      dominant_traits: dominantTraits,
    },
  })
  
  if (updateError) {
    console.error("Update error:", updateError)
    return updateError.message
  }
  
  revalidatePath('/dashboard')
  redirect('/dashboard')
}
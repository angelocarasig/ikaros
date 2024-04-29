'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

import { LoginForm } from '@/schemas/login.schema';
import { SignupForm } from '@/schemas/signup.schema';

export async function login(data: LoginForm) {
	console.log("Signing in user with data: ", data);
	const supabase = createClient();

	const { error } = await supabase.auth.signInWithPassword(data);

	console.log('Error Occurred when signing in!', error);
	if (error) {
		return error.message;
	}

	revalidatePath('/', 'layout');
	redirect('/');
}

export async function signup(data: SignupForm) {
	console.log("Registering user with data: ", data);
	const supabase = createClient();

	const signupForm = {
		email: data.email,
		password: data.password
	}
	
	const { error } = await supabase.auth.signUp(data);

	if (error) {
		redirect('/error');
	}

	revalidatePath('/', 'layout');
	redirect('/dashboard');
}

export async function logout() {
	console.log("Signing out user: ");
	
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
		redirect('/error');
	}

	revalidatePath('/', 'layout');
	redirect('/');
}
import { SupabaseClient } from '@supabase/supabase-js';
import { VITE_SCOPES } from '@Utils/constants/genericConstants';

export const SignInWithOAuth = async (supabase: SupabaseClient) => {
	console.log('signing in withg OAuth!');
	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: 'http://localhost:4173/home',
			scopes: VITE_SCOPES,
		},
	});
	return { error };
};

'use client'
import { FC } from 'react'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@nextui-org/react'

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const supabase = createClient()

	async function signUpNewUser() {
		const { data, error } = await supabase.auth.signUp({
			email: 'asherman.ca@yahoo.com',
			password: 'password',
			options: {
				emailRedirectTo: 'http://localhost:3000',
			},
		})
	}

	return (
		<div className='flex flex-col gap-4'>
			Signin
			<Button onClick={signUpNewUser}>Sign Up</Button>
		</div>
	)
}

export default page

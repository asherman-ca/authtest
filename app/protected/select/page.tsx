import { createClient } from '@/utils/supabase/server'
import { FC } from 'react'
import { prisma } from '@/lib/prisma'

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
	const supabase = createClient()

	const user = await supabase.auth.getUser()

	if (!user.data.user) {
		throw new Error('You must be logged in to create a row')
	}

	const userId = user.data.user.id

	const res = await prisma.test.findMany({
		where: {
			user_id: userId,
		},
	})

	console.log('res', res)

	// const { data, error } = await supabase
	// 	.from('Test')
	// 	.select(`*, TestChild (*)`)
	// 	.eq('user_id', userId)

	// console.log('data', data)

	return <div>page</div>
}

export default page

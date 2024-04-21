'use client'
import { Button } from '@nextui-org/react'
import { FC } from 'react'

import { createClient } from '@/utils/supabase/client'
import { prisma } from '@/lib/prisma'

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const supabase = createClient()

	const createRow = async () => {
		const user = await supabase.auth.getUser()

		if (!user.data.user) {
			throw new Error('You must be logged in to create a row')
		}

		const userId = user.data.user.id

		if (!userId) {
			throw new Error('You must be logged in to create a row')
		}

		const { data, error } = await supabase
			.from('Test')
			.insert({
				desc: 'Test',
				truthy: true,
			})
			.select()

		// prisma can only run the server or server components
		// const res = prisma.test.create({
		// 	data: {
		// 		desc: 'Test',
		// 		truthy: true,
		// 	},
		// })

		// console.log('res', res)
	}

	return (
		<div>
			<Button onClick={createRow}>Create Row</Button>
		</div>
	)
}

export default page

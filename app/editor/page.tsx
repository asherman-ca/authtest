import dynamic from 'next/dynamic'
import { FC } from 'react'

const ImageEditor = dynamic(() => import('./components/Editor'), {
	loading: () => <p>Loading...</p>,
	ssr: false,
})

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	return (
		<div className='w-full p-8'>
			<ImageEditor />
		</div>
	)
}

export default page

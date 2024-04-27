'use client'
import React, { useState } from 'react'
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor'
import { decode } from 'base64-arraybuffer'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { useToast } from '@/components/ui/use-toast'

export default function Editor() {
	const supabase = createClient()
	const { toast } = useToast()
	const [isImgEditorShown, setIsImgEditorShown] = useState(false)
	const [loading, setLoading] = useState(false)
	const [showUploader, setShowUploader] = useState<boolean>(true)
	const [imageUrl, setImageUrl] = useState<string>('')
	const [filePath, setFilePath] = useState<string>('')
	const [thing, setThing] = useState(false)

	const openImgEditor = () => {
		setIsImgEditorShown(true)
	}
	const closeImgEditor = () => {
		setIsImgEditorShown(false)
	}

	// const serverUpload = async (file: any) => {
	// 	console.log('file', file)
	// 	const response = await fetch('/api/image', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({ data: file }),
	// 	})

	// 	const data = await response.json()
	// 	console.log('data', data)
	// }

	const onAccept = React.useCallback(
		async (acceptedFiles: File[]) => {
			setLoading(true)

			const file = acceptedFiles[0]
			if (!file) return

			console.log('file', file)

			const randomId = crypto.randomUUID()

			const filePath = `${randomId}`

			setFilePath(filePath)

			const { data, error } = await supabase.storage
				.from('test2')
				.upload(filePath, file)

			if (error) {
				console.error('Upload error: ', error.message)
				toast({
					title: 'Error',
					description: `An error occurred while uploading the photo: ${error.message}`,
				})
				setLoading(false)
				return
			}

			const path = data.path

			// const { data: urlData } = supabase.storage.from('test').getPublicUrl(path)
			const { data: urlData, error: urlError } = await supabase.storage
				.from('test2')
				.createSignedUrl(path, 3600, { transform: { height: 500, width: 500 } })

			// if (urlError) {
			// 	console.error('Signed URL error: ', urlError.message)
			// 	toast({
			// 		title: 'Error',
			// 		description: `An error occurred while fetching uploaded image: ${urlError.message}`,
			// 	})
			// 	setLoading(false)
			// 	return
			// }

			setImageUrl(urlData?.signedUrl!)
			setShowUploader(false)
			setLoading(false)
		},
		[toast]
	)

	const clientUpload = async (baseString: string) => {
		console.log('imageurl1', imageUrl)
		// const path = crypto.randomUUID()
		const arrayBuffer = decode(baseString.split(',')[1])
		console.log('file', filePath)

		const { data, error } = await supabase.storage
			.from('test2')
			.upload(`${filePath}`, arrayBuffer, {
				contentType: 'image/jpeg',
				upsert: true,
			})

		if (error) {
			console.log('error', error)
		} else {
			console.log('data', data)
		}

		// const { data: urlData } = supabase.storage
		// 	.from('test2')
		// 	.getPublicUrl(filePath)
		const { data: urlData, error: urlError } = await supabase.storage
			.from('test2')
			.createSignedUrl(filePath, 3600, {
				transform: { height: 500, width: 500 },
			})

		console.log('imageUrl2', urlData?.signedUrl!)
		setImageUrl(urlData?.signedUrl!)
		// setThing((c) => !c)
	}

	const onRejection = () => {
		toast({
			title: 'Error',
			description: 'Please upload a single valid image file',
		})
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		maxFiles: 1,
		onDropAccepted: onAccept,
		accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
		onDropRejected: onRejection,
	})

	return (
		<div className='grid grid-cols-2'>
			{showUploader && (
				<div
					{...getRootProps()}
					className={cn(
						'border-dashed border-2 border-gray-300 rounded-md p-4 text-center cursor-pointer h-[610px] flex justify-center items-center',
						{
							'border-sky-200 text-sky-200': isDragActive,
						}
					)}
				>
					<input {...getInputProps()} disabled={loading} />
					<p className=''>
						{!loading && `Drag or select an image file to upload`}
						{loading && 'Uploading...'}
					</p>
				</div>
			)}
			{imageUrl && (
				<Card className='bg-[#282F33]'>
					<CardContent className='pt-6'>
						<Image
							src={imageUrl}
							alt='Before Photo'
							width={500}
							height={500}
							className='w-full h-[500px] rounded-md border-white border'
							placeholder='blur'
							blurDataURL='data:image/jpeg;base64,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'
							onLoad={() => {
								console.log('image loaded')
							}}
						/>
					</CardContent>
					<CardFooter className='flex justify-between'>
						<Button
							variant='outline'
							onClick={() => {
								// setValue(formIndex, '')
								setShowUploader(true)
							}}
						>
							Remove
						</Button>
						<Button variant='outline' onClick={() => setIsImgEditorShown(true)}>
							Edit
						</Button>
					</CardFooter>
				</Card>
			)}
			{isImgEditorShown && (
				<FilerobotImageEditor
					source={imageUrl}
					onSave={(editedImageObject, designState) => {
						// console.log('saved', editedImageObject, designState)
						const myImageBase64 = editedImageObject.imageBase64
						clientUpload(myImageBase64!)
						// serverUpload(myImageBase64)
					}}
					annotationsCommon={{
						fill: '#ff0000',
					}}
					onClose={closeImgEditor}
					defaultSavedImageType='jpeg'
					defaultSavedImageQuality={0.5}
					// Watermark={{
					// 	onUploadWatermarkImgClick: (args) => {
					// 		console.log(args)
					// 	},
					// }}
					Text={{ text: 'Filerobot...' }}
					Rotate={{ angle: 90, componentType: 'slider' }}
					theme={{
						palette: {
							'bg-primary-active': '#76899F',
							'bg-primary': '#282F33',
							'bg-secondary': '#282F33',
							'accent-primary': '#ffffff!important',
							'accent-primary-active': '#ffffff',
							'borders-secondary': '#282F33',
							'borders-primary': '#282F33',
							'light-shadow': '#282F33',
						},
					}}
					tabsIds={[TABS.ADJUST, TABS.WATERMARK, TABS.FINETUNE]} // or {['Adjust', 'Annotate', 'Watermark']}
					defaultTabId={TABS.ADJUST} // or 'Annotate'
					// defaultToolId={ADJUST.CROP} // or 'Text'
					savingPixelRatio={0}
					previewPixelRatio={0}
				/>
			)}
		</div>
	)
}

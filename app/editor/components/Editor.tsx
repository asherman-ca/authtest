'use client'
import React, { useState } from 'react'
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor'
import { decode } from 'base64-arraybuffer'
import { createClient } from '@/utils/supabase/client'

export default function Editor() {
	const supabase = createClient()

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

	const clientUpload = async (baseString: string) => {
		const path = crypto.randomUUID()
		const arrayBuffer = decode(baseString.split(',')[1])

		const { data, error } = await supabase.storage
			.from('test')
			.upload(`${path}.jpeg`, arrayBuffer, {
				contentType: 'image/jpeg',
			})
		if (error) {
			console.log('error', error)
		} else {
			console.log('data', data)
		}
	}

	return (
		<div>
			<FilerobotImageEditor
				source='https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg'
				onSave={(editedImageObject, designState) => {
					// console.log('saved', editedImageObject, designState)
					const myImageBase64 = editedImageObject.imageBase64
					clientUpload(myImageBase64!)
					// serverUpload(myImageBase64)
				}}
				annotationsCommon={{
					fill: '#ff0000',
				}}
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
		</div>
	)
}

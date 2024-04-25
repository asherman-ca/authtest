import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
// const fs = require('fs')
import { decode } from 'base64-arraybuffer'

export async function POST(request: NextRequest) {
	if (!request.body) {
		return new NextResponse('No request body', { status: 400 })
	}
	const body = await request.json()
	console.log('body', body)
	// const buffer = Buffer.from(body.data, 'base64')
	// const file = fs.writeFileSync('image.jpeg', buffer)
	// const fileRes = fs.readFileSync('image.jpeg')

	const path = crypto.randomUUID()

	const supabase = createClient()

	const { data, error } = await supabase.storage
		.from('test')
		.upload(`${path}.png`, decode(body.data), {
			contentType: 'image/png',
		})
	if (error) {
		console.log('error', error)
	} else {
		console.log('data', data)
	}

	return new NextResponse(JSON.stringify({ msg: 'success' }), { status: 200 })
}

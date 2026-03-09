import { put } from '@vercel/blob';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.arrayBuffer();
    const filename = request.headers.get('x-filename') || `image-${Date.now()}.jpg`;

    const blob = await put(filename, body, {
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      access: 'private',
    });

    return Response.json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return Response.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const correctPassword = '1931';

    if (password === correctPassword) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false, error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return Response.json({ error: 'Failed to verify password' }, { status: 500 });
  }
}

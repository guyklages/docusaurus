// api/forward-email.js

export async function POST(request) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  // 1. Resend sends webhook metadata only (no body/attachments) — parse it
  const event = await request.json();

  if (event.type !== 'email.received') {
    return new Response('Ignored: not an email.received event', { status: 200 });
  }

  const emailId = event.data.email_id;

  // 2. Fetch the FULL email content (the webhook only gave us metadata)
  const fullEmailRes = await fetch(`https://api.resend.com/emails/inbound/${emailId}`, {
    headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
  });

  if (!fullEmailRes.ok) {
    console.error('Failed to fetch full email:', await fullEmailRes.text());
    return new Response('Failed to fetch email', { status: 500 });
  }

  const fullEmail = await fullEmailRes.json();

  // 3. Re-send it to your Gmail via Resend's send API
  const forwardRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'guy@guyklages.com',
      to: 'guy.klages@gmail.com',
      subject: `[Fwd] ${fullEmail.subject}`,
      html: `<p><strong>Original from:</strong> ${fullEmail.from}</p><hr>${fullEmail.html || fullEmail.text}`,
    }),
  });

  if (!forwardRes.ok) {
    console.error('Failed to forward email:', await forwardRes.text());
    return new Response('Failed to forward', { status: 500 });
  }

  return new Response('Forwarded', { status: 200 });
}

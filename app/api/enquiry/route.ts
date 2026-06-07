import { NextResponse } from 'next/server';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

function readField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.error('WEB3FORMS_ACCESS_KEY is missing from the deployment environment.');
    return NextResponse.json(
      { message: 'Email delivery is not configured yet. Please add WEB3FORMS_ACCESS_KEY.' },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const honeypot = readField(formData, 'company');

  if (honeypot) {
    return NextResponse.json({ message: 'Enquiry received.' });
  }

  const name = readField(formData, 'name');
  const email = readField(formData, 'email');
  const phone = readField(formData, 'phone');
  const service = readField(formData, 'service');
  const message = readField(formData, 'message');

  if (!name || !email) {
    return NextResponse.json(
      { message: 'Please enter your name and email address.' },
      { status: 400 },
    );
  }

  const payload = {
    access_key: accessKey,
    subject: `New website enquiry from ${name}`,
    from_name: 'Zinat Al Ruh Website',
    name,
    email,
    phone: phone || 'Not provided',
    service: service || 'Not selected',
    message: message || 'No message provided',
    replyto: email,
  };

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const contentType = response.headers.get('content-type') || '';
    const result = contentType.includes('application/json')
      ? ((await response.json()) as { success?: boolean; message?: string })
      : {
          success: false,
          message: `Web3Forms returned ${response.status} ${response.statusText || 'without JSON'}.`,
        };

    if (!response.ok || !result.success) {
      console.error('Web3Forms rejected enquiry submission.', {
        status: response.status,
        message: result.message,
      });
      return NextResponse.json(
        { message: result.message || 'Unable to send your enquiry right now.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: 'Enquiry received.' });
  } catch (error) {
    console.error('Failed to send enquiry through Web3Forms.', error);
    return NextResponse.json(
      { message: 'Unable to send your enquiry right now. Please try again later.' },
      { status: 502 },
    );
  }
}

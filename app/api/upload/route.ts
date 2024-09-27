import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // With the file data in the buffer, you can do whatever you want with it.
    // For this example, we'll save it to the public/uploads directory
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const path = join(uploadDir, file.name);
    await writeFile(path, buffer);

    const publicUrl = `/uploads/${file.name}`;

    return NextResponse.json({ 
      success: true, 
      message: 'File uploaded successfully',
      url: publicUrl
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, message: 'Error uploading file' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join, extname } from 'path';
import crypto from 'crypto';

function generateGuid(): string {
  return crypto.randomUUID();
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a GUID for the new filename
    const fileExtension = extname(file.name);
    const newFileName = `${generateGuid()}${fileExtension}`;

    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const path = join(uploadDir, newFileName);
    await writeFile(path, buffer);

    const publicUrl = `/uploads/${newFileName}`;

    return NextResponse.json({ 
      success: true, 
      message: 'File uploaded successfully',
      url: publicUrl,
      originalName: file.name,
      newName: newFileName
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, message: 'Error uploading file' }, { status: 500 });
  }
}
"use server"

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { randomUUID } from "crypto"

// Initialize the S3 Client using your newly verified .env credentials
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function uploadAvatarAction(formData: FormData) {
  try {
    const file = formData.get("file") as File
    if (!file) {
      throw new Error("No file provided")
    }

    // 1. Read the file into a buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 2. Create a unique file name to prevent overwriting
    const extension = file.name.split(".").pop()
    const uniqueFileName = `avatars/${randomUUID()}.${extension}`

    // 3. Send to S3
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: uniqueFileName,
      Body: buffer,
      ContentType: file.type,
      // Optional: Add Cache-Control if you want browsers to cache the avatars
      CacheControl: "max-age=31536000",
    })

    await s3Client.send(command)

    // 4. Construct the public S3 URL
    const publicUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`

    return { success: true, url: publicUrl }
  } catch (error) {
    console.error("S3 Upload Error:", error)
    return { success: false, error: "Failed to upload image" }
  }
}

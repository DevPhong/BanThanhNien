import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()

    console.log('cokkie', cookieStore)

    const sessionToken = cookieStore.get('sessionToken')

    if (!sessionToken) {
      return Response.json({ message: 'Không tìm thấy session token' }, { status: 401 })
    }

    // Lấy file từ client gửi lên
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return Response.json({ message: 'Không có file upload' }, { status: 400 })
    }

    // Chuyển File sang Blob buffer để gửi đi
    const buffer = Buffer.from(await file.arrayBuffer())

    // Tạo formData gửi backend NestJS
    const backendForm = new FormData()

    backendForm.append('file', new Blob([buffer]), file.name)

    // Gọi backend
    const response = await fetch('http://localhost:4000/profile/upload-avatar', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sessionToken.value}`
      },
      body: backendForm
    })

    const data = await response.json()

    if (!response.ok) {
      // throw new HttpError(response.status, data)
    }

    return Response.json(data, { status: 200 })
  } catch (error) {
    // if (error instanceof HttpError) {
    //   return Response.json(error)
    // }

    return Response.json({ message: 'Lỗi không xác định' }, { status: 500 })
  }
}

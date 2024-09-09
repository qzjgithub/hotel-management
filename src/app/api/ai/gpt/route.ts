import { aiAxiosInstance } from "@/libs/aiAxios";
import { authOptions } from "@/libs/auth";
import { AxiosRequestConfig } from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  const {messages} = await req.json();
  console.log(messages);
  const options: AxiosRequestConfig = {
    method: "POST",
    url: process.env.GPT_URL,
    data: {
      messages: messages,
      // model: 'gpt-3.5-turbo-16k',
      // stream: true,
      user: session?.user.id
    },
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.GPT_KEY
    },
    // responseType: 'stream'
  }
  const responseData: any = await aiAxiosInstance(options);
  console.log(responseData);
  const {choices: [{message, finish_reason}], usage} = responseData;
  return NextResponse.json({
    success: true,
    data: {message, finish_reason}
  });
}
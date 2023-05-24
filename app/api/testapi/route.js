// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json({ name: "John Doe" });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import postSchema from "./schema";

export async function GET(request: NextRequest) {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = postSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );

    const userExists = await prisma.user.findUnique({
      where: { id: body.userId },
    });

    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const createdPost = await prisma.post.create({
      data: {
        userId: body.userId,
        language: body.language,
        title: body.title,
        text: body.text,
        image_url: body.image_url || null,
      },
    });

    return NextResponse.json(createdPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post", details: error },
      { status: 500 }
    );
  }
}

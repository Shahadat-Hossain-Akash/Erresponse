import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(request:NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)

    if(!session) 
        return NextResponse.json("Access denied", {status: 401})

    const users = await prisma.user.findUnique({where: {id: params.id}})

    return NextResponse.json(users, {status:200})
}
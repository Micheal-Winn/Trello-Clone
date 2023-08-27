import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { badRequest } from "../utils/api.utils";

//get all users
export const GET = async (req: NextRequest) => {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {

        return badRequest("Getting Users Errors", 500)
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        console.log("body", body)
        const { email } = body;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        return NextResponse.json(user);
    } catch (error) {

        return badRequest("Getting User Errors", 500)
    }
}


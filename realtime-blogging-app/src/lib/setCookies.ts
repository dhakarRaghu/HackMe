'use server'

import { cookies } from "next/headers"

export async function setSession(param:string) {
    (await cookies()).set({
        name: "session",
        value: param,         
        httpOnly: true,
    });
}
import mongoose from 'mongoose'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  
  if (req.page.params === undefined) { // estaría entrando a /entries.ts
    return NextResponse.next()
  }

  const id = req.page.params.id

  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$")

  if (!checkMongoIDRegExp.test(id as string)) {
    return new Response(JSON.stringify({message: 'ID no válido'}), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return NextResponse.next()
}
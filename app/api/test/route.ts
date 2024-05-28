// app/api/test/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    return NextResponse.json({ message: 'Hello from API route!' });
}

// You can also define handlers for other HTTP methods
// export async function POST(req: NextRequest) {
//     // Handle POST request
// }

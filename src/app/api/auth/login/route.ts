
//i next.js så skrivs endpoints annorlunda från express
export const GET = (request: Request) => {

    return new Response("Hello world!", {status: 200})
}
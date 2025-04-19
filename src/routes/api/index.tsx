import { type APIEvent } from "@solidjs/start"; // or your framework's method
import { action, json } from "@solidjs/router";


// export async function GET({ event }: APIEvent) {
//   return json({ message: "Dataplay api" })
// }


export async function POST({ request, params }: APIEvent) {
  const body = await request.json(); // properly parse JSON body
  // console.log("Received:", body);
  return json({ "message": "Hello from api POST method!", "extraParam": "extraValue", ...body });
}
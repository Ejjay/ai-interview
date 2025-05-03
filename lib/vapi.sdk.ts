import Vapi from "@vapi-ai/web";

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);

if (!process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN) {
  console.error("VAPI token is missing!");
}
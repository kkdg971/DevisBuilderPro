import type { CookieOptions, Request } from "express";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function isIpAddress(host: string) {
  // Basic IPv4 check and IPv6 presence detection.
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return true;
  return host.includes(":");
}

function isSecureRequest(req: Request) {
  if (req.protocol === "https") return true;

  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;

  const protoList = Array.isArray(forwardedProto)
    ? forwardedProto
    : forwardedProto.split(",");

  return protoList.some(proto => proto.trim().toLowerCase() === "https");
}

export function getSessionCookieOptions(
  req: Request
): Pick<CookieOptions, "domain" | "httpOnly" | "path" | "sameSite" | "secure"> {
  const hostname = req.hostname;
  let domain: string | undefined;

  if (process.env.NODE_ENV === "production" && hostname.includes(".onrender.com")) {
    // For Render, set domain to .onrender.com to allow subdomains to share cookies
    domain = ".onrender.com";
  } else if (hostname && !LOCAL_HOSTS.has(hostname) && !isIpAddress(hostname)) {
    // For other production environments or custom domains
    domain = hostname.startsWith(".") ? hostname : `.${hostname}`;
  } else {
    // For local development or IP addresses, no domain is set
    domain = undefined;
  }

  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req),
    domain: domain,
  };
}

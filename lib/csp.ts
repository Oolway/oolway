const awsRegion = process.env.AWS_REGION || "ap-south-1"

const CSP_DIRECTIVES = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://lh3.googleusercontent.com", // Required for Google Avatars
    `https://*.s3.${awsRegion}.amazonaws.com/avatars/`, // Required for S3 Avatar links not behind CDN
  ],
  "font-src": ["'self'"],
  "connect-src": ["'self'"],
  "frame-src": ["'self'"],
  "frame-ancestors": ["'none'"],
  "form-action": ["'self'"],
  "upgrade-insecure-requests": [],
}

export function buildCSP({
  nonce = "",
  useNonce = false,
}: { nonce?: string; useNonce?: boolean } = {}): string {
  const directives = { ...CSP_DIRECTIVES }

  if (useNonce && nonce) {
    directives["script-src"] = directives["script-src"].filter(
      (v) => v !== "'unsafe-inline'"
    )
    directives["script-src"].push(`'nonce-${nonce}'`)
  }

  return Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join("; ")
}

export const CSP = buildCSP()

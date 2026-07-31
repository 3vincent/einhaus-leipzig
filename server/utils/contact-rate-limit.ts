const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5
const MAX_TRACKED_IDENTIFIERS = 5000
const requestLog = new Map<string, number[]>()

function removeExpiredEntries(now: number) {
  const windowStart = now - WINDOW_MS

  for (const [identifier, timestamps] of requestLog) {
    const recentTimestamps = timestamps.filter(
      timestamp => timestamp > windowStart
    )

    if (recentTimestamps.length === 0) requestLog.delete(identifier)
    else requestLog.set(identifier, recentTimestamps)
  }
}

/**
 * A deliberately small, dependency-free abuse guard. On serverless platforms
 * it applies per warm instance; honeypot and form-age checks remain the first
 * line of defence. A truly global limit requires platform support or shared
 * state and cannot be implemented honestly inside an isolated function.
 */
export function contactRateLimitAllows(identifier: string) {
  const now = Date.now()

  if (requestLog.size >= MAX_TRACKED_IDENTIFIERS) removeExpiredEntries(now)

  // Keep memory bounded even during a flood of unique identifiers.
  if (
    requestLog.size >= MAX_TRACKED_IDENTIFIERS &&
    !requestLog.has(identifier)
  ) {
    return false
  }

  const recentRequests = (requestLog.get(identifier) ?? []).filter(
    timestamp => timestamp > now - WINDOW_MS
  )

  if (recentRequests.length >= MAX_REQUESTS) return false

  requestLog.set(identifier, [...recentRequests, now])
  return true
}

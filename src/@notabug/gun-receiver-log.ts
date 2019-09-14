type GunReceiver = any
type GunReceiverMsg = any

interface Logger {
  info(log: string): void
  debug(log: string): void
}

export function gunReceiverLog(logger: Logger, replayFrom = 1000 * 60 * 60) {
  return function queryLog(db: GunReceiver) {
    db.onIn((msg: GunReceiverMsg) => {
      const { raw, json } = msg
      if (!json) return msg
      if (json.put) {
        logger.info(raw || JSON.stringify(json))
      } else {
        logger.debug(raw || JSON.stringify(json))
      }
      return msg
    })

    return db
  }
}

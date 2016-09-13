export function ping (req, res) {
  res.status(200).send({ping: 'pong'})
}

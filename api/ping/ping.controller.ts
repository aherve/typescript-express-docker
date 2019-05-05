import { apiMethod, ApiError } from '../helpers';

export const ping = apiMethod<{ ping: string }>(async () => {
  return {
    data: { ping: 'pong' },
    status: 200,
  }
})

export const fail = apiMethod<{ message: string }>(async () => {

  /*
   * Safely throw exceptions and see them caught without breaking anything
   * Here for instance, we are calling a fail dice, that will randomly fail
   * failDice is here async for the sake of th example, but it does not have to
   */
  await failDice()

  return {
    data: {
      message: 'Everything went fine !'
    }
  }
})

async function failDice() {
  if (Math.random() > 0.5) {
    throw <ApiError> {
      name: 'BadRequestError',
      message: 'Give me one more chance !',
    }
  }
  return
}

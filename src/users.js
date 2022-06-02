export const getUsers = async function ({ knex }) {
  const users = await knex.from('users').select('*')
  return users.reduce(function (accumulator, user) {
    accumulator[user.uid] = user
    return accumulator
  }, {})
}

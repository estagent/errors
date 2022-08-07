import error from '@revgaming/error'
import statusCodes from '@revgaming/status'

export default err => {
  const errors = {}
  if (err.response) {
    if (err.response.data) {
      const data = err.response.data
      if (err.response.status === statusCodes.UNPROCESSABLE_ENTITY) {
        if (data.errors) {
          for (const key in data.errors) {
            errors[key] = data.errors[key]
          }
        } else {
          for (const key in data) {
            errors[key] = data[key]
          }
        }
      } else {
        errors.messsage = [error(err)]
      }
    } else {
      errors.messsage = [error(err)]
    }
  } else {
    errors.messsage = [error(err)]
  }

  return {
    all: () => errors,
    values: () => Object.keys(errors).map(key => errors[key]),
  }
}

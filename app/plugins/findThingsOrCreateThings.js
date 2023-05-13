// This Plugin Let User Find Things Or Create Things || Find Thing Or Create Additional Things With Find Things

module.exports = async function findThingsOrCreateThings(schema) {
    schema.statics.findThingsOrCreateThings = async function (findProps, createAdditionalProps, cb) {
      // If User Does Not Need To Create Additional Thing
      if (!createAdditionalProps){
        try {
          let result = await this.findOne(findProps)
          if (result) {
            if (cb){ // If User Want To Use Callback, Return Callback
              await cb (null, result)
            }
            return Promise.resolve(result) // If User Want To Use Promise, Return Promise
          }else{
            if (cb){ // If User Want To Use Callback, Return Callback
              await cb (null, (await this.create(findProps)))
            }
            return Promise.resolve((await this.create(findProps))) // If User Want To Use Promise, Return Promise
          }
        } catch (error) {
          if (cb){ // If User Want To Use Callback, Return Callback
            await cb(error, null)
          }
          return Promise.reject(null) // If User Want To Use Promise, Return Promise
        }
      }
      // If User Also Need To Create Additional Things
      else{
        try {
          let result = await this.findOne(findProps)
          // if user is existed
          if (result) {
            if (cb){ // If User Want To Use Callback, Return Callback
              await cb (null, result)
            }else{
              return Promise.resolve(result) // If User Want To Use Promise, Return Promise
            }
          }
          // If user is not existed
          else{
            let mergedProps = {...findProps, ...createAdditionalProps}
            if (cb){ // If User Want To Use Callback, Return Callback
              await cb (null, (await this.create(mergedProps)))
            }else{
              return Promise.resolve((await this.create(mergedProps))) // If User Want To Use Promise, Return Promise
            }
          }
        } catch (error) {
          if (cb){ // If User Want To Use Callback, Return Callback
            await cb(error, null)
          }else{
            return Promise.reject(null) // If User Want To Use Promise, Return Promise
          }
        }
      }
    }
}
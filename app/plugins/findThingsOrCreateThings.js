// This Plugin Let User Find Things Or Create Things || Find Thing Or Create Additional Things With Find Things

module.exports = async function findThingsOrCreateThings(schema) {
    schema.statics.findThingsOrCreateThings = async function (findProps, createAdditionalProps, cb) {
      //
      if (createAdditionalProps === null || createAdditionalProps === undefined){
        try {
          let result = await this.findOne(findProps)
          if (result) {
            await cb (null, result)
          }else{
            await cb (null, (await this.create(findProps)))
          }
        } catch (error) {
          await cb(error, null)
        }
      }
      // If User Also Need To Create Additional Things
      else{
        try {
          let result = await this.findOne(findProps)
          if (result) {
            await cb (null, result)
          }else{
            let mergedProps = {...findProps, ...createAdditionalProps}
            await cb (null, (await this.create(mergedProps)))
          }
        } catch (error) {
          await cb(error, null)
        }
      }
    }
}
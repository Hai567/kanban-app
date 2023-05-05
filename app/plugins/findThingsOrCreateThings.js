// This Plugin Lets User Find Things Or Create Things 
// OR
// Find Thing Or Create Additional Things With Find Things
// Then Return
// Error, Things (That Either In The DB Or Need To Be Created), Condition ("new", "already", "null")
// "new" When There Have Not Been Any "Things" In The DB And Need To Create A New One
// "already" When The "Things" Has Already In The DB
// "null" If Err
// As Condition 

module.exports = async function findThingsOrCreateThings(schema) {
    schema.statics.findThingsOrCreateThings = async function (findProps, createAdditionalProps, cb) {
      // If User Does Not Need To Create Additional Things
      if (createAdditionalProps === null || createAdditionalProps === undefined){
        try {
          let result = await this.findOne(findProps)
          if (result) {
            await cb (null, result, "already")
          }else{
            await cb (null, (await this.create(findProps)), "new")
          }
        } catch (error) {
          await cb(error, null, null)
        }
      }
      // If User Also Need To Create Additional Things
      else{
        try {
          let result = await this.findOne(findProps)
          if (result) {
            await cb (null, result, "already")
          }else{
            let mergedProps = {...findProps, ...createAdditionalProps}
            await cb (null, (await this.create(mergedProps)), "new")
          }
        } catch (error) {
          await cb(error, null, null)
        }
      }
    }
}
require("dotenv").config()
require('./models')
const { Toilet } = require('./models')
const toilets = require('./sanisettesparis.json')


const createToilet = async () => {
  await Toilet.destroy({ where: {}})

  toilets.forEach(async (toilet) => {
    const longitude = toilet.fields.geo_point_2d[1]
    const latitude = toilet.fields.geo_point_2d[0]

    const point = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    const newToilet = await Toilet.create({
      address: toilet.fields.adresse,
      position: point,
      hours: toilet.fields.horaire,
      arrondissement: toilet.fields.arrondissement
    })

    console.log(newToilet.address)
  })
}

createToilet()
const express = require('express')
const app = express()
const sequelize = require('sequelize')
const { Toilet } = require('../models')

app.post('/', async (req, res) => {
  const { address, latitude, longitude, hours, arrondissement } = req.body

  const point = {
    type: 'Point',
    coordinates: [ longitude, latitude ]
  }

  const toilet = await Toilet.create({
    address,
    position: point,
    hours,
    arrondissement
  })

  res.json(toilet)
})

app.get('/', async (req, res) => {
  const { r, lng, lat } = req.query

  const radius = r * 1000

  const location = sequelize.literal(
    `ST_GeomFromText('POINT(${lng} ${lat})')`
  )

  const distance = sequelize.fn(
    'ST_Distance_Sphere',
    sequelize.col('toilet.position'),
    location
  )

  const toilets = await Toilet.findAll({
    where : {
      position: sequelize.where(distance, {[ sequelize.Op.lte ]: radius})
    }
  })

  res.json(toilets)
})


module.exports = app
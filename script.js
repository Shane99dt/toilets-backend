require("dotenv").config();
require("./models");
const { Toilet } = require("./models");
const toilets = require("./sanisettesparis.json");

const createToilet = async () => {
  await Toilet.destroy({ where: {} });

  const createToilet = async (
    latitude,
    longitude,
    address,
    hours,
    arrondissement
  ) => {
    const point = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    const toilet = await Toilet.create({
      address,
      position: point,
      hours,
      arrondissement,
    });

    return toilet;
  };

  const promises = toilets.map((toilet) => {
    return createToilet(
      toilet.fields.geo_point_2d[0],
      toilet.fields.geo_point_2d[1],
      toilet.fields.adresse,
      toilet.fields.horaire,
      toilet.fields.arrondissement
    );
  });

  await Promise.all(promises);

  console.log("imported");
};

createToilet();

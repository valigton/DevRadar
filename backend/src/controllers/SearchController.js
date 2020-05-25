const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index (req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);
    
    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geomatry: {
            type: 'Point',
            coodinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        }
      }
    });

    return res.json({ devs });
  }
}
import {v2 as cloudinary} from "cloudinary";

import {config} from "dotenv"

config()

cloudinary.config({
  cloud_name: 'dkjllknax',
  api_key: '579365695761244',
  api_secret: 'VPWsB7AMD3htCAxlEWqfQiRhfp4'
});

export default cloudinary;
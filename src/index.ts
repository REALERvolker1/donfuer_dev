import * as global from './main.js'
import './css/pages/index.css'

const images = [
  {
    src: "images/2021-07-23_21.47.16.png",
    alt: "A nice summer day :3",
  }
]

const main = global.init("Home")
document.body.appendChild(main)

for (const img of images) {
  const image = new global.lazyImage(img.src,img.alt)
  image.init().then(kid => main.appendChild(kid))
}
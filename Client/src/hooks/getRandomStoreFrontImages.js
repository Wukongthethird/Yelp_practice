import storefront1 from "../photos/storefront/storefront1.jpg"
import storefront2 from "../photos/storefront/storefront2.jpg"
import storefront3 from "../photos/storefront/storefront3.jpg"
import storefront4 from "../photos/storefront/storefront4.jpg"
import storefront5 from "../photos/storefront/storefront5.jpg"
import storefront6 from "../photos/storefront/storefront6.jpg"
import storefront7 from "../photos/storefront/storefront7.jpg"



const images = [storefront1,storefront2,storefront3,storefront4,storefront5,storefront6,storefront7]

const randomImage = (images)=>{
  const randomInt =  Math.floor( Math.random()*(images.length-1))

  return images[randomInt]
}

const generateImages = {randomImage,images}
export default generateImages;
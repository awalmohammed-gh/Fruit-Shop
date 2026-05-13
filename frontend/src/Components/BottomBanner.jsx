import { assets, features } from "../assets/assets"


const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      <img src={assets.bottom_banner_image} className="w-full hidden md:block" alt=""/>
      <img src={assets.bottom_banner_image_sm} className="md:hidden w-full" alt=""/>
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
            <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-6">Fruit Bay - Freshness at Your Fingertips!</h1>
            {
                features.map((feature,index) =>(
                    <div className="flex items-start gap-4 mt-2" key={index}>
                        {/* <div>{feature.icon}</div> */}
                        <h2 className="text-lg tracking-wide font-semibold">{feature.title}</h2>
                        <p className="text-gray-500/70 text-xs md:text-sm">{feature.description}</p>
                    </div>
                ))
            }
      </div>
    </div>
  )
}

export default BottomBanner

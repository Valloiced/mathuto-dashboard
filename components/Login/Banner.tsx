import Image from 'next/image';
import BannerImg from '@/public/assets/login-banner.png';
import ShowcaseImg from '@/public/assets/login-showcase.png';
import { BsStars } from "react-icons/bs";

export default function Banner() {
    return (
        <div className="flex flex-col w-[40%] bg-tertiary-blue items-center py-6 max-md:hidden justify-evenly">
            <div>
                <Image
                    src={BannerImg}
                    width={325}
                    alt="Login Banner logo that states 'MATHUTO'"
                />
            </div>
            <div>
                <Image 
                    src={ShowcaseImg}
                    width={350}
                    alt="The picture shows a showcase of the MATHUTO Application"
                />
            </div>
            <div className='w-80'>
                <BsStars size={20} className='-ml-4 -mb-3 text-blue'/>
                <h3 className="font-montserrat text-md text-blue font-bold text-center">A gamified and interactive learning app, all in one application!</h3>
            </div>
        </div>
    )
}
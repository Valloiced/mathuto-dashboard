import Image from 'next/image';
import BannerImg from '@/public/assets/forgot-password-banner.png';

export default function Banner() {
    return (
        <div className='flex max-md:hidden'>
            <Image 
                src={BannerImg}
                width={400}
                height={400}
                alt="Forgot Password Banner"
            />
        </div>
    )
}
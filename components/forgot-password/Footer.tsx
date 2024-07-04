import Image from 'next/image';
import Blob1 from '@/public/assets/blob/blob-1.png';
import Blob2 from '@/public/assets/blob/blob-2.png';


export default function Footer() {
    return (
        <div className='relative -z-50 h-28 flex justify-center items-end py-4'>
            {/* Blob 1 */}
            <div className='absolute -top-16 -left-[45%] flex max-md:hidden'>
                <Image 
                    src={Blob1}
                    width={1000}
                    height={1000}
                    alt="Mathuto Icon"
                />
            </div>
            {/* Blob 2 */}
            <div className='absolute -top-72 -right-[45%] flex max-md:hidden'>
                <Image 
                    src={Blob2}
                    width={1000}
                    height={1000}
                    alt="Mathuto Icon"
                />
            </div>
            <p className="text-center text-black text-opacity-50 font-poppins text-sm">© 2024 Mathuto. All Rights Reserved</p>
        </div>
    )
}
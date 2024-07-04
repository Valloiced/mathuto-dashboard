import Image from 'next/image';
import Icon from '@/public/assets/icon.png';

export default function Header() {
    return (
        <div className="flex flex-col items-center gap-4 py-4">
            <Image 
                src={Icon}
                width={150}
                height={150}
                alt="Mathuto Icon"
            />
            <h2 className="font-montserrat font-bold text-xl text-dark-blue text-opacity-90">MATHUTO</h2>
        </div>
    )
}
export default function Banner({ title = 'placeholder' } : { title: string }) {
    return (
        <div className="relative flex flex-row justify-center items-center bg-primary-theme w-full py-12">
            <h1 className="font-montserrat font-bold text-3xl text-white">{title}</h1>
            <p className="absolute bottom-2 right-4 font-montserrat font-medium text-xs text-white">Created 14 days ago</p>
        </div>
    )
}
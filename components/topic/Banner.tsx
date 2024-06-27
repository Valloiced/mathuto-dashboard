interface BannerProps {
    title: string,
    createdOn: any // Could be Date or Timestamp, I hate firebase
}

export default function Banner({ title = 'placeholder', createdOn }: BannerProps) {

    const getTimeGap = (time: number = 0) => {
        const createdDate = new Date(time * 1000); // Converting to milliseconds
        const todayDate = new Date();

        const diffTime = Math.abs(todayDate.getTime() - createdDate.getTime());

        const day = 24 * 60 * 60 * 1000;
        const month = 30 * day;
        const year = 12 * month;

        if (diffTime >= year) {
            const diffYears = Math.floor(diffTime / year);
            return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
        } else if (diffTime >= month) {
            const diffMonths = Math.floor(diffTime / month);
            return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
        } else {
            const diffDays = Math.floor(diffTime / day);
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        }
    }

    return (
        <div className="relative flex flex-row justify-center items-center bg-primary-theme w-full py-12">
            <h1 className="font-montserrat font-bold text-3xl text-white">{title}</h1>
            <p className="absolute bottom-2 right-4 font-montserrat font-medium text-xs text-white">
                Created {getTimeGap(createdOn?._seconds)}
            </p>
        </div>
    )
}

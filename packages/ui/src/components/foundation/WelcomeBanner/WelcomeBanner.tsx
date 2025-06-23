interface WelcomeBannerProps {
  name: string;
  titleText?: string;
  className?: string;
}

const WelcomeBanner = ({ name, titleText, className = '' }: WelcomeBannerProps) => {
  return (
    <div className={`flex flex-col h-[175px] w-full text-white justify-center items-center brand-gradient ${className}`}>
      <div className="flex flex-col items-start w-full app-content px-4">
        <h1 className="title-1">
          {titleText} {name}
        </h1>
      </div>
    </div>
  );
};

export default WelcomeBanner; 
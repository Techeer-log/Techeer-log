export const Header = () => {
  return (
    <div className="fixed top-0 w-screen flex justify-center items-center z-50 backdrop-blur-[4px]">
      <div className="flex flex-row items-center py-2 px-3 w-[1200px] box-sizing-border">
        <div className="flex flex-row justify-center my-5 w-full">
          <span
            onClick={() => window.location.replace('/2024-summer-bootcamp/judge')}
            className="cursor-pointer text-center break-words font-['Bayon'] font-normal text-[3rem] text-[#EFEFEF]"
          >
            2024 TECHEER Summer Bootcamp
          </span>
        </div>
      </div>
    </div>
  );
};

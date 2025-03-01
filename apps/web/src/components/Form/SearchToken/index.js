const SearchToken = ({
  check = false,
  value = "",
  onChange = "",
  onClick = "",
  onSelectChange = "",
}) => {
  return (
    <div className="w-[100%] flex border border-[#2C2C2C] bg-[#141414] rounded-lg relative max-sm:h-[52px]">
      <div className="w-[147px] bg-[#282828] max-sm:h-[52px]">
        <select
          name=""
          id=""
          className="bg-[#282828] p-5 text-white text-base outline-none max-sm:p-3"
          onChange={(e) => onSelectChange(e)}
        >
          <option value="1">ETH</option>
          <option value="56">BSC</option>
        </select>
      </div>
      <input
        type="text"
        name=""
        id=""
        placeholder="Search token address"
        className="outline-none border-none bg-[#141414] py-[22px] pl-[20px] text-[16px] text-[#86888C] w-[100%]"
        value={value}
        onChange={(e) => onChange(e)}
      />
      {check && (
        <div
          onClick={onClick}
          className="w-[80px] h-[28px] bg-[#C03F4A] text-[16px] text-[#16171B)] px-3 py-[2px] text-center rounded-[32px] font-bold absolute right-[20px] top-[20px] cursor-pointer max-sm:top-[10px] max-sm:right-[10px]"
        >
          Check
        </div>
      )}
    </div>
  );
};

export default SearchToken;

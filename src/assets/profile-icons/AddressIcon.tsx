const AddressIcon = ({ active }: { active: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28.036"
      height="40.78"
      viewBox="0 0 28.036 40.78"
    >
      <g
        id="_8._Place_Holder"
        data-name="8. Place Holder"
        transform="translate(-5)"
      >
        <path
          id="Path_7311"
          data-name="Path 7311"
          d="M28.665,32.549H8.274a1.274,1.274,0,0,1,0-2.549h20.39a1.274,1.274,0,1,1,0,2.549Z"
          transform="translate(0.549 8.232)"
          fill={active ? "#552864" : "#1d1d1d"}
        />
        <path
          id="Path_7312"
          data-name="Path 7312"
          d="M19.018,34.408h0a3.823,3.823,0,0,1-2.867-1.274C11.984,28.419,5,19.626,5,14.018a14.018,14.018,0,1,1,28.036,0c0,5.607-6.984,14.388-11.151,19.116a3.823,3.823,0,0,1-2.867,1.274Zm0-31.86A11.469,11.469,0,0,0,7.549,14.018c0,3.441,3.938,9.953,10.514,17.446a1.274,1.274,0,0,0,.956.4h0a1.274,1.274,0,0,0,.956-.433c6.589-7.455,10.514-13.967,10.514-17.408A11.469,11.469,0,0,0,19.018,2.549Z"
          fill={active ? "#552864" : "#1d1d1d"}
        />
        <path
          id="Path_7313"
          data-name="Path 7313"
          d="M14,6h5.1V9.823A1.274,1.274,0,0,1,17.823,11.1H15.274A1.274,1.274,0,0,1,14,9.823Z"
          transform="translate(2.469 1.646)"
          fill="#6e6d6e"
        />
        <path
          id="Path_7314"
          data-name="Path 7314"
          d="M21.469,20.293H13.823A3.823,3.823,0,0,1,10,16.469V8.823A3.823,3.823,0,0,1,13.823,5h7.646a3.823,3.823,0,0,1,3.823,3.823v7.646A3.823,3.823,0,0,1,21.469,20.293ZM13.823,7.549a1.274,1.274,0,0,0-1.274,1.274v7.646a1.274,1.274,0,0,0,1.274,1.274h7.646a1.274,1.274,0,0,0,1.274-1.274V8.823a1.274,1.274,0,0,0-1.274-1.274Z"
          transform="translate(1.372 1.372)"
          fill={active ? "#552864" : "#1d1d1d"}
        />
      </g>
    </svg>
  );
};

export default AddressIcon;

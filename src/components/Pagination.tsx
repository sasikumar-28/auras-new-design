import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  themeColor: string;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
  themeColor,
}) => {
  return (
    <div className="flex justify-center mt-6">
      <ReactPaginate
        previousLabel={
          <span className="w-full h-full flex items-center justify-center">
            «
          </span>
        }
        nextLabel={
          <span className="w-full h-full flex items-center justify-center">
            »
          </span>
        }
        breakLabel={"..."}
        pageCount={pageCount}
        forcePage={currentPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        containerClassName="flex gap-2 text-sm"
        pageClassName="px-3 py-1 border rounded-md cursor-pointer bg-gray-100 transition"
        pageLinkClassName="block w-full h-full text-center"
        activeClassName="selected"
        previousClassName="px-3 py-1 border rounded-md cursor-pointer bg-gray-200 hover:bg-gray-400 flex items-center justify-center"
        previousLinkClassName="block w-full h-full text-center"
        nextClassName="px-3 py-1 border rounded-md cursor-pointer bg-gray-200 hover:bg-gray-400 flex items-center justify-center"
        nextLinkClassName="block w-full h-full text-center"
        breakClassName="px-3 py-1"
        disabledClassName="opacity-50 cursor-not-allowed"
        renderOnZeroPageCount={null}
      />
      {/* Dynamic Styles for Theme Color */}
      <style>
        {`.px-3:hover {
			background-color: ${themeColor} !important;
			color: white !important;
		}
		.selected {
			background-color: ${themeColor} !important;
			border-color: ${themeColor} !important;
			color: white !important;
		}
  		`}
      </style>
    </div>
  );
};

export default Pagination;

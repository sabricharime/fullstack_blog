import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

function SearchInput() {
  return (
    <div className="bg-background-200 w-full h-[200px] rounded-lg flex flex-col gap-4 items-center justify-center place-items-center p-4 ">

      <p className="text-center">
        <small className="text-background-700 text-center">
          Search about anything egg: New posts , usesr , groups , pages
        </small>
      </p>
      <form className="w-full flex flex-col items-center justify-center">
        <div className="w-full">
          <Input
            type="search"
            variant="flat"
            label={"Search"}
            placeholder="Search about anything "
            color="primary"
            endContent={<FaSearch className="fill-primary " size={26} />}
            labelPlacement="inside"
          />
        </div>
      </form>
    </div>
  );
}

export default SearchInput;

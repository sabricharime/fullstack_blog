
import SearchInput from "../../../components/SearchInput";


function SearchSection() {
  const textColor = "text-grayColor-800";
  return (
    <section className=" flex flex-col gap-8  bg-grayColor-100 md:px-20 p-4 sm:p-10 rounded-md">
      <h6 className={textColor}>Search for a posts</h6>

      <SearchInput />
    </section>
  );
}

export default SearchSection


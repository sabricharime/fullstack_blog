import HeroSection from "./HeroSection";
import ReccentPost from "./ReccentPost";
import SearchSection from "./SearchSection";

function Home() {

  return (
    <main className="  flex flex-col gap-20 md:gap-10 mb-20 ">
      <HeroSection />
      <ReccentPost />
      <SearchSection />

    </main>
  );
}

export default Home;

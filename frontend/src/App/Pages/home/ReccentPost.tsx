

import Card from "../../../components/Card";
import { useGetAllPostsQuery } from "../../../redux/api/API";

function ReccentPost() {

  const {data} = useGetAllPostsQuery({})
  const textColor = "text-grayColor-800";
  if(!data) return (<div>Loading...</div>)
  return (
    <section className=" flex flex-col gap-8  bg-grayColor-100 md:px-20 p-10 rounded-md">
      <h6 className={textColor}>Reccent Posts </h6>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card description={data[0].content } title={data[0].title} imageURL={data[0].imageURL} id={data[0].id}/>

            {   data[1]&&    <Card description={data[1].content } title={data[1].title} imageURL={data[1].imageURL} id={data[1].id}/>}
            {   data[2]&&    <Card description={data[2].content } title={data[2].title} imageURL={data[2].imageURL} id={data[2].id}/>}


      </div>
    </section>
  );
}

export default ReccentPost;

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header";
import Hero from "../components/Hero";
import { sanityClient, urlFor } from "../sanity";

export default function Home({ posts }) {
  return (
    <div className="bg-[#202020]">
      <Head>
        <title>Views</title>
      </Head>
      <Header />
      <Hero />
      <div className="max-w-7xl mx-auto  mt-24">
        <h1 className="text-3xl sm:text-5xl font-black text-white p-2 md:p-6">
          <span className="text-red-400">Featured</span> Places
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6  ">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/post/${post.slug.current}`}
              className=""
            >
              <div className="relative group rounded-lg overflow-hidden cursor-pointer h-60 w-full">
                <Image
                  layout="fill"
                  className="object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out group-hover:bg-white group-hover:saturate-50"
                  src={urlFor(post.mainImage).url()}
                  alt=""
                />
                <h1 className="absolute bottom-3 left-3 text-4xl text-white z-20 font-bold">
                  {post.title}
                </h1>
                <div className="absolute bottom-0 h-4/6 w-full bg-gradient-to-b from-transparent to-[#000000ab] transition-colors duration-700 ease-in-out z-10">
                  {/* nsnf */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
  _id,
  title,
  description,
  mainImage,
  slug
}`;

  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};

import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import { sanityClient, urlFor } from "../../sanity";
import { motion } from "framer-motion";
import Header from "../../components/header";
import { SlugHeader } from "../../components/SlugHeader";

function Post({ post }) {
  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <div>
      <Head>
        <title>Explore {post.title}</title>
      </Head>
      <SlugHeader post={post} />
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-3xl sm:text-5xl font-black text-black p-2 md:p-6">
          <span className="text-red-400">Explore</span> {post.title}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 p-2 md:p-6">
          {post.images.map((pics) => (
            <motion.div
              key={urlFor(pics).url()}
              whileHover={{ opacity: 0.8 }}
              layout
              onClick={() => setSelectedImg(urlFor(pics).url())}
              className="relative h-96 w-full object-cover object-top cursor-pointer"
            >
              <Image
                layout="fill"
                alt={post.title}
                // height={96}
                // width={96}
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                // transition={{ delay: 1 }}
                src={urlFor(pics).url()}
                className="block h-96 w-full object-cover object-top cursor-pointer"
                // loading="lazy"
              />
            </motion.div>
          ))}
        </div>
        <Modal selectedimg={selectedImg} setSelectedImg={setSelectedImg} />
      </div>
    </div>
  );
}

export default Post;

export const Modal = ({ selectedimg, setSelectedImg }) => {
  const handleClick = (e) => {
    if (e.target.tagName === "DIV") {
      setSelectedImg(null);
    }
  };
  return (
    selectedimg && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[99]"
        onClick={handleClick}
      >
        <motion.div
          className="relative block w-[80%] h-[70%] max-w-7xl max-h-[80%] my-[60px] mx-auto shadow-md border border-solid border-white "
          initial={{ y: "-100vh" }}
          animate={{ y: "0" }}
        >
          <Image
            alt=""
            layout="fill"
            src={selectedimg}
            className="h-full w-full object-top object-cover"
          />
        </motion.div>
      </motion.div>
    )
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug {
            current
        }
    }`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        description,
        mainImage,
        images,
        slug
    }`;

  const post = await sanityClient.fetch(query, {
    slug: params.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

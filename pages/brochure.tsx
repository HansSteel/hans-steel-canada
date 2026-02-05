import Head from "next/head";
import Image from "next/image";

export default function Brochure() {
  const BROCHURE_IMAGES = [
    {
      src: "/images/brochure/hans-steel-brochure-p01.png",
      alt: "HANS STEEL brochure page 1",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p02.png",
      alt: "HANS STEEL brochure page 2",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p03.png",
      alt: "HANS STEEL brochure page 3",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p04.png",
      alt: "HANS STEEL brochure page 4",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p05.png",
      alt: "HANS STEEL brochure page 5",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p06.png",
      alt: "HANS STEEL brochure page 6",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p07.png",
      alt: "HANS STEEL brochure page 7",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p08.png",
      alt: "HANS STEEL brochure page 8",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p09.png",
      alt: "HANS STEEL brochure page 9",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p10.png",
      alt: "HANS STEEL brochure page 10",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p11.png",
      alt: "HANS STEEL brochure page 11",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p12.png",
      alt: "HANS STEEL brochure page 12",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p13.png",
      alt: "HANS STEEL brochure page 13",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p14.png",
      alt: "HANS STEEL brochure page 14",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p15.png",
      alt: "HANS STEEL brochure page 15",
    },
    {
      src: "/images/brochure/hans-steel-brochure-p16.png",
      alt: "HANS STEEL brochure page 16",
    },
  ];
  return (
    <div className="">
      <Head>
        <title>Brochure | Hans Steel Canada</title>
        <meta
          name="description"
          content="View our brochure for Hans Steel products and services"
        />
      </Head>
      <main className="container mx-auto px-4 py-8">
        <h1 className="">Our Brochure</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {BROCHURE_IMAGES.map((item) => (
            <div key={item.src} className="">
              <Image
                src={item.src}
                alt={item.alt}
                width={300}
                height={200}
                layout="responsive"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

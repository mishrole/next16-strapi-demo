import Image from "next/image"

interface HeroSectionProps {
  heading: string
  subHeading: string
  image: string
  alt: string
}

function HeroSection({
  heading,
  subHeading,
  image,
  alt,
}: Readonly<HeroSectionProps>) {
  return (
    <section>
      <Image src={image} alt={alt} width={800} height={600} loading="eager" />
      <h2 className="text-1xl font-bold">{heading}</h2>
      <p>{subHeading}</p>
    </section>
  )
}

export { HeroSection, type HeroSectionProps }

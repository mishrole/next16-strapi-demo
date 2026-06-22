import { HeroSection } from "@/components/hero-section"
import { getHomePage, STRAPI_BASE_URL } from "@/lib/strapi/strapi"

export async function generateMetadata() {
  const strapiData = await getHomePage()

  return {
    title: strapiData?.title,
    description: strapiData?.description,
  }
}

export default async function Home() {
  const strapiData = await getHomePage()

  if (!strapiData) {
    return (
      <main className="container mx-auto py-6">
        <p>No se pudo cargar el contenido en este momento.</p>
      </main>
    )
  }

  const { title, description, sections } = strapiData

  return (
    <main className="container mx-auto py6">
      <h1 className="text-3xl font-bold"> {title} </h1>
      <p className="text-gray-600">{description}</p>

      {sections?.map((section) => {
        const image = `${STRAPI_BASE_URL}${section.image.url}`

        return (
          <div key={section.id}>
            <HeroSection
              heading={section.heading}
              subHeading={section.subHeading}
              image={image}
              alt={section.image.alternativeText}
            />
          </div>
        )
      })}
    </main>
  )
}

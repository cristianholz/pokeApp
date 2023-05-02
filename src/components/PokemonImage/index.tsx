import Image from 'next/image'

type PokemonImageProps = {
  imgUrl: string
  defaultImage: string
  title: string
  alt: string
  width?: number
  height?: number
}

export function PokemonImage({
  imgUrl,
  defaultImage,
  title,
  alt,
  width = 65,
  height = 65,
}: PokemonImageProps) {
  function renderImage() {
    const imageUrl = imgUrl
    const hasImage = imageUrl || defaultImage

    if (hasImage) {
      return (
        <Image
          width={width}
          height={height}
          alt={alt}
          title={title}
          src={hasImage}
        />
      )
    }

    return (
      <div>
        <Image
          width={width}
          height={height}
          alt={`Image for ${alt} was not found`}
          title={`Image for ${title} was not found`}
          src="/placeholder.png"
        />
      </div>
    )
  }

  return renderImage()
}

import Head from 'next/head'

type SEOProps = {
  title: string
  description?: string
  ogImage?: string
  url?: string
}

export function SEO({
  title,
  description = 'PokeApp description',
  ogImage = 'og.png',
  url = 'https://main--thriving-shortbread-97a517.netlify.app/',
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      {description && <meta name="description" content={description} />}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {ogImage && <meta property="og:image" content={`${url}${ogImage}`} />}

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      {description && (
        <meta property="twitter:description" content={description} />
      )}
      {ogImage && (
        <meta property="twitter:image" content={`${url}${ogImage}`} />
      )}
    </Head>
  )
}

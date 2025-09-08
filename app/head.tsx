interface CustomHeadProps {
  title: string
}

import logo from '@/public/images/hypefy.png'

export default function CustomHead({ title }: CustomHeadProps): JSX.Element {
  return (
    <>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta name="description" content="Hype fy Agência - Serviços digitais" />
      <link
        rel="icon"
        href={logo.src}
        type="image/svg+xml"
        sizes="any"
      />
    </>
  )
}

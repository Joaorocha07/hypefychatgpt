import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import logo from "@/public/images/hypefy.png"

interface CustomHeadProps {
  title: string
}

export default function CustomHead({ title }: CustomHeadProps): JSX.Element {
  return (
    <>
      <head>
        <title>{title}</title> 
        <meta content="width=device-width, initial-scale=1.0" name="viewport" /> 
        <meta name="description" content="Hype fy Agência - Serviços digitais" /> 
        <link rel="icon" href={logo.src} type="image/svg+xml" sizes="any" />
      </head>

      {/* Meta Pixel Code */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '2076724359746881');
          fbq('track', 'PageView');
        `}
      </Script>

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=2076724359746881&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      {/* End Meta Pixel Code */}

      <Analytics />
    </>
  );
}

// 'use server'
// export interface IServiceFollowers {
//   service: string
//   name: string
//   type: string
//   rate: string
//   min: string
//   max: string
//   dripfeed: string
//   refill: boolean
//   cancel: boolean
//   category: string
// }
// export interface IPostIServiceFollowersArgs {
//   action: string
// }

// export default async function serviceFollowers({
//   action
// }: IPostIServiceFollowersArgs): Promise<IServiceFollowers | null> {
//   try {
//     const urlencoded = new URLSearchParams()
//     urlencoded.append('key', `${process.env.CHAVE_KEY}`)
//     urlencoded.append('action', action)

//     const apiUrl = `${process.env.API_URL}`

//     console.log(apiUrl)

//     const myHeaders = new Headers()
//     myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

//     const requestOptions: RequestInit = {
//       method: 'POST',
//       headers: myHeaders,
//       body: urlencoded,
//       redirect: 'follow',
//       cache: 'no-cache'
//     }

//     const response = await fetch(apiUrl, requestOptions)
//     const result: IServiceFollowers = await response.json()

//     console.log(response)
//     console.log(result)

//     return result
//   } catch (e) {
//     console.error(`Error: ${JSON.stringify(e)}`)
//     return null
//   }
// }

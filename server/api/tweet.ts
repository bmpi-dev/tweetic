import { TweetOembed, TweetOptions } from "~~/interface"
import { constructHtml } from "../_lib/parser"

export default defineEventHandler(async (event) => {
  const { url, layout } = useQuery(event)
  try {
    const oembed = await $fetch<TweetOembed>(`https://publish.twitter.com/oembed?url=${url}`)

    const options: TweetOptions = { layout: layout?.toString() }
    const html = constructHtml(oembed, options)

    return {
      html,
      oembed,
    }
  } catch (err) {
    event.res.statusCode = 400
    return { err }
  }
})

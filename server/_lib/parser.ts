import { parse } from "node-html-parser"
import { TweetOembed, TweetOptions } from "~~/interface"

export const extractHtml = (data: string) => {
  const root = parse(data)
  const content = root.getElementsByTagName("p")?.[0]
  content.getElementsByTagName("a").map((i) => i.setAttribute("target", "_blank"))
  const html = content?.innerHTML
  return html
}
export const extractDate = (data: string) => {
  const root = parse(data)
  const html = root.querySelector(".twitter-tweet > a")?.innerHTML
  return html
}

export const constructHtml = (oembed: TweetOembed, options: TweetOptions) => {
  const url = oembed.url
  const author_name = oembed.author_name
  const author_handler = `@${oembed.author_url.split("/")[3]}`
  const author_image = `https://unavatar.io/twitter/${author_handler}` // might change to user real image src
  const date = extractDate(oembed.html)
  const content = extractHtml(oembed.html)

  const html = ` 
  <div class="tweet" data-style="${options.layout}">
    <div class="tweet-header">
      ${
        options.layout == "supabase"
          ? `
        <div class="tweet-author">
          <svg class="tweet-logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"></path></svg>

          <img class="tweet-author-image" src="${author_image}" >
          <div class="tweet-author-info">
            <p class="tweet-author-name"></p>
            <a class="tweet-author-handler" target="_blank" href="${oembed.author_url}">${author_handler}</a>
          </div>
        </div>

        `
          : `
          <div class="tweet-author">
            <img class="tweet-author-image" src="${author_image}" >
            <div class="tweet-author-info">
              <p class="tweet-author-name">${author_name}</p>
              <a class="tweet-author-handler" target="_blank" href="${oembed.author_url}">${author_handler}</a>
            </div>
          </div>

          <svg class="tweet-logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"></path></svg>
          `
      }
    </div>
      
    <div class="tweet-content">
      ${content}
    </div>
  </div> 
  `
  return html
}

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// SplitText utility for text animations
export class SplitText {
  chars: HTMLElement[] = []
  words: HTMLElement[] = []
  lines: HTMLElement[] = []

  constructor(element: HTMLElement | null, options: { type: string }) {
    if (!element) return

    const text = element.textContent || ""
    element.innerHTML = ""

    if (options.type.includes("chars") || options.type.includes("words")) {
      const words = text.split(" ")

      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement("span")
        wordSpan.style.display = "inline-block"
        wordSpan.style.whiteSpace = "pre"

        if (options.type.includes("chars")) {
          word.split("").forEach((char) => {
            const charSpan = document.createElement("span")
            charSpan.textContent = char
            charSpan.style.display = "inline-block"
            this.chars.push(charSpan)
            wordSpan.appendChild(charSpan)
          })
        } else {
          wordSpan.textContent = word
        }

        this.words.push(wordSpan)
        element.appendChild(wordSpan)

        if (wordIndex < words.length - 1) {
          element.appendChild(document.createTextNode(" "))
        }
      })
    }
  }
}

export { gsap, ScrollTrigger }

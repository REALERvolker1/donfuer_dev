import './css/style.css'

class lazyImage {
  public elem:HTMLDivElement = document.createElement("div")
  private img:HTMLImageElement = document.createElement("img")
  private src:string
  private alt:string|undefined
  public init = async():Promise<HTMLDivElement> => {
    const pipe = await fetch(this.src)
    this.img.src = URL.createObjectURL(await pipe.blob())
    if (this.alt) {
      const para = document.createElement("p")
      para.innerText = this.alt
      this.elem.appendChild(para)
      this.img.alt = this.alt
      this.elem.appendChild(para)
    }
    this.elem.appendChild(this.img)
    this.elem.classList.add("lazyImage")
    return this.elem
  }
  constructor (src:string,alt?:string) {
    this.src = src
    if (alt) this.alt = alt
  }
}

const navLinks = [
  {
    icon: "home",
    pageName: "Home",
    href: "./",
  },
  {
    icon: "apply",
    pageName: "Apply",
    href: "apply.html",
  },
  {
    icon: "about",
    pageName: "About",
    href: "history.html",
  },
  {
    icon: "leadership",
    pageName: "Leadership",
    href: "leads.html",
  },
  {
    icon: "download",
    pageName: "Downloads",
    href: "downloads.html",
  }
]

function newElem(tag:string = "div", props:any = {}, parentElem?:HTMLElement) {
  const elem = document.createElement(tag)
  for (const [key, value] of Object.entries(props)) {
    //@ts-ignore
    elem[key] = value
  }
  return parentElem? () => {parentElem.appendChild(elem)} : elem
}

async function lazilyLoadImage(src:string):Promise<HTMLImageElement|undefined> {
  const imgPipe = await fetch(src)
  if (imgPipe.status != 200) return undefined
  const imgText = URL.createObjectURL(await imgPipe.blob())
  const resulting:HTMLImageElement = document.createElement("img")
  resulting.src = imgText
  return resulting
}

function init(thisPage:string):HTMLDivElement {
  const cont = document.createElement("div")
  cont.classList.add("main")
  cont.id = "main"

  const nDiv = document.createElement("div")
  nDiv.classList.add("navContainer")

  const titl = document.createElement("p")
  titl.innerText = thisPage
  titl.classList.add("noSelect")
  nDiv.appendChild(titl)

  const nav = document.createElement("nav")
  nav.id = "nav"
  for (const dat of navLinks) {
    const l = document.createElement("a")
    l.classList.add("navLink")
    l.classList.add("noSelect")
    l.href = dat.href
    l.innerText = dat.pageName
    if (dat.pageName == thisPage) l.classList.add("activeNavLink")
    nav.appendChild(l)
  }
  nDiv.appendChild(nav)
  document.body.appendChild(nDiv)
  return cont
}

export {lazyImage,navLinks, newElem, init,lazilyLoadImage}
class Carousel extends HTMLElement {
  constructor() {
    super();

    // const splideDiv = document.createElement("div");
    // splideDiv.className = "splide";

    // const splideTrackDiv = document.createElement("div");
    // splideTrackDiv.className = "splide__track";
    // splideDiv.appendChild(splideTrackDiv);

    // const splideListDiv = document.createElement("ul");
    // splideListDiv.className = "splide__list";
    // splideTrackDiv.appendChild(splideListDiv);

    // $(this)
    //   .find("img")
    //   .each(function (i, img) {
    //     console.log(img);
    //     const splideLi = document.createElement("li");
    //     splideLi.className = "splide__slide";
    //     splideLi.appendChild(img);
    //     splideListDiv.appendChild(splideLi);
    //   });

    const imgs = $(this).find("img").toArray();

    const primarySplideDiv = this.createSplideDiv(imgs);

    this.innerHTML = "";
    this.appendChild(primarySplideDiv);

    // Setup a click listener on <app-drawer> itself.
    new Splide(primarySplideDiv).mount();
  }

  createSplideDiv(imgs) {
    const splideDiv = document.createElement("div");
    splideDiv.className = "splide";

    const splideTrackDiv = document.createElement("div");
    splideTrackDiv.className = "splide__track";
    splideDiv.appendChild(splideTrackDiv);

    const splideListDiv = document.createElement("ul");
    splideListDiv.className = "splide__list";
    splideTrackDiv.appendChild(splideListDiv);

    imgs.forEach(function (img) {
      const splideLi = document.createElement("li");
      splideLi.className = "splide__slide";
      splideLi.appendChild(img.cloneNode(true));
      splideListDiv.appendChild(splideLi);
    });

    return splideDiv;
  }
}

customElements.define("spinrd-carousel", Carousel);

export class PageManager {
    constructor(pages) {
        this.pages = pages;
    }

    showPage(name) {
        for (let page of Object.values(this.pages)) {
            page.style.display = 'none';
        }
        this.pages[name].style.display = 'block';
    }
}

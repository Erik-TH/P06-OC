/**
 * 
 * @param {*} data du photographe
 * @returns {{ id, name, picture, price, getUserCardDOM }}
 * id : photographer's id
 * name : photographer's name
 * picture : photographer's portrait
 * price : cost of service
 * getUserCardDOM : fonction de rendu du p.
 */

 function photographerFactory(data) {

    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `public/assets/photographers/Photographers ID Photos/${portrait}`;

    // Construction de l'URL  photographe.html?id={id}
    const photographerUrl = new URL(BaseURL.base + "photographer.html")
    photographerUrl.searchParams.append('id',id);

    function getImg() {
        // thumbnail
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", ""/*name*/)

        return img
    }
    /**
     * 
     * @param {*} level : title level (1 to 6)
     * @returns {hlevel} : title - photographer's name
     */
    function getName(level=2){
        // photographer's name
        const hlevel = document.createElement( 'h'+level );
        hlevel.textContent = name;
        return hlevel
    }

    /**
     * 
     * @returns {HTMLelement}
     * html element city country
     */
    function getCityCountry(){
        /* City, Country */
        const pcitycountry = document.createElement( 'h2' );
        pcitycountry.textContent = city + ', ' + country
        pcitycountry.classList.add("citycountry")
        return pcitycountry
    }

    /**
     * 
     * @returns {HTMLelement}
     * currency
     */
    function getTagline(){
        /* tagline */
        const ptagline = document.createElement( 'p' );        
        ptagline.textContent = tagline
        ptagline.classList.add("tagline")
        return ptagline
    }

    /**
     * 
     * @returns {HTMLelement}
     * cost service
     */
    function getPrice(){
        const pprice = document.createElement('p')
        pprice.textContent = price + "€/jour"
        pprice.classList.add("price")
        return pprice
    }

    /**
     * photographer's name in modal
     */
    function AddingNameInModalContact(){
        document.querySelector(".modal header h3").textContent = name;
    }

    /**
     * 
     * @param {*} param0 
     * @returns {article} : article - header photographer.html
     */
    function getUniqPhotograph({article,img,hname,citycountry,tagline}){
        // header boxes
        div = document.createElement( 'div' );
        div.classList.add("photograph")
        div.appendChild(hname)
        div.appendChild(citycountry)
        div.appendChild(tagline)
        article.appendChild(div)
        article.appendChild(img)
        AddingNameInModalContact()
        return article
    }
    
    /**
     * 
     * @param {*} header 
     * if false: thumbnail(index.html), true: header(photographer.html)
     * @returns {article} : élément html
     */
    function getUserCardDOM(header=false) {
        let article
        if(header){
            // header page photographer.html
            article = document.querySelector(".photograph-header")           
        }
        else{
            // thumbnail photographer
            article = document.createElement( 'article' );
            article.setAttribute("id", "photographer_"+id)
        }

        // link photographer's page
        const photographerLink = document.createElement('a')
        photographerLink.setAttribute("href",photographerUrl)

        // thumbnail
        const img = getImg()

        // photographer's name
        const hname = getName((header)?1:2)

        /* City, Country */
        const pcitycountry = getCityCountry()
        
        /* tagline */
        const ptagline = getTagline()

        /* cost of service */
        const pprice = getPrice()
    
        if(header){
            article = getUniqPhotograph({
                article:article,
                img:img,
                hname:hname,
                citycountry:pcitycountry,
                tagline:ptagline
            })
        }
        else {
            article.appendChild(photographerLink)
            // modification par rapport à la version initiale:
            // le lien englobe la photo et le titre
            photographerLink.appendChild(img);
            photographerLink.appendChild(hname);
            // les nouveaux champs à afficher mais hors lien de redirection
            article.appendChild(pcitycountry)
            article.appendChild(ptagline)
            article.appendChild(pprice)
            article.classList.add("hover_photograf_css")
        }

        return (article);
    }


    return { id, name, picture, price, getUserCardDOM }
}


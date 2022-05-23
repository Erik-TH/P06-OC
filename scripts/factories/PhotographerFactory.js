import FormContact from '../utils/contactForm.js';

export default class Photographer {
	constructor(data) {
		this.id = data.id;
		this.name = data.name;
		this.portrait = data.portrait;
		this.city = data.city;
		this.country = data.country;
		this.tagline = data.tagline;
		this.price = data.price;

		Photographer.instances = [...Photographer.instances, this];
        
		this.element = this.getView();
	}

	static instances = [];
	static emptyTarget = document.getElementById('no-photographer');

	/**
     * Cette fonction choisi la vue du photographe selon la page et la retourne
     * @returns {HTMLElement}
     */
	getView = () => {
		let path = window.location.pathname.split('/');
		path = path[path.length - 1];

		switch (path) {
		case 'index.html':
			return this.thumbnail();
			break;

		case 'photographer.html':
			return this.profil();
			break;
		}
	};

	/**
     * photographer's profil - home page
     * @returns {HTMLELement}
     */
	thumbnail = () => {
		let element = document.createElement('article');
		element.setAttribute('class', 'photographer-thumbnail');

		element.innerHTML =
        `<a class="photographer__profil" href="photographer.html?id=${this.id}">
            <img class="photographer__profil__img" src="imgs/photos/Photographers%20ID%20Photos/${this.portrait}" alt="">
            <h2 class="photographer__profil__name">${this.name}</h2>
        </a>
        <div class="photographer__infos">
            <p class="photographer__infos__city">${this.city}, ${this.country}</p>
            <p class="photographer__infos__tagline">${this.tagline}</p>
            <p class="photographer__infos__price">${this.price}€/jour</p>
        </div>`;

		return element;
	};

	/**
     * photographer's profil - photographer's page
     * @returns {HTMLElement}
     */
	profil = () => {

		// add html elements
		let container = document.createElement('section');
		let infosElement = document.createElement('div');
		let contactBtn = document.createElement('button');
		let pictureElement = document.createElement('img');

		// add attribute to html elements
		container.setAttribute('id', 'photographer-profil');
		container.setAttribute('class', 'photographer-profil');
		infosElement.setAttribute('class', 'photographer__infos');
		contactBtn.setAttribute('id', 'contact-btn');
		contactBtn.setAttribute('class', 'btn photographer__btn');
		pictureElement.setAttribute('class', 'photographer__img');
		pictureElement.setAttribute('alt', this.name);
		pictureElement.setAttribute('src', `imgs/photos/Photographers%20ID%20Photos/${this.portrait}`);
        
		// add in html : photographer__infos
		infosElement.innerHTML=
        `<h1 class="photographer__infos__name">${this.name}</h1>
        <p class="photographer__infos__city">${this.city}, ${this.country}</p>
        <p class="photographer__infos__tagline">${this.tagline}</p>`;

		// contact button text

		contactBtn.innerHTML = 'Contactez-moi';

		// Ajout des éléments au container

		container.appendChild(infosElement);
		container.appendChild(contactBtn);
		container.appendChild(pictureElement);

		// event listener on click - contact button
		contactBtn.addEventListener('click', () => FormContact.open());

		return container;
	};

}
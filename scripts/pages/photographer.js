// import classes

import Api from '../api/PhotographersApi.js';
import Error from '../utils/Error.js';
import Photographer from '../factories/PhotographerFactory.js';
import SortDropDown from '../utils/SortDropDown.js';
import Media from '../factories/MediaFactory.js';
import CardInfos from '../factories/CardInfos.js';
import FormContact from '../utils/contactForm.js';

// DOM

const photographerTarget = document.getElementById('photographer-profil');
const sortTarget = document.getElementById('sort');
const mediaTarget = document.getElementById('gallery');
const cardInfosTarget = document.getElementById('card-infos');

// functions

const injectElement = (element, target) => {
	if (element.id == target.id) {
		target.parentNode.replaceChild(element, target);
	} else {
		target.appendChild(element);
	}
};

const getParam = (param) => {
	let search = window.location.search;
	let result = new URLSearchParams(search).get(param);

	if (result != null) {
		return result;
	}

	return false;
};


// Comportement par défaut (une fois la page chargé)


try {
	await Api.init();
} catch (error) {
	Error.print(error, true);
}

// get photographer's id
const photographerId = getParam('id');

// add element
let photographer = new Photographer(Api.getPhotographerById(photographerId));

// inject element
Photographer.instances.forEach(i => {
	injectElement(i.element, photographerTarget);
});

// Sort
// add
const sort = new SortDropDown();

// inject
injectElement(sort.getView(), sortTarget);

// gallery - photos videos

// get medias by id
const medias = Api.getMediaFromPhotographer(photographerId);

// add medias
medias.forEach(media => new Media(media, mediaTarget));
// sort by popularity by default
Media.sortBy(SortDropDown.value);

// photographer's card : likes / price

// add
const cardInfos = new CardInfos(photographer.price);

// inject
injectElement(cardInfos.getView(), cardInfosTarget);


// add contact form on photographer's page

FormContact.init();
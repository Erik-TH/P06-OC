// imports classes

import Api from '../api/PhotographersApi.js';
import Error from '../utils/Error.js';
import Photographer from '../factories/PhotographerFactory.js';

// target in DOM

let photographerTarget = document.getElementById('photographers-list');

// function inject elemnent in

const injectElement = (element, target) => {
	target.appendChild(element);
};


// await PhotographersApi

try {
	await Api.init();
} catch (error) {
	Error.print(error);
}

// add elements
Api.getAllPhotographers().forEach(p => new Photographer(p));

// inject in DOM
Photographer.instances.forEach(i => {
	injectElement(i.element, photographerTarget);
});
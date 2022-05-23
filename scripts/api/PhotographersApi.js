import Error from '../utils/Error.js';

export default class Api {

	static photographers;
	static medias;

	/**
     * fetch data.json to statics : photographers, medias
     */
	static init = async () => {
		const req = await fetch('data/photographers.json');
		if (!req.ok) {
			throw 'Données momentanément indisponible';
		}
		const data =  await req.json();

		Api.photographers = data.photographers;
		Api.medias = data.media;        
	};

	/**
     * get all photographers
     * @returns {object}
     */
	static getAllPhotographers = () => {
		return Api.photographers;
	};

	/**
     * get photographer by id to object
     * @param {number} id 
     * @returns {object}
     */
	static getPhotographerById = (id) => {
		id = parseInt(id, 10);

		if (!isNaN(id)) {
			const res = Api.photographers.find(photographer => photographer.id === id);

			return res || Error.print('Ce photographe n\'existe pas', true);
		}
	};

	/**
     * get media by id
     * @param {number} id 
     * @returns 
     */
	static getMediaFromPhotographer = (id) => {
		return Api.medias.filter(media => media.photographerId == id);
	};
}
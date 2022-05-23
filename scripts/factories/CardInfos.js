import Media from './MediaFactory.js';

export default class CardInfos {
	constructor (price) {
		this.price = price;
	}

	/**
     * update total like on card-info
     */
	static updateTotalLike = () => {
		document.getElementById('counter-likes').innerHTML = Media.totalLikes;
	};

	/**
     * function view photographer's card-infos : total like ; price
     * @returns {HTMLElement}
     */
	getView = () => {
		let container = document.createElement('aside');
		container.setAttribute('id', 'card-infos');
		container.setAttribute('class', 'card-infos');

		let counterLike = document.createElement('div');
		counterLike.setAttribute('class', 'card-infos__nb-likes');
		counterLike.innerHTML =

        `<span id="counter-likes" class="nb-likes">${Media.totalLikes}</span>

        <i class="fas fa-heart" aria-label="likes"></i>`;

		container.appendChild(counterLike);
		container.innerHTML += `<p>${this.price}€ / jour</p>`;

		return container;
	};
}
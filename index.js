document.addEventListener("DOMContentLoaded", async (e) => {
	const deck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
	const deckId = deck.data.deck_id;

	const button = document.querySelector("#btn");
	button.addEventListener("click", async (e) => {
		const numOfCards = document.querySelector("#get-cards");
		const cardPictures = document.querySelector("#card-pictures")
		const p = document.querySelector("#remaining");
		const num = Number(numOfCards.value);

		const cards = await axios.get(
			`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${num}`
		);
		p.textContent = `${cards.data.remaining} card(s) left.`
		cardPictures.innerHTML = "";
		cards.data.cards.forEach((card) => {
			const img = document.createElement("img");
			img.src = card.image;
			img.classList.add("card");
			cardPictures.appendChild(img);
			img.addEventListener("click", async (e)=>{
				const newCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
				img.src = newCard.data.cards[0].image;
				p.textContent = `${newCard.data.remaining} card(s) left.`
			})
			
		});

	});
});


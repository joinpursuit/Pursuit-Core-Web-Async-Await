document.addEventListener("DOMContentLoaded", ()=>{
   const btn = document.querySelector("button");
   const div = document.querySelector("#card-dislay");
   const remain = document.querySelector("#remaining");
   async function getAPI() {
      const deck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      deckID = deck.data.deck_id
      btn.addEventListener("click", getCards)
      async function getCards() {
         div.innerHTML = ""
         const options = document.querySelector("select").value
         const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=${options}`)
         for (const card of res.data.cards) {
            const image = document.createElement("img")
            image.classList.add("card")
            image.src = card.image
            div.appendChild(image)
         }
         remain.textContent = `${res.data.remaining} card(s) left`
      }
   }

   getAPI()
})




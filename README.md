<div align="center">
<img src="public/icon-128.png" alt="logo"/>
<h1> Chrome Ekstenzija za eaukcija.sud.rs</h1>
</div>

## Problem i kontekst

<hr>
Kako bi sprečili malverzacije, a uz to i olakšali postupak aukcijske prodaje pokretne i nepokretne imovine od strane javnih izvršitelja Ministartstvo Pravde je kreiralo portal https://eaukcija.sud.rs
</br>
</br>

Namerno ili slučajno korisničko iskustvo na ovom portalu nije na zadovoljavajućem nivou, zlobnici bi rekli i očajano.

**Glavni problem** je što ne postoji adekvatan povretak na prethodnu stranu, već se tom prilikom učita home strana i izgubi paginacija i odabrana kategorija pa je za pregled kompletne ponude portala potrebno dva do tri meseca, ako računamo i vikende.

## Rešenje

<hr>
Ovaj Chrome addon radi učitavanje osnovnih podataka za akuciju na čiji se ID pozicionira kursor miša i prikazuje ih u pop-up, bez napuštanja stranice.

Rešenje je zasnovano na [Chrome Extension Boilerplate with
React + Vite + TypeScript](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite)

## Kako se koristi

<hr>

### Upotreba

Instalirate [e-aukcoija-sud-helper](https://chrome.google.com/webstore/detail/e-aukcija-sud-helper/illihgkjadocdebiimlgmebifandicbk?hl=en) ekstenziju i odete na sajt https://eaukcija.sud.rs

### **Development**

<hr>

Pre početka potrebno je instalirati:

1. [Node.js](https://nodejs.org/en)
2. [Git](https://git-scm.com/downloads)

### **Komande**

1. Klonirajte projekat na računaru
2. Pokrenite `npm install` kako biste instalirali neophodne biblioteke potrebne za rad programa
3. Za razvojno okruženje koristite komandu

`npm run dev`

3. Da bi dobili finalni proizvod koristite komandu

`npm run build`

Nakon ove komande addon će biti smešten u folderu `dist`

4. Učitajte addon u chrome koristeći ovo [uputstvo](https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/) (učitajte dist folder).

5. Otvorite sajt https://eaukcija.sud.rs

6. Odaberite kategoriju i kursorom se pozicionirajte na ID neke aukcije

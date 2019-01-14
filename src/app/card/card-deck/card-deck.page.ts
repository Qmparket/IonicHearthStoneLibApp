import { Component, OnInit } from '@angular/core';
import { CardService } from '../shared/card.service';

import { CardDeck } from '../shared/card.model';
@Component({
    selector: 'app-card-deck',
    templateUrl: './card-deck.page.html',
    styleUrls: ['./card-deck.page.scss']
})

export class CardDeckPage implements OnInit {
    public cardDecks: CardDeck[] = [];
    private readonly ALLOWED_DECKS = ['classes', 'factions', 'qualities', 'types', 'reces'];

    constructor(private cardService: CardService) {
        this.getCardDecks();
    }

    private getCardDecks() {
        this.cardService.getAllCardDecks().subscribe(
            (cardDecks: CardDeck[]) => {
                this.extractAllowedDecks(cardDecks);
                // this.cardDecks = cardDecks;
            }
        );
    }

    extractAllowedDecks(cardDecks: CardDeck[]) {
        this.ALLOWED_DECKS.forEach((deckName: string) => {
            this.cardDecks.push({name: deckName, types: cardDecks[deckName]});
        });
    }

    generateUrl(cardDeckGroup: string, cardDeck: string): string {
        return `/tabs/(card:card/${cardDeckGroup}/${cardDeck})`;
    }

    ngOnInit() { }
}

import { Component, Input } from '@angular/core';
import { CardDeck } from '../shared/card.model';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html'
})

export class CardListComponent {
    @Input() items: CardDeck[] = [];
    @Input() listName: string;
    @Input() navigateTo: (cardDeckGroup: string, cardDeck: string) => string;

}

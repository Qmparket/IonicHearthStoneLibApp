import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/card.service';

import { Card } from '../shared/card.model';
import { LoadingController } from '@ionic/angular';
import { LoaderService } from '../../Shared/Service/loader.service';
import { ToastService } from '../../Shared/Service/toast.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.page.html',
  styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage {

  cardDeckGroup: string;
  cardDeck: string;

  cards: Card[] = [];
  copyOfCards: Card[] = [];

  isLoading = false;

  constructor(private route: ActivatedRoute,
              private cardService: CardService,
              private loaderService: LoaderService,
              private toastService: ToastService) { }

  private async getCards() {
    this.loaderService.presentLoading();

    await this.cardService.getCardsByDeck(this.cardDeckGroup, this.cardDeck).subscribe(
      (cards: Card[]) => {
        // cards.forEach((card: Card) => {

        //   card.text =  card.text ? card.text.replace(new RegExp('\\\\n', 'g'), ' ') : 'No Description';

        // });
        // this.cards = cards;

        // this.cards = cards.map((card: Card) => {
        //   card.text = card.text ? card.text.replace(new RegExp('\\\\n', 'g'), ' ') : 'No Description';
        //   return card;
        // });
        this.cards = cards.map((card: Card) => {
          card.text = this.cardService.replaceCardTextLine(card.text);
          return card;
        });
        this.copyOfCards = Array.from(this.cards);
        this.loaderService.dismissLoading();
    }, err => {
      console.log('error getting cards: ' + err);
      this.toastService.presentErrorToast('Cards could not be loaded, try to refresh the page');
      this.loaderService.dismissLoading();
    });
  }

  doRefresh(event) {
    this.getCards();
    event.target.complete();
  }

  async ionViewWillEnter() {
    this.cardDeckGroup = this.route.snapshot.paramMap.get('cardDeckGroup');
    this.cardDeck = this.route.snapshot.paramMap.get('cardDeck');

    if (this.cards && this.cards.length === 0) {
      this.getCards();
    }
  }

  hydrateCards(cards: Card[]) {
    this.cards = cards;
    this.isLoading = false;
  }

  handleSearch() {
    this.isLoading = true;
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/card.service';

import { Card } from '../shared/card.model';
import { LoaderService } from '../../Shared/Service/loader.service';
import { ToastService } from '../../Shared/Service/toast.service';
import { AlertService } from '../../Shared/Service/alert.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage {
  cardId: string;
  card: Card;

  constructor(private route: ActivatedRoute,
              private cardService: CardService,
              private loaderService: LoaderService,
              private toastService: ToastService,
              private alertService: AlertService) { }


  ionViewWillEnter() {
    this.loaderService.presentLoading();
    this.cardId = this.route.snapshot.paramMap.get('cardId');
    this.cardService.getCardById(this.cardId).subscribe(
      (card: Card[]) => {
        this.card = card.map((cardEdited: Card) => {
          // cardEdited.text = cardEdited.text ? cardEdited.text.replace(new RegExp('\\\\n', 'g'), ' ') : 'No Description';
          cardEdited.text = this.cardService.replaceCardTextLine(cardEdited.text);
          return cardEdited;
        })[0];

        if (this.card.img == null) {
          this.card.img = '/assets/image/DefaultCard.png';
        }
        this.loaderService.dismissLoading();
    } , (err) => {
      console.log('could not load card details: ' + err);
      this.loaderService.dismissLoading();
      this.toastService.presentErrorToast('Could not load card details, try to reload the page!');
    });
  }
  updateImage() {
    this.card.img = '/assets/image/DefaultCard.png';
  }

}

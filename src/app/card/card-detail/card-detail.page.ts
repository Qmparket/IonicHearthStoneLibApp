import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/card.service';

import { Card } from '../shared/card.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage {
  cardId: string;
  card: Card;
  loader: any;

  constructor(private route: ActivatedRoute,
              private cardService: CardService,
              private loadingCtrl: LoadingController) { }

  private async presentLoading() {
    // const loader = this.loadingCtrl.create({
    //   content: 'Loading',
    //   translucent: true
    // }).then((newLoader) => newLoader.present());

    const loader = await this.loadingCtrl.create({
      content: 'Loading',
      translucent: true
    });
    loader.present();
    return loader;
  }

  async ionViewWillEnter() {
    this.loader = await this.presentLoading();
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
        this.loader.dismiss();
    });
  }
  updateImage() {
    this.card.img = '/assets/image/DefaultCard.png';
  }

}

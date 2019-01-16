import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardDeckPage } from './card-deck/card-deck.page';
import { CardService } from './shared/card.service';
import { HttpClientModule } from '@angular/common/http';
import { CardListComponent } from './components/card-list.component';
import { CardListingPage } from './card-listing/card-listing.page';
import { CardDetailPage } from './card-detail/card-detail.page';
import { LoaderService } from '../Shared/Service/loader.service';
import { ToastService } from '../Shared/Service/toast.service';
import { AlertService } from '../Shared/Service/alert.service';
import { SearchComponent } from '../Shared/component/search/search.component';

@NgModule({
    declarations: [CardDeckPage, CardListComponent, CardListingPage, CardDetailPage, SearchComponent],
    imports: [ IonicModule, CommonModule, HttpClientModule ],
    exports: [],
    providers: [CardService, LoaderService, ToastService, AlertService],
})
export class CardPageModule {

}

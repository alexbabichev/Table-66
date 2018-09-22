import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorityPage } from './authority';

@NgModule({
  declarations: [
    AuthorityPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorityPage),
  ],
})
export class AuthorityPageModule {}

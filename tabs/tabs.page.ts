import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {
  @ViewChild(IonRouterOutlet, { static: true }) outlet!: IonRouterOutlet;
  lastTab = '';

  constructor(private router: Router) {}

  async reloadTab(tab: string) {
    if (this.lastTab === tab) {
      // Force full reload by navigating to dummy and back
      await this.router.navigateByUrl('/dummy', { skipLocationChange: true });
      await this.router.navigateByUrl(`/tabs/${tab}`);
    } else {
      this.lastTab = tab;
    }
  }

  async reloadForceTab(tab: string) {
    const currentUrl = this.router.url;

    if (currentUrl.includes(tab)) {
      // Simulate a "refresh" by navigating away and back
      await this.router.navigateByUrl('/dummy', { skipLocationChange: true });
      await this.router.navigateByUrl(`/tabs/${tab}`);
    } else {
      this.router.navigateByUrl(`/tabs/${tab}`);
    }
  }
}

import {Component, OnInit} from '@angular/core';
import { NavBarView } from 'src/app/nav-bar/nav-bar.component';
import {DataProviderService} from '../../services/data-provider.service';

@Component({
  selector: 'app-map-explorer-holder',
  templateUrl: './map-explorer-holder.component.html',
  styleUrls: ['./map-explorer-holder.component.css']
})
export class MapExplorerHolderComponent implements OnInit {
  View = NavBarView;
  height = window.innerHeight;

  showMap = true;
  showResults = true;

  constructor(private dataProvider: DataProviderService) { }

  onApply(data: { selectedInterventions: string[] }) {
    this.dataProvider.updateMapData(data.selectedInterventions);
    this.dataProvider.updateHistograms();
  }

  ngOnInit() {
    // this.dataProvider.setExplorePageInitialized()
  }

  getHeight(): string {
    return this.height + "px";
  }

}

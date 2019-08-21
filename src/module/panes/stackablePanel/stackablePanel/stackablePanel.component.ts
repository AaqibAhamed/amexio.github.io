import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { StackableItemComponent } from '../StackablePanel-Item/stackablePanel-item.component';

@Component({
  selector: 'amexio-stackable-panel',
  templateUrl: './stackablePanel.component.html',
  styleUrls: ['./stackablePanel.component.css'],
})
export class StackablePanelComponent implements AfterContentInit {

  totalCount = 0;
  public text = 'Show All';
  expand = true;

  @Input('panel-name') panelName = 'Comments';
  show = false;

  @ContentChildren(StackableItemComponent) groups: QueryList<StackableItemComponent>;

  ngAfterContentInit() {
    this.totalCount = this.groups.length;
    this.groups.toArray().forEach((items: any) => {
      if (items) {
        items.toggle.subscribe(() => {
          this.openGroup(items);
        });
      }
    });
  }

  openGroup(group: any) {
    this.groups.toArray().forEach((data: any) => {
      if (data) {
        group.opened = !group.opened;
      }
    });
  }

  showAll() {
    this.groups.toArray().forEach((data: any) => {
      if (!this.expand) {
        data.opened = !data.opened;
        this.text = 'Show All';
      } else {
        data.opened = !data.opened;
        this.text = 'Hide All';
      }
      this.expand = !this.expand;
    });
  }
}

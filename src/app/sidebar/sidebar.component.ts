import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent {
  @Output() collapseChange = new EventEmitter<boolean>();
  active = 'Dashboard';
  collapsed = false;

  navGroups = [
    {
      label: 'Main',
      items: [
        { icon: 'ri-dashboard-3-line', label: 'Dashboard', badge: null },
        { icon: 'ri-shopping-bag-3-line', label: 'Orders', badge: 128 },
        { icon: 'ri-store-2-line', label: 'Products', badge: null },
        { icon: 'ri-group-line', label: 'Customers', badge: null },
      ]
    },
    {
      label: 'Insights',
      items: [
        { icon: 'ri-bar-chart-grouped-line', label: 'Analytics', badge: null },
        { icon: 'ri-megaphone-line', label: 'Marketing', badge: null },
        { icon: 'ri-price-tag-3-line', label: 'Discounts', badge: null },
      ]
    },
    {
      label: 'Manage',
      items: [
        { icon: 'ri-arrow-go-back-line', label: 'Returns', badge: null },
        { icon: 'ri-star-line', label: 'Reviews', badge: null },
        { icon: 'ri-file-chart-line', label: 'Reports', badge: null },
        { icon: 'ri-settings-3-line', label: 'Settings', badge: null },
      ]
    }
  ];

  setActive(label: string) { this.active = label; }

  toggle() {
    this.collapsed = !this.collapsed;
    this.collapseChange.emit(this.collapsed);
  }
}

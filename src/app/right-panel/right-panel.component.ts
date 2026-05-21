import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right-panel.component.html',
  styles: []
})
export class RightPanelComponent {
  activities = [
    { icon: 'ri-shopping-cart-2-line', title: 'New order #ORD-1256', sub: '$1,250.00', time: '2 min ago', bg: '#ede9fe', color: '#6c3ce1' },
    { icon: 'ri-user-add-line', title: 'Customer John Doe', sub: 'placed a new order', time: '10 min ago', bg: '#dbeafe', color: '#3b82f6' },
    { icon: 'ri-archive-line', title: 'Product Gold Chain', sub: 'out of stock', time: '25 min ago', bg: '#fee2e2', color: '#ef4444' },
    { icon: 'ri-refund-2-line', title: 'Refund issued #REF-1234', sub: '$350.00', time: '45 min ago', bg: '#fef9c3', color: '#ca8a04' },
    { icon: 'ri-star-line', title: 'New review received', sub: '★★★★★', time: '1 hr ago', bg: '#dcfce7', color: '#16a34a' },
  ];
}

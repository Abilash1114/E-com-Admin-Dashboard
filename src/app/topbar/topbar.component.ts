import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-topbar",
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="topbar">
      <div class="topbar-greeting">
        <h1>Good morning Admin</h1>
        <p>Here's what's happening with your store today.</p>
      </div>
      <div class="topbar-right">
        <div class="search-bar">
          <i class="ri-search-line"></i>
          <input
            type="text"
            placeholder="Search orders, customers, products..."
          />
          <span class="search-kbd">K</span>
        </div>
        <div class="icon-btn" title="Notifications">
          <i class="ri-notification-3-line"></i>
          <span class="notif-dot">4</span>
        </div>
        <div class="date-pill">
          <i class="ri-calendar-line"></i>
          May 16 – May 22, 2026
        </div>
        <div class="icon-btn" title="Download">
          <i class="ri-download-2-line"></i>
        </div>
      </div>
    </header>
  `,
  styles: [],
})
export class TopbarComponent {}

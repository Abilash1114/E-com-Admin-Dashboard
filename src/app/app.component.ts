import { Component } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RightPanelComponent } from "./right-panel/right-panel.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TopbarComponent } from "./topbar/topbar.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    SidebarComponent,
    TopbarComponent,
    DashboardComponent,
    RightPanelComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrls: [],
})
export class AppComponent {
  onCollapseChange(c: boolean) {}
}

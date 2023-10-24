import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LogoutDialogComponent } from 'src/app/logout-dialog/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  showHomeSubTabs: boolean = false;
  showGeneratorSubTabs: boolean = false;
  showAccountSubTabs: boolean = false;

  isHomeSelected: boolean = false;
  isGeneratorSelected: boolean = false;
  isAccountSelected: boolean = false;

  dialogRef!: any;

  constructor(private router: Router, private authService: AuthService, private dialog: MatDialog
    ) {
    this.router.events.subscribe((val) => {
      this.isHomeSelected = this.router.url === '/home';
      this.isGeneratorSelected = this.router.url === '/generator';
      this.isAccountSelected = this.router.url === '/account';
    });
  }

  toggleSubMenu(menu: string): void {
    switch (menu) {
      case 'home':
        this.showHomeSubTabs = !this.showHomeSubTabs;
        break;
      case 'generator':
        this.showGeneratorSubTabs = !this.showGeneratorSubTabs;
        break;
      case 'account':
        this.showAccountSubTabs = !this.showAccountSubTabs;
        break;
      default:
        break;
    }
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }

  confirmLogout(): void {
    this.dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '40%',
      data: { 
        message: 'Êtes-vous sûr de vouloir vous déconnecter ?'
      }
    });
  
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.logout();
      }
    });
  }
}
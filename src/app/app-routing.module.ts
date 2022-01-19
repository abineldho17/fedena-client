import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'information',
    loadChildren: () => import('./pages/information/information.module').then( m => m.InformationPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'readmore',
    loadChildren: () => import('./pages/readmore/readmore.module').then( m => m.ReadmorePageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./pages/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./pages/gallery/gallery.module').then( m => m.GalleryPageModule)
  },


  {
    path: 'album',
    loadChildren: () => import('./pages/album/album.module').then( m => m.AlbumPageModule)
  },
  {
    path: 'light-box',
    loadChildren: () => import('./pages/light-box/light-box.module').then( m => m.LightBoxPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./pages/password/password.module').then( m => m.PasswordPageModule)
  },
 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

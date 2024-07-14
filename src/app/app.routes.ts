import { PaymentsComponent } from './pages/payments/payments.component';
// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard.service';
import { roleGuard } from './services/role.guard.service';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PointsComponent } from './pages/points/points.component';
import { FittersComponent } from './pages/fitters/fitters.component';
import { AgentsComponent } from './pages/agents/agents.component';
import { InsurancesComponent } from './pages/insurances/insurances.component';
import { InsurancesOfficesComponent } from './pages/insurances-offices/insurances-offices.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ProductsComponent } from './pages/products/products.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { PracticesComponent } from './pages/practices/practices.component';
import { CalendarsComponent } from './pages/calendars/calendars.component';
import { AccountingComponent } from './pages/accounting/accounting.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { ExpertsComponent } from './pages/experts/experts.component';
import { CarfleetsComponent } from './pages/carfleets/carfleets.component';
import { OriginalpartsComponent } from './pages/originalparts/originalparts.component';
import { CapsComponent } from './pages/caps/caps.component';
import { FirstplantsComponent } from './pages/firstplants/firstplants.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { BrandsAndModelsComponent } from './pages/brands-and-models/brands-and-models.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [authGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      { 
        path: 'profile',
        component: ProfileComponent, 
        canActivate: [authGuard], 
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] } 
      },
      { 
        path: 'points', 
        component: PointsComponent, 
        canActivate: [authGuard], 
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] } 
      },
      { 
        path: 'fitters', 
        component: FittersComponent, 
        canActivate: [authGuard], 
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] } 
      },
      { 
        path: 'agents', 
        component: AgentsComponent, 
        canActivate: [authGuard], 
       data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] } 
      },
      {
        path: 'insurances',
        component: InsurancesComponent,
        canActivate: [authGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'insurancesoffices',
        component: InsurancesOfficesComponent,
        canActivate: [authGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'customers',
        component: CustomersComponent,
        canActivate: [authGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [authGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'vehicles',
        component: VehiclesComponent,
        canActivate: [authGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'practices',
        component: PracticesComponent,
        canActivate: [authGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'calendars',
        component: CalendarsComponent,
        canActivate: [authGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'accounting',
        component: AccountingComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'experts',
        component: ExpertsComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'carfleets',
        component: CarfleetsComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'firstplants',
        component: FirstplantsComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'originalparts',
        component: OriginalpartsComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'caps',
        component: CapsComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'resources',
        component: ResourcesComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'templates',
        component: TemplatesComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'suppliers',
        component: SuppliersComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'brandsAndModels',
        component: BrandsAndModelsComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ADMIN', 'USER', 'ACCOUNTING', 'MANAGER'] },
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', component: NotfoundComponent },
    ],
  },
  { path: '**', component: NotfoundComponent },
];

import { ManageTokenComponent } from './manage-token.component';
import { TokenTradingComponent } from './token-trading.component';
import { OverviewComponent } from './overview.component';

export const routes = [
  {
    path:'',
    redirectTo:'/overview',
    pathMatch:'full'
  },{
    path:'overview',
    component:OverviewComponent,
    pathMatch:'full'
  },
  {
    path:'tokenTrading',
    component:TokenTradingComponent,
    pathMatch:'full'
  },
  {
    path:'manageToken',
    component:ManageTokenComponent,
    pathMatch:'full'
  }
]; 

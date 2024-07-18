import { Routes,RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { GraphComponent } from './graph/graph.component';

export const routes: Routes = [
    {path:'contacts',component:MainComponent},
    {path:'graph',component:GraphComponent},
    {path:'',redirectTo:'/contacts',pathMatch:'full'}
];

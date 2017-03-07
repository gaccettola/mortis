

#### install material
```
npm install -g @angular/cli
npm install --save @angular/material
```

#### app.module.ts, import it
```
import { MaterialModule } from '@angular/material';
```

#### app.module.ts, add to 'imports'
```
imports: [MaterialModule],
```


#### add a theme
```
```

#### install hammerjs
```
npm install --save hammerjs
```


#### install hammerjs
```
npm install --save @angular/flex-layout
npm install --save ng2-flex-layout
```

#### import hammerjs in app.module.ts
```
import 'hammerjs';
```


#### configure systemjs
```
System.config({
  // existing configuration options
  map: {
    ...,
    '@angular/material': 'npm:@angular/material/bundles/material.umd.js'
  }
});

```
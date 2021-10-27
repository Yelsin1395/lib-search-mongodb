# Buscador para MongoDb

_Este buscador se comporta de manera funcional, y se utiliza en tus controllores y el repositorio._

## Comenzando 🚀

Deberas crear un archivo en tu proyecto y luego copiar el código que está dentro de la carpeta src **Esto esta en Typescript**

### Modo de uso 🔧

Esto de debe importar en tus controladores de esta manera

```
import { searcher, buildConditionsSearch } from '../libs/search.lib';
```

y luego en tú método utilizarlos de esta manera:

```
public async searchBrand(req: Request, res: Response) {
    //Build array condition [alias, nameSchema, searchType];
    const conditions = buildConditionsSearch([
      ['name', 'brandName', 'contains'],
      ['canSearch', 'canSearch', 'equal'],
    ]);
    const { skip, take, filter } = searcher(req.query, conditions);
    const data = await _brandService.searchBrand({ skip, take, filter });
    return res.status(data.status).send(data);
  }
```

Para que esto llame en tu base de datos en mongodb deste tu respositorios realizas esta importación:

```
import { buildSearch } from '../libs/search.lib';
```

y en tu método puedes emplearlo de esta forma

```
public async searchBrand({ skip = 10, take = 1, filter }: Filter) {
    const skips = skip * (take - 1);
    const spectQuery = buildSearch(filter);
    const result = await _brand
      .find({ $and: spectQuery })
      .sort({ brandName: 'asc' })
      .skip(skips)
      .limit(skip);
    return result;
  }
```

## Autor ✒️

* **Jesús Yelsin Broly García Rivera** - *Trabajo Inicial* - [Yelsin1395](https://github.com/Yelsin1395)
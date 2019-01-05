```
npm i
cd packages/auctions-front
npm i --save react@next
npm i --save react-dom@next
npx lerna bootstrap
npm start
```


There are mock for async API requests. I have no any idea which requests goes to backend and which to scatter
. For now there are files:
```
    packages/auctions-front/src/store/api/auction/apiImpl.ts
    packages/auctions-front/src/store/api/scatter/apiImpl.ts
```
which are empty. For now I use mockImpl.ts files in each directory:
```
    packages/auctions-front/src/store/api/auction/mockImpl.ts
    packages/auctions-front/src/store/api/scatter/mockImpl.ts
```
You can change the config of each API here , {mode: 'api'}
```$xslt
  packages\auctions-front\src\store\configureStore.ts
```
and write same callbacks there. Implemented callbacks will be merged with mock callbacks

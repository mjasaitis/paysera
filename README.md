##Sistemos node modulių instaliavimui įvykdykite komandą:
```
npm install
```
##Sistemos paleidimui įvykdykite komandą:
```
npm start
```
##Sistemos testavimui įvykdykite komandą:
```
npm test
```

##Sistemos aprašymas:

Duomenų įvesties byla nurodoma package.json parametre "scripts.start", pavyzdyje - "input.json" 
Konfiguracija nuskaitoma iš API ( url pateikti užduotyje )

##Klasės

###CurrencyConverter
Klasė skirta valiutos konvertavimui

###Config
Klasė skirta konfiguracijos gavimui iš API. Nenuskaitant konfiguracijos iš API naudojamos numatytosios reikšmės. Numatytoji konfiguracija naudojama ir aplikacijos testuose.

###User 
Bendrinė vartotojo klasė. 

###UserNatural
Fizinio asmens vartotojo klasė, paveldinti User klasę, skirta fizinio asmens grynųjų pinigų operacijų komisinių paskaičiavimui. Saugoma vartotojo pinigų išgryninimo "istorija" komisinių paskaičiavimui. Išgrynintos sumos paverčiamos į eurus, kad būtų galima patikrinti, ar išgrynintų pinigų suma per savaitę neviršijo maksimalios neapmokestinamos sumos.

###UserJuridical 
Juridinio asmens vartotojo klasė, paveldinti User klasę, skirta juridinio asmens grynųjų pinigų operacijų komisinių paskaičiavimui.

###App
Klasė nuskaito pradinius duomenis, sukuria vartotojus ir kiekvienai vartotojo operacijai paskaičiuoja komisinius.
